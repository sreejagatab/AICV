import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ResumeFormData } from "@/types/resume";

interface ResumeFormProps {
  formData: ResumeFormData;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  generateResume: () => Promise<void>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  formData,
  isLoading,
  handleChange,
  handleSelectChange,
  generateResume,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <Accordion type="single" collapsible defaultValue="personal" className="w-full">
          <AccordionItem value="personal">
            <AccordionTrigger className="text-lg font-medium">Personal Information</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    onChange={handleChange}
                    value={formData.name}
                    className="bg-background"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Software Engineer"
                    onChange={handleChange}
                    value={formData.jobTitle}
                    className="bg-background"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    onChange={handleChange}
                    value={formData.email}
                    className="bg-background"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    onChange={handleChange}
                    value={formData.phone}
                    className="bg-background"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="New York, NY"
                    onChange={handleChange}
                    value={formData.location}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website/LinkedIn</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="linkedin.com/in/johndoe"
                    onChange={handleChange}
                    value={formData.website}
                    className="bg-background"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  placeholder="A brief overview of your professional background and career goals..."
                  onChange={handleChange}
                  value={formData.summary}
                  className="min-h-[100px] bg-background"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="experience">
            <AccordionTrigger className="text-lg font-medium">Work Experience *</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Work Experience Details</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  placeholder="Company Name: XYZ Corp
Position: Senior Developer
Duration: Jan 2020 - Present
Responsibilities:
- Led a team of 5 developers
- Implemented new features that increased user engagement by 25%
- Optimized database queries reducing load times by 40%"
                  onChange={handleChange}
                  value={formData.experience}
                  className="min-h-[200px] bg-background"
                  required
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="education">
            <AccordionTrigger className="text-lg font-medium">Education</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education Details</Label>
                <Textarea
                  id="education"
                  name="education"
                  placeholder="Degree: Bachelor of Science in Computer Science
Institution: University of Technology
Graduation Year: 2018
GPA: 3.8/4.0
Relevant Coursework: Data Structures, Algorithms, Database Systems"
                  onChange={handleChange}
                  value={formData.education}
                  className="min-h-[150px] bg-background"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="skills">
            <AccordionTrigger className="text-lg font-medium">Skills</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Technical & Soft Skills</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="Technical Skills: JavaScript, React, Node.js, SQL, Git
Soft Skills: Team Leadership, Communication, Problem-solving, Time Management"
                  onChange={handleChange}
                  value={formData.skills}
                  className="min-h-[150px] bg-background"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="projects">
            <AccordionTrigger className="text-lg font-medium">Projects</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="projects">Project Details</Label>
                <Textarea
                  id="projects"
                  name="projects"
                  placeholder="Project Name: E-commerce Platform
Technologies: React, Node.js, MongoDB
Description: Developed a full-stack e-commerce platform with user authentication, product catalog, and payment processing.
Achievements: Increased conversion rate by 15%, implemented responsive design"
                  onChange={handleChange}
                  value={formData.projects}
                  className="min-h-[150px] bg-background"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="certifications">
            <AccordionTrigger className="text-lg font-medium">Certifications</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="certifications">Certification Details</Label>
                <Textarea
                  id="certifications"
                  name="certifications"
                  placeholder="AWS Certified Solutions Architect (2022)
Google Cloud Professional Data Engineer (2021)
Scrum Master Certification (2020)"
                  onChange={handleChange}
                  value={formData.certifications}
                  className="min-h-[100px] bg-background"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="preferences">
            <AccordionTrigger className="text-lg font-medium">Resume Preferences</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resumeStyle">Resume Style</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("resumeStyle", value)}
                    value={formData.resumeStyle}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toneStyle">Tone Style</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("toneStyle", value)}
                    value={formData.toneStyle}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="confident">Confident</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Resume Language</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("language", value)}
                  value={formData.language || "english"}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                    <SelectItem value="russian">Russian</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalInstructions">Additional Instructions</Label>
                <Textarea
                  id="additionalInstructions"
                  name="additionalInstructions"
                  placeholder="Any specific requirements or focus areas for your resume..."
                  onChange={handleChange}
                  value={formData.additionalInstructions}
                  className="min-h-[100px] bg-background"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Button 
          onClick={generateResume} 
          className="w-full"
          disabled={!formData.name || !formData.email || !formData.experience || isLoading}
        >
          {isLoading ? "Generating..." : "Generate Resume"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;