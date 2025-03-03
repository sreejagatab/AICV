# AI Resume Builder - Deployment Guide

This guide provides instructions for deploying and maintaining the AI Resume Builder application.

## Prerequisites

Before deploying the application, ensure you have:

1. **Node.js**: Version 20.x or later
2. **OpenAI API Key**: Required for the resume generation functionality
3. **Vercel Account**: For hosting the application (recommended)

## Environment Variables

The application requires the following environment variables:

| Variable | Description | How to Obtain |
|----------|-------------|---------------|
| `NEXT_PUBLIC_OPENAI_API_KEY` | API key for OpenAI services | Create an account at [OpenAI](https://platform.openai.com/) and generate an API key |

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. **Fork or Clone the Repository**
   - Create your own copy of the repository on GitHub

2. **Connect to Vercel**
   - Log in to [Vercel](https://vercel.com/)
   - Click "New Project" and import your repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build` or `pnpm build`

3. **Set Environment Variables**
   - In the Vercel project settings, add the required environment variables
   - Make sure to add `NEXT_PUBLIC_OPENAI_API_KEY` with your OpenAI API key

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Vercel will provide a deployment URL once finished

### Option 2: Manual Deployment

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-builder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set Environment Variables**
   - Create a `.env.local` file in the root directory
   - Add the required environment variables:
     ```
     NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
     ```

4. **Build the Application**
   ```bash
   npm run build
   # or
   pnpm build
   ```

5. **Start the Production Server**
   ```bash
   npm start
   # or
   pnpm start
   ```

## Post-Deployment Tasks

After deploying the application, perform these tasks:

1. **Test the Application**
   - Verify that all pages load correctly
   - Test the resume generation functionality
   - Check that PDF and other export options work

2. **Set Up Custom Domain (Optional)**
   - If using Vercel, configure a custom domain in the project settings
   - Update DNS records as instructed by Vercel

3. **Set Up Analytics (Optional)**
   - Consider adding Google Analytics or another analytics solution
   - Update the privacy policy if you implement tracking

## Maintenance

### Regular Updates

1. **Dependencies**
   - Regularly update dependencies to ensure security and performance
   ```bash
   npm update
   # or
   pnpm update
   ```

2. **OpenAI API**
   - Monitor OpenAI API usage and costs
   - Update the API key if necessary

### Troubleshooting

If you encounter issues with the application:

1. **Check Logs**
   - Review server logs for errors
   - In Vercel, check the "Deployments" tab for build and runtime logs

2. **Common Issues**
   - **Resume Generation Fails**: Verify the OpenAI API key is valid and has sufficient credits
   - **PDF Generation Issues**: Check browser console for errors related to PDF generation

## Scaling Considerations

As your user base grows:

1. **OpenAI API Limits**
   - Monitor API usage and consider upgrading your OpenAI plan if needed
   - Implement rate limiting to prevent abuse

2. **Storage**
   - The application currently uses local storage for saving resumes
   - Consider implementing a database solution for persistent storage

3. **Authentication**
   - The current authentication is simulated
   - Consider implementing a real authentication system like Auth0 or NextAuth.js

## Support

If you need assistance with deployment or encounter issues:

- Create an issue in the GitHub repository
- Contact the development team at support@airesumebuilder.com

---

© 2025 AI Resume Builder. All rights reserved.