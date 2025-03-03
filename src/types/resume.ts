export interface ResumeFormData {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
  website: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  certifications: string;
  resumeStyle: string;
  toneStyle: string;
  language: string;
  additionalInstructions: string;
  generatedResume: string;
}

export type ResumeTemplate = {
  id: string;
  title: string;
  description: string;
  data: ResumeFormData;
};

export type ResumeHistory = {
  id: string;
  name: string;
  date: string;
  resumeData: ResumeFormData;
};