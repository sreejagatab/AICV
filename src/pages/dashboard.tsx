import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import ResumeTemplates from "@/components/ResumeTemplates";
import ResumeTips from "@/components/ResumeTips";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ResumeFormData } from "@/types/resume";
import { saveResumeToHistory, saveResumeDraft, getResumeDraft } from "@/util/storage";
import { extractFirstName } from "@/util/string";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

// Initial form data
const initialFormData: ResumeFormData = {
  name: "",
  email: "",
  phone: "",
  jobTitle: "",
  location: "",
  website: "",
  summary: "",
  experience: "",
  education: "",
  skills: "",
  projects: "",
  certifications: "",
  resumeStyle: "professional",
  toneStyle: "formal",
  language: "english",
  additionalInstructions: "",
  generatedResume: ""
};

export default function Dashboard() {
  const [formData, setFormData] = useState<ResumeFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("form");
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Load draft on initial render
  useEffect(() => {
    const draft = getResumeDraft();
    if (draft) {
      setFormData(draft);
      setIsDraftLoaded(true);
      setLastSaved(new Date());
    }
  }, []);

  // Auto-save form data when it changes (debounced)
  useEffect(() => {
    // Skip initial render and only save if there's actual content
    if (
      formData.name ||
      formData.email ||
      formData.experience ||
      formData.education ||
      formData.skills
    ) {
      const timer = setTimeout(() => {
        saveResumeDraft(formData);
        setLastSaved(new Date());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const generateResume = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate resume");
      }
      
      const updatedFormData = { ...formData, generatedResume: data.content };
      setFormData(updatedFormData);
      
      // Save to history
      const savedItem = saveResumeToHistory(updatedFormData);
      
      // Show success toast
      toast({
        title: "Resume Generated Successfully",
        description: `Your resume has been created and saved to your history.`,
        duration: 5000,
      });
      
      setActiveTab("preview");
    } catch (err: any) {
      console.error("Error generating resume:", err);
      setError(err.message || "An error occurred while generating your resume. Please try again.");
      
      // Show error toast
      toast({
        title: "Error Generating Resume",
        description: err.message || "An error occurred. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadResume = useCallback((resumeData: ResumeFormData) => {
    setFormData(resumeData);
    if (resumeData.generatedResume) {
      setActiveTab("preview");
    } else {
      setActiveTab("form");
    }
    
    // Show toast notification
    toast({
      title: "Resume Loaded",
      description: `${resumeData.name || "Resume"} has been loaded successfully.`,
      duration: 3000,
    });
  }, [toast]);

  // Format the last saved time
  const getLastSavedText = () => {
    if (!lastSaved) return "";
    
    const now = new Date();
    const diffMs = now.getTime() - lastSaved.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    
    if (diffSec < 60) {
      return "Saved just now";
    } else if (diffMin < 60) {
      return `Saved ${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
    } else {
      return `Saved at ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      <Head>
        <title>AI Resume Builder - Dashboard</title>
        <meta name="description" content="Generate professional resumes with AI. Our resume builder helps you create impressive resumes tailored to your experience and career goals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header onLoadResume={handleLoadResume} />
        
        <main className="flex-1 container mx-auto p-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">AI-Powered Resume Builder</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Create professional, tailored resumes in minutes with our AI assistant. 
                Fill in your details, and we'll generate a polished resume ready for your job applications.
              </p>
              
              {isDraftLoaded && (
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  <Save className="h-3.5 w-3.5" />
                  <span>Draft loaded from your previous session</span>
                </div>
              )}
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Start with a Template</h2>
                {formData.name && (
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Save className="h-3 w-3" />
                    <span>{getLastSavedText()}</span>
                  </div>
                )}
              </div>
              <ResumeTemplates setFormData={setFormData} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="form">Resume Form</TabsTrigger>
                    <TabsTrigger value="preview" disabled={!formData.generatedResume && !isLoading}>
                      Resume Preview
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="form" className="mt-0">
                    <ResumeForm 
                      formData={formData}
                      isLoading={isLoading}
                      handleChange={handleChange}
                      handleSelectChange={handleSelectChange}
                      generateResume={generateResume}
                    />
                  </TabsContent>
                  
                  <TabsContent value="preview" className="mt-0">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center p-12">
                        <LoadingSpinner size="lg" className="mb-4" />
                        <p className="text-center text-muted-foreground">
                          {formData.name ? 
                            `Generating a professional resume for ${extractFirstName(formData.name)}...` : 
                            "Generating your professional resume..."}
                        </p>
                      </div>
                    ) : formData.generatedResume ? (
                      <ResumePreview 
                        resumeContent={formData.generatedResume} 
                        isLoading={isLoading}
                        onRegenerateClick={generateResume}
                        showWatermark={user?.subscription === 'free'}
                      />
                    ) : (
                      <div className="text-center p-12">
                        <p>No resume generated yet. Fill out the form and click "Generate Resume".</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="lg:col-span-1">
                <ResumeTips />
              </div>
            </div>
          </div>
        </main>
        
        <footer className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 AI Resume Builder. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}