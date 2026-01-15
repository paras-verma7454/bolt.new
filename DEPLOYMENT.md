# Deployment Guide

This guide covers deploying the Bolt New AI platform to various hosting services.

## Prerequisites

Before deploying, ensure you have:

1. **Google Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **OpenRouter API Key** - Get from [OpenRouter](https://openrouter.ai/)
3. **Convex Deployment URL** (Optional) - Get from [Convex](https://convex.dev/)

## Environment Variables

Set these environment variables in your hosting platform:

```env
# Required for AI functionality
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Required for OpenRouter referer header
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional - for Convex backend features
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

## Netlify Deployment

### Method 1: Git Integration (Recommended)

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`

3. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add all required environment variables listed above

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Method 2: Manual Deploy

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Upload to Netlify**
   - Go to Netlify dashboard
   - Drag and drop the `.next` folder
   - Set environment variables in site settings

## Vercel Deployment

### Method 1: Git Integration (Recommended)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com/)
   - Click "Import Project"
   - Connect your GitHub repository

2. **Configure Project**
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

3. **Set Environment Variables**
   - Go to Project settings > Environment Variables
   - Add all required environment variables

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_GEMINI_API_KEY
   vercel env add OPENROUTER_API_KEY
   vercel env add NEXT_PUBLIC_APP_URL
   ```

## Railway Deployment

1. **Connect Repository**
   - Go to [Railway](https://railway.app/)
   - Click "New Project"
   - Connect your GitHub repository

2. **Configure Environment**
   - Set environment variables in Railway dashboard
   - Railway will automatically detect Next.js

3. **Deploy**
   - Railway will automatically build and deploy

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t bolt-new .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GEMINI_API_KEY=your_key \
  -e OPENROUTER_API_KEY=your_key \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  bolt-new
```

## Testing Deployment

After deployment, test the following:

1. **Homepage Loads**: Visit your domain
2. **Model Selection**: Check if the AI model dropdown appears
3. **Chat Functionality**: Test chat with different models
4. **Code Generation**: Test code generation feature
5. **API Endpoints**: Test `/api/ai-chat` and `/api/ai-code`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Ensure all dependencies are installed
   - Check environment variables are set

2. **API Errors**
   - Verify API keys are correct
   - Check API key permissions
   - Ensure referer headers are set correctly

3. **Convex Errors**
   - Convex is optional - app works without it
   - Check `NEXT_PUBLIC_CONVEX_URL` is set correctly

### Environment Variable Checklist

- [ ] `NEXT_PUBLIC_GEMINI_API_KEY` - Google Gemini API key
- [ ] `OPENROUTER_API_KEY` - OpenRouter API key  
- [ ] `NEXT_PUBLIC_APP_URL` - Your deployed domain
- [ ] `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL (optional)

## Production Considerations

1. **Security**
   - Never commit API keys to repository
   - Use environment variables for all secrets
   - Enable HTTPS in production

2. **Performance**
   - Enable Next.js optimizations
   - Use CDN for static assets
   - Monitor API usage and costs

3. **Monitoring**
   - Set up error tracking (Sentry, etc.)
   - Monitor API usage and costs
   - Set up uptime monitoring

## Support

If you encounter issues:

1. Check the console for errors
2. Verify environment variables are set
3. Test API keys independently
4. Check hosting platform logs
5. Review this deployment guide

For additional help, refer to the main README.md file.