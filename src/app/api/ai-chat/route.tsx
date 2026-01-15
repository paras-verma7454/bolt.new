import { getGeminiChatSession, AI_MODELS } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { prompt, modelId } = await req.json();
    try {
        // console.log("Received prompt:", prompt);
        // console.log("Selected model:", modelId);

        const selectedModel = AI_MODELS.find(m => m.id === modelId) || AI_MODELS[0];
        
        let AiResponse: string;

        if (selectedModel.provider === 'gemini') {
            // Use Gemini API
            const chatSession = getGeminiChatSession(modelId);
            const result = await chatSession.sendMessage(prompt);
            AiResponse = await result.response.text();
        } else if (selectedModel.provider === 'openrouter') {
            // Use OpenRouter API
            const openRouterApiKey = process.env.OPENROUTER_API_KEY;
            if (!openRouterApiKey) {
                throw new Error("OpenRouter API key not configured");
            }

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: selectedModel.maxTokens || 8192,
                    temperature: 1,
                    top_p: 0.95
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`OpenRouter API error: ${response.status} - ${errorData}`);
            }

            const data = await response.json();
            AiResponse = data.choices[0]?.message?.content || 'No response generated';
        } else {
            throw new Error(`Unsupported model provider: ${selectedModel.provider}`);
        }

        // console.log("result:", AiResponse);

        return NextResponse.json({
            result: AiResponse
        });
    } catch (err: any) {
        console.error("Error processing request:", err);
        return NextResponse.json({
            error: err.message || "Internal Server Error"
        }, { status: 500 });
    }
}