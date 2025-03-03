import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Code, 
  LineChart, 
  Megaphone, 
  Briefcase, 
  GraduationCap,
  Lightbulb
} from "lucide-react";
import { ResumeFormData, ResumeTemplate } from "@/types/resume";

interface ResumeTemplatesProps {
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>;
}

const ResumeTemplates: React.FC<ResumeTemplatesProps> = ({ setFormData }) => {
  const templates: ResumeTemplate[] = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      description: "Template for software development professionals",
      data: {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "(555) 123-4567",
        jobTitle: "Senior Software Engineer",
        location: "San Francisco, CA",
        website: "linkedin.com/in/alexjohnson",
        summary: "Experienced software engineer with 7+ years of experience in full-stack development. Specialized in React, Node.js, and cloud architecture. Passionate about creating scalable and maintainable code.",
        experience: "Company: TechCorp Inc.\nPosition: Senior Software Engineer\nDuration: January 2020 - Present\nResponsibilities:\n- Led a team of 5 developers to build and maintain a SaaS platform\n- Implemented CI/CD pipelines reducing deployment time by 40%\n- Refactored legacy codebase improving performance by 30%\n\nCompany: WebSolutions LLC\nPosition: Software Developer\nDuration: June 2017 - December 2019\nResponsibilities:\n- Developed responsive web applications using React and Redux\n- Collaborated with UX designers to implement user-friendly interfaces\n- Participated in code reviews and mentored junior developers",
        education: "Degree: Master of Science in Computer Science\nInstitution: University of California, Berkeley\nGraduation Year: 2017\n\nDegree: Bachelor of Science in Software Engineering\nInstitution: Stanford University\nGraduation Year: 2015",
        skills: "Technical Skills: JavaScript, TypeScript, React, Node.js, Express, MongoDB, AWS, Docker, Kubernetes, Git\nSoft Skills: Team Leadership, Problem Solving, Communication, Agile Methodologies",
        projects: "Project: E-commerce Platform\nTechnologies: React, Node.js, MongoDB, AWS\nDescription: Built a scalable e-commerce platform with features including user authentication, product catalog, and payment processing.\n\nProject: Real-time Chat Application\nTechnologies: Socket.io, React, Express, Redis\nDescription: Developed a real-time messaging application supporting multiple chat rooms and direct messaging.",
        certifications: "AWS Certified Solutions Architect (2022)\nGoogle Cloud Professional Developer (2021)\nMongoDB Certified Developer (2020)",
        resumeStyle: "professional",
        toneStyle: "confident",
        language: "english",
        additionalInstructions: "Focus on technical achievements and problem-solving skills.",
        generatedResume: ""
      }
    },
    {
      id: "marketing-specialist",
      title: "Marketing Specialist",
      description: "Template for marketing and PR professionals",
      data: {
        name: "Jamie Smith",
        email: "jamie.smith@example.com",
        phone: "(555) 987-6543",
        jobTitle: "Digital Marketing Manager",
        location: "New York, NY",
        website: "linkedin.com/in/jamiesmith",
        summary: "Results-driven marketing professional with 5+ years of experience in digital marketing strategies. Proven track record of increasing brand awareness and driving conversion rates through innovative campaigns.",
        experience: "Company: Brand Innovators\nPosition: Digital Marketing Manager\nDuration: March 2021 - Present\nResponsibilities:\n- Managed social media campaigns resulting in 45% increase in engagement\n- Developed and executed email marketing strategies with 25% higher open rates\n- Supervised a team of 3 content creators and 2 graphic designers\n\nCompany: MarketPro Agency\nPosition: Marketing Specialist\nDuration: August 2018 - February 2021\nResponsibilities:\n- Created and optimized Google and Facebook ad campaigns\n- Conducted market research and competitor analysis\n- Collaborated with clients to develop marketing strategies aligned with business goals",
        education: "Degree: Bachelor of Business Administration, Marketing\nInstitution: New York University\nGraduation Year: 2018\n\nCertification: Digital Marketing Professional\nInstitution: American Marketing Association\nYear: 2019",
        skills: "Technical Skills: Google Analytics, SEO/SEM, Content Marketing, Social Media Management, Email Marketing, Adobe Creative Suite, HubSpot, Mailchimp\nSoft Skills: Creative Thinking, Project Management, Client Relations, Data Analysis, Strategic Planning",
        projects: "Campaign: Product Launch Campaign\nPlatforms: Instagram, Facebook, Google Ads\nResults: Achieved 150% of sales targets within first month of launch\n\nCampaign: Brand Awareness Initiative\nPlatforms: YouTube, LinkedIn, Industry Publications\nResults: Increased website traffic by 75% and generated 500+ qualified leads",
        certifications: "Google Analytics Certification (2022)\nHubSpot Inbound Marketing Certification (2021)\nFacebook Blueprint Certification (2020)",
        resumeStyle: "creative",
        toneStyle: "enthusiastic",
        language: "english",
        additionalInstructions: "Highlight creative achievements and measurable marketing results.",
        generatedResume: ""
      }
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Template for data science and analytics roles",
      data: {
        name: "Taylor Rivera",
        email: "taylor.rivera@example.com",
        phone: "(555) 456-7890",
        jobTitle: "Senior Data Scientist",
        location: "Boston, MA",
        website: "linkedin.com/in/taylorrivera",
        summary: "Data scientist with 6+ years of experience applying statistical modeling and machine learning to solve complex business problems. Expertise in predictive modeling, natural language processing, and data visualization.",
        experience: "Company: DataInsights Corp\nPosition: Senior Data Scientist\nDuration: July 2019 - Present\nResponsibilities:\n- Developed machine learning models that improved customer retention by 30%\n- Created automated data pipelines processing 5TB of data daily\n- Led a team of 4 data scientists and collaborated with cross-functional teams\n\nCompany: AnalyticsPro Inc.\nPosition: Data Analyst\nDuration: May 2017 - June 2019\nResponsibilities:\n- Performed statistical analysis to identify market trends\n- Built interactive dashboards for executive decision-making\n- Optimized SQL queries reducing report generation time by 60%",
        education: "Degree: Master of Science in Data Science\nInstitution: Massachusetts Institute of Technology\nGraduation Year: 2017\n\nDegree: Bachelor of Science in Statistics\nInstitution: University of Massachusetts\nGraduation Year: 2015",
        skills: "Technical Skills: Python, R, SQL, TensorFlow, PyTorch, Scikit-learn, Pandas, Tableau, Power BI, AWS, Hadoop\nSoft Skills: Critical Thinking, Problem Solving, Communication, Research, Attention to Detail",
        projects: "Project: Customer Churn Prediction Model\nTechnologies: Python, Scikit-learn, XGBoost\nResults: Reduced customer churn by 25% by identifying at-risk customers\n\nProject: Natural Language Processing for Sentiment Analysis\nTechnologies: Python, NLTK, BERT\nResults: Developed a model with 92% accuracy for analyzing customer feedback",
        certifications: "Microsoft Certified: Azure Data Scientist Associate (2022)\nTensorFlow Developer Certificate (2021)\nDatacamp Professional Data Scientist Certification (2020)",
        resumeStyle: "technical",
        toneStyle: "formal",
        language: "english",
        additionalInstructions: "Emphasize quantitative achievements and technical expertise.",
        generatedResume: ""
      }
    },
    {
      id: "product-manager",
      title: "Product Manager",
      description: "Template for product management professionals",
      data: {
        name: "Morgan Chen",
        email: "morgan.chen@example.com",
        phone: "(555) 234-5678",
        jobTitle: "Senior Product Manager",
        location: "Seattle, WA",
        website: "linkedin.com/in/morganchenprod",
        summary: "Strategic product manager with 8+ years of experience leading cross-functional teams to deliver innovative products. Skilled in user research, roadmap development, and agile methodologies with a proven track record of launching successful products that drive business growth.",
        experience: "Company: TechInnovate Inc.\nPosition: Senior Product Manager\nDuration: March 2020 - Present\nResponsibilities:\n- Led the development and launch of a flagship SaaS product generating $2M ARR in first year\n- Managed a cross-functional team of 15 engineers, designers, and marketing specialists\n- Implemented agile methodologies resulting in 35% faster time-to-market\n- Conducted user research and usability testing to inform product decisions\n\nCompany: ProductWave\nPosition: Product Manager\nDuration: January 2017 - February 2020\nResponsibilities:\n- Owned the product roadmap for a B2B platform with 50,000+ users\n- Collaborated with engineering to prioritize features and resolve technical debt\n- Analyzed user metrics to identify opportunities for product improvement\n- Increased user retention by 40% through targeted feature enhancements",
        education: "Degree: MBA, Technology Management\nInstitution: University of Washington\nGraduation Year: 2016\n\nDegree: Bachelor of Science in Computer Science\nInstitution: University of California, San Diego\nGraduation Year: 2013",
        skills: "Technical Skills: Product Roadmapping, Agile/Scrum, JIRA, User Story Mapping, A/B Testing, SQL, Product Analytics (Amplitude, Mixpanel), Wireframing\nSoft Skills: Strategic Thinking, Stakeholder Management, Communication, Prioritization, User Empathy, Cross-functional Leadership",
        projects: "Project: Mobile App Redesign\nOutcome: Increased user engagement by 65% and app store rating from 3.2 to 4.7\nApproach: Conducted extensive user research, created detailed user personas, and implemented iterative design process\n\nProject: Enterprise Feature Launch\nOutcome: Secured 5 enterprise clients worth $1.5M in annual revenue\nApproach: Developed comprehensive go-to-market strategy and collaborated with sales team on positioning",
        certifications: "Certified Scrum Product Owner (CSPO)\nProduct Management Certification - Product School\nGoogle Analytics Certification",
        resumeStyle: "professional",
        toneStyle: "confident",
        language: "english",
        additionalInstructions: "Emphasize product strategy, cross-functional leadership, and business impact.",
        generatedResume: ""
      }
    },
    {
      id: "ux-designer",
      title: "UX Designer",
      description: "Template for UX/UI design professionals",
      data: {
        name: "Jordan Taylor",
        email: "jordan.taylor@example.com",
        phone: "(555) 789-0123",
        jobTitle: "Senior UX/UI Designer",
        location: "Austin, TX",
        website: "jordantaylordesign.com",
        summary: "Creative UX/UI designer with 6+ years of experience crafting intuitive digital experiences. Passionate about user-centered design with expertise in research, wireframing, prototyping, and usability testing. Skilled in translating business requirements into engaging user interfaces.",
        experience: "Company: DesignForward Agency\nPosition: Senior UX/UI Designer\nDuration: June 2021 - Present\nResponsibilities:\n- Led UX/UI design for 10+ client projects across fintech, healthcare, and e-commerce\n- Conducted user research and created personas, user flows, and journey maps\n- Designed responsive interfaces for web and mobile applications\n- Collaborated with developers to ensure design implementation fidelity\n\nCompany: TechVision Inc.\nPosition: UX Designer\nDuration: August 2018 - May 2021\nResponsibilities:\n- Redesigned company's flagship product increasing user satisfaction by 45%\n- Created interactive prototypes and conducted usability testing with target users\n- Established design system to ensure consistency across products\n- Mentored junior designers and facilitated design thinking workshops",
        education: "Degree: Master of Fine Arts, Interaction Design\nInstitution: Rhode Island School of Design\nGraduation Year: 2018\n\nDegree: Bachelor of Arts in Graphic Design\nInstitution: University of Texas at Austin\nGraduation Year: 2016",
        skills: "Technical Skills: Figma, Adobe XD, Sketch, InVision, Principle, HTML/CSS, User Research, Wireframing, Prototyping, Usability Testing, Information Architecture\nSoft Skills: Creative Problem Solving, Empathy, Communication, Collaboration, Presentation, Visual Storytelling",
        projects: "Project: Financial App Redesign\nRole: Lead UX/UI Designer\nOutcome: Improved task completion rate by 60% and reduced support tickets by 35%\nProcess: Conducted competitive analysis, user interviews, card sorting, and iterative testing\n\nProject: E-commerce Website Overhaul\nRole: UX Designer\nOutcome: Increased conversion rate by 28% and average order value by 15%\nProcess: Created responsive designs optimized for mobile-first experience with streamlined checkout flow",
        certifications: "Nielsen Norman Group UX Certification\nInteraction Design Foundation UX Professional\nGoogle UX Design Professional Certificate",
        resumeStyle: "creative",
        toneStyle: "enthusiastic",
        language: "english",
        additionalInstructions: "Highlight design process, problem-solving approach, and measurable impact on user experience.",
        generatedResume: ""
      }
    },
    {
      id: "project-manager",
      title: "Project Manager",
      description: "Template for project management roles",
      data: {
        name: "Casey Wilson",
        email: "casey.wilson@example.com",
        phone: "(555) 345-6789",
        jobTitle: "Senior Project Manager",
        location: "Chicago, IL",
        website: "linkedin.com/in/caseywilsonpm",
        summary: "Certified project manager with 9+ years of experience leading complex projects from initiation to successful delivery. Skilled in agile and waterfall methodologies with a track record of completing projects on time and under budget while maintaining high quality standards.",
        experience: "Company: Enterprise Solutions Inc.\nPosition: Senior Project Manager\nDuration: April 2019 - Present\nResponsibilities:\n- Managed portfolio of 5 concurrent enterprise software implementation projects with combined budget of $3.5M\n- Led cross-functional teams of 20+ members across development, QA, and business stakeholders\n- Implemented risk management strategies that prevented potential $500K in cost overruns\n- Established PMO best practices improving on-time delivery rate from 65% to 92%\n\nCompany: TechDev Corporation\nPosition: Project Manager\nDuration: February 2016 - March 2019\nResponsibilities:\n- Managed end-to-end delivery of web and mobile application projects for Fortune 500 clients\n- Created and maintained project plans, schedules, and budgets using MS Project and JIRA\n- Facilitated daily stand-ups, sprint planning, and retrospective meetings\n- Communicated project status to executive stakeholders and managed client expectations",
        education: "Degree: Master of Business Administration (MBA)\nInstitution: Northwestern University, Kellogg School of Management\nGraduation Year: 2015\n\nDegree: Bachelor of Science in Business Administration\nInstitution: University of Illinois at Urbana-Champaign\nGraduation Year: 2012",
        skills: "Technical Skills: MS Project, JIRA, Confluence, Asana, Trello, Agile/Scrum, Waterfall, Kanban, Budgeting, Risk Management, Stakeholder Management, Resource Allocation\nSoft Skills: Leadership, Communication, Negotiation, Problem-solving, Conflict Resolution, Time Management, Critical Thinking",
        projects: "Project: Enterprise CRM Implementation\nBudget: $1.2M | Timeline: 10 months\nOutcome: Delivered on time and 8% under budget with 100% requirements fulfillment\nApproach: Hybrid Agile-Waterfall methodology with phased rollout strategy\n\nProject: Digital Transformation Initiative\nBudget: $2.5M | Timeline: 18 months\nOutcome: Streamlined operations resulting in $1.8M annual cost savings\nApproach: Agile methodology with continuous stakeholder engagement and change management",
        certifications: "Project Management Professional (PMP)\nCertified Scrum Master (CSM)\nPRINCE2 Practitioner\nProfessional Scrum Product Owner (PSPO)",
        resumeStyle: "professional",
        toneStyle: "formal",
        language: "english",
        additionalInstructions: "Emphasize project delivery success, budget management, and leadership skills.",
        generatedResume: ""
      }
    }
  ];

  const loadTemplate = (templateData: ResumeFormData) => {
    setFormData(prevData => ({
      ...templateData,
      generatedResume: prevData.generatedResume
    }));
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4 w-full justify-start overflow-auto">
        <TabsTrigger value="all">All Templates</TabsTrigger>
        <TabsTrigger value="tech">Tech</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
        <TabsTrigger value="creative">Creative</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} onSelect={loadTemplate} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="tech" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates
            .filter(t => ['software-engineer', 'data-scientist'].includes(t.id))
            .map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={loadTemplate} />
            ))}
        </div>
      </TabsContent>
      
      <TabsContent value="business" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates
            .filter(t => ['marketing-specialist', 'product-manager', 'project-manager'].includes(t.id))
            .map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={loadTemplate} />
            ))}
        </div>
      </TabsContent>
      
      <TabsContent value="creative" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates
            .filter(t => ['ux-designer'].includes(t.id))
            .map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={loadTemplate} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

interface TemplateCardProps {
  template: ResumeTemplate;
  onSelect: (data: ResumeFormData) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  // Get icon based on template id
  const getIcon = (id: string) => {
    switch (id) {
      case 'software-engineer':
        return <Code className="h-10 w-10 text-primary" />;
      case 'marketing-specialist':
        return <Megaphone className="h-10 w-10 text-primary" />;
      case 'data-scientist':
        return <LineChart className="h-10 w-10 text-primary" />;
      case 'product-manager':
        return <Lightbulb className="h-10 w-10 text-primary" />;
      case 'ux-designer':
        return <Briefcase className="h-10 w-10 text-primary" />;
      case 'project-manager':
        return <GraduationCap className="h-10 w-10 text-primary" />;
      default:
        return <Briefcase className="h-10 w-10 text-primary" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4">
          {getIcon(template.id)}
        </div>
        <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onSelect(template.data)}
        >
          Use Template
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResumeTemplates;