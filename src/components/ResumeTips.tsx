import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const ResumeTips = () => {
  const tips = [
    {
      id: "formatting",
      title: "Resume Formatting Tips",
      tips: [
        "Keep your resume to one page for most positions",
        "Use consistent formatting throughout your resume",
        "Choose a clean, professional font like Arial, Calibri, or Helvetica",
        "Use bullet points to make information easy to scan",
        "Include white space to avoid a cluttered appearance"
      ]
    },
    {
      id: "content",
      title: "Content Best Practices",
      tips: [
        "Tailor your resume to each job application",
        "Use action verbs to begin bullet points (e.g., 'Developed', 'Managed', 'Created')",
        "Include quantifiable achievements when possible (e.g., 'Increased sales by 20%')",
        "Focus on relevant experience and skills for the position",
        "Proofread carefully to eliminate spelling and grammar errors"
      ]
    },
    {
      id: "sections",
      title: "Essential Resume Sections",
      tips: [
        "Contact Information: Name, phone, email, location, and LinkedIn profile",
        "Professional Summary: Brief overview of your experience and strengths",
        "Work Experience: Job titles, companies, dates, and accomplishments",
        "Education: Degrees, institutions, graduation dates, and relevant coursework",
        "Skills: Technical and soft skills relevant to the position"
      ]
    },
    {
      id: "ats",
      title: "ATS Optimization",
      tips: [
        "Include keywords from the job description",
        "Use standard section headings that ATS systems can recognize",
        "Avoid using tables, headers, footers, or text boxes",
        "Submit your resume as a .docx or .pdf file unless otherwise specified",
        "Keep formatting simple to ensure the ATS can parse your information correctly"
      ]
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Resume Writing Tips</h3>
        <Accordion type="multiple" className="w-full">
          {tips.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-md font-medium">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 mt-2">
                  {section.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ResumeTips;