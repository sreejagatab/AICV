# AI Resume Builder

An AI-powered web application that helps users generate professional, tailored resumes using advanced technologies.

![AI Resume Builder](public/images/resume-builder-og.png)

## Features

- **AI-Driven Resume Generation**: Create professional resumes with AI assistance
- **Multi-Language Support**: Generate resumes in multiple languages
- **Professional Templates**: Choose from various industry-specific templates
- **Export Options**: Download as PDF, HTML, or text
- **Resume History**: Save and manage your resume drafts
- **Theme Customization**: Customize the appearance of your resume
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Subscription Tiers

- **Free Tier**: 1 month access, 1 resume, watermarked exports
- **Standard Tier**: £10/month, 30 resumes, no watermarks
- **Premium Tier**: £25/month, unlimited resumes, advanced features

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **AI Integration**: OpenAI API
- **PDF Generation**: jsPDF
- **State Management**: React Context API
- **Storage**: Local Storage (browser-based)

## Getting Started

### Prerequisites

- Node.js 20.x or later
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Project Structure

- `/src/pages`: Next.js pages
- `/src/components`: React components
- `/src/hooks`: Custom React hooks
- `/src/types`: TypeScript type definitions
- `/src/util`: Utility functions
- `/public`: Static assets

## Key Components

- **ResumeForm**: Multi-step form for collecting user information
- **ResumePreview**: Preview and export generated resumes
- **ResumeTemplates**: Template selection and management
- **ResumeHistory**: History of generated resumes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- shadcn/ui for the component library
- Vercel for hosting

---

© 2025 AI Resume Builder. All rights reserved.