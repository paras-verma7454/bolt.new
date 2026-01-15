# Bolt New - AI-Powered Development Platform

A modern development platform that integrates multiple AI models for chat and code generation, built with Next.js, Convex, and Tailwind CSS.

## Features

- **Multi-Model AI Support**: Choose from Google Gemini, OpenAI GPT, Anthropic Claude, Meta Llama, and Mistral models
- **Real-time Chat**: Interactive AI chat with model selection
- **Code Generation**: Generate React projects with Tailwind CSS
- **Live Code Editor**: Built-in Sandpack editor with live preview
- **Model Selection**: Dynamic dropdown to switch between AI models
- **OpenRouter Integration**: Access to premium AI models via OpenRouter API

## Supported AI Models

### Google Gemini (Free)
- Gemini 2.0 Flash
- Gemini 1.5 Pro

### OpenRouter Models (Paid)
- GPT-4o ($5.00/1M tokens)
- GPT-4o Mini ($0.15/1M tokens)
- Claude 3.5 Sonnet ($3.00/1M tokens)
- Claude 3 Haiku ($0.25/1M tokens)
- Llama 3.1 405B ($2.70/1M tokens)
- Llama 3.1 70B ($0.90/1M tokens)
- Gemini Pro 1.5 ($1.25/1M tokens)
- Mistral 7B ($0.20/1M tokens)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd bolt-new
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key (Required for free models)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# OpenRouter API Key (Required for premium models)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# App URL (for OpenRouter referer header)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Convex (if using Convex backend)
CONVEX_DEPLOYMENT=your_convex_deployment_url
```

### 3. Get API Keys

#### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

#### OpenRouter API Key
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up and create an API key
3. Add it to your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set the following environment variables in Netlify:
   - `NEXT_PUBLIC_GEMINI_API_KEY`
   - `OPENROUTER_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your Netlify domain)
3. Deploy

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy

## Usage

1. **Select AI Model**: Use the dropdown in the chat interface to select your preferred AI model
2. **Chat**: Type messages in the chat interface to interact with the selected AI model
3. **Code Generation**: Ask the AI to generate React projects, and they will appear in the code editor
4. **Live Preview**: Switch to preview mode to see your generated code in action

## Architecture

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API + OpenRouter API
- **Code Editor**: Sandpack (CodeSandbox)
- **State Management**: React Context
- **Backend**: Convex (optional)

## API Routes

- `/api/ai-chat` - Chat with AI models
- `/api/ai-code` - Generate code with AI models

Both routes support the `modelId` parameter to specify which AI model to use.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License