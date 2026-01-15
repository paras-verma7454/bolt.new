import { getGeminiCodeSession, AI_MODELS } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { prompt, modelId } = await req.json();
    try {
        const selectedModel = AI_MODELS.find(m => m.id === modelId) || AI_MODELS[0];
        
        let response: string;

        if (selectedModel.provider === 'gemini') {
            // Use Gemini API for code generation
            const codeSession = getGeminiCodeSession(modelId);
            const result = await codeSession.sendMessage(prompt);
            response = await result.response.text();
        } else if (selectedModel.provider === 'openrouter') {
            // Use OpenRouter API for code generation
            const openRouterApiKey = process.env.OPENROUTER_API_KEY;
            if (!openRouterApiKey) {
                throw new Error("OpenRouter API key not configured");
            }

            const apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${openRouterApiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
                    'X-Title': 'Bolt New AI Platform'
                },
                body: JSON.stringify({
                    model: modelId,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a code generation assistant. Generate React projects with Tailwind CSS. Return responses in JSON format with the following schema: {"projectTitle": "", "explanation": "", "files": {"/App.js": {"code": ""}}, "generatedFiles": []}'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: selectedModel.maxTokens || 8192,
                    temperature: 1,
                    top_p: 0.95
                })
            });

            if (!apiResponse.ok) {
                const errorData = await apiResponse.text();
                throw new Error(`OpenRouter API error: ${apiResponse.status} - ${errorData}`);
            }

            const data = await apiResponse.json();
            response = data.choices[0]?.message?.content || 'No response generated';
        } else {
            throw new Error(`Unsupported model provider: ${selectedModel.provider}`);
        }

        return NextResponse.json(JSON.parse(response));
    } catch (e: any) {
        console.error("Error in code generation:", e);
        return NextResponse.json({error: e.message || "error sending message"}, { status: 500 });
    }
}
