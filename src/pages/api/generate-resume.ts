import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  content?: string;
  error?: string;
  requestId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Generate a unique request ID for tracking
  const requestId = generateRequestId();
  
  if (req.method !== 'POST') {
    console.error(`[${requestId}] Method not allowed: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed', requestId });
  }

  try {
    console.log(`[${requestId}] Processing resume generation request`);
    const { formData } = req.body;
    
    if (!formData) {
      console.error(`[${requestId}] Missing form data`);
      return res.status(400).json({ error: 'Missing form data', requestId });
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.experience) {
      console.error(`[${requestId}] Missing required fields`, { 
        hasName: !!formData.name, 
        hasEmail: !!formData.email, 
        hasExperience: !!formData.experience 
      });
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and work experience are required',
        requestId
      });
    }

    // Construct a detailed prompt based on the provided form data
    const prompt = constructPrompt(formData);
    console.log(`[${requestId}] Prompt constructed, calling OpenAI API`);
    
    // Set timeout for OpenAI API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      // Call OpenAI API
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey) {
        console.error(`[${requestId}] Missing OpenAI API key`);
        return res.status(500).json({ 
          error: 'Server configuration error: Missing API key',
          requestId
        });
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 2500
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error(`[${requestId}] OpenAI API error:`, data);
        return res.status(response.status).json({ 
          error: data.error?.message || 'Failed to generate resume',
          requestId
        });
      }

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error(`[${requestId}] Unexpected OpenAI API response format:`, data);
        return res.status(500).json({ 
          error: 'Unexpected response from AI service',
          requestId
        });
      }

      console.log(`[${requestId}] Resume successfully generated`);
      return res.status(200).json({ 
        content: data.choices[0].message.content,
        requestId
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error(`[${requestId}] OpenAI API request timed out`);
        return res.status(504).json({ 
          error: 'Request to AI service timed out. Please try again.',
          requestId
        });
      }
      throw fetchError;
    }
  } catch (error: any) {
    console.error(`[${requestId}] Error generating resume:`, error);
    return res.status(500).json({ 
      error: 'Failed to generate resume. Please try again later.',
      requestId
    });
  }
}

function constructPrompt(formData: any): string {
  // Get the language for the resume
  const language = formData.language || 'english';
  
  // Create a detailed prompt based on the form data
  let prompt = `Generate a professional resume for the following details. The resume should be in ${language.charAt(0).toUpperCase() + language.slice(1)}:\n\n`;
  
  // Personal Information
  prompt += `PERSONAL INFORMATION:\n`;
  if (formData.name) prompt += `Name: ${formData.name}\n`;
  if (formData.jobTitle) prompt += `Job Title: ${formData.jobTitle}\n`;
  if (formData.email) prompt += `Email: ${formData.email}\n`;
  if (formData.phone) prompt += `Phone: ${formData.phone}\n`;
  if (formData.location) prompt += `Location: ${formData.location}\n`;
  if (formData.website) prompt += `Website/LinkedIn: ${formData.website}\n`;
  
  // Summary
  if (formData.summary) {
    prompt += `\nPROFESSIONAL SUMMARY:\n${formData.summary}\n`;
  }
  
  // Work Experience
  if (formData.experience) {
    prompt += `\nWORK EXPERIENCE:\n${formData.experience}\n`;
  }
  
  // Education
  if (formData.education) {
    prompt += `\nEDUCATION:\n${formData.education}\n`;
  }
  
  // Skills
  if (formData.skills) {
    prompt += `\nSKILLS:\n${formData.skills}\n`;
  }
  
  // Projects
  if (formData.projects) {
    prompt += `\nPROJECTS:\n${formData.projects}\n`;
  }
  
  // Certifications
  if (formData.certifications) {
    prompt += `\nCERTIFICATIONS:\n${formData.certifications}\n`;
  }
  
  // Resume Style and Tone
  prompt += `\nRESUME PREFERENCES:\n`;
  if (formData.resumeStyle) prompt += `Style: ${formData.resumeStyle}\n`;
  if (formData.toneStyle) prompt += `Tone: ${formData.toneStyle}\n`;
  
  // Additional Instructions
  if (formData.additionalInstructions) {
    prompt += `\nADDITIONAL INSTRUCTIONS:\n${formData.additionalInstructions}\n`;
  }
  
  // Final instructions for formatting
  prompt += `\nPlease format the resume in a professional way with clear sections and bullet points. 
Make sure to highlight key achievements and skills relevant to the job title.
Use appropriate headings and organize the content in a logical structure.
The resume should be concise, impactful, and ready for professional use.
Ensure all text is in ${language.charAt(0).toUpperCase() + language.slice(1)}.
Format the resume with clear section headers in ALL CAPS followed by relevant content with bullet points for achievements and responsibilities.`;
  
  return prompt;
}

// Generate a unique request ID for tracking
function generateRequestId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}