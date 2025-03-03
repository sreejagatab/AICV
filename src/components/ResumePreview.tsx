import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveAs } from "file-saver";
import { generatePDF } from "@/util/pdf";
import { 
  Download, 
  Copy, 
  FileText, 
  Code, 
  Check,
  RefreshCw,
  FileType,
  Save,
  Printer,
  Share2,
  Palette,
  Lock
} from "lucide-react";
import { capitalizeFirstLetter } from "@/util/string";

interface ResumePreviewProps {
  resumeContent: string;
  isLoading: boolean;
  onRegenerateClick: () => Promise<void>;
  showWatermark?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  resumeContent, 
  isLoading,
  onRegenerateClick,
  showWatermark = false
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [previewTheme, setPreviewTheme] = useState("modern");
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadAsText = () => {
    const blob = new Blob([resumeContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "resume.txt");
  };

  const downloadAsHTML = () => {
    // Extract name from resume content for the filename
    const nameMatch = resumeContent.match(/^(.+?)(?:\n|$)/);
    const name = nameMatch && nameMatch[1].trim() 
      ? nameMatch[1].trim().toLowerCase().replace(/\s+/g, '_')
      : 'resume';
    
    // Convert plain text to enhanced HTML with proper formatting and styling
    let htmlContent = '';
    const lines = resumeContent.split('\n');
    
    // Process lines to create structured HTML
    let inList = false;
    
    lines.forEach(line => {
      // Check if line is a header (all caps or ends with a colon)
      if (line.toUpperCase() === line && line.trim().length > 0 && /[A-Z]/.test(line)) {
        if (inList) {
          htmlContent += '</ul>';
          inList = false;
        }
        htmlContent += `<h2 class="section-header">${line.trim()}</h2>`;
      }
      // Check if line is a subheader (ends with a colon)
      else if (line.trim().endsWith(':') && line.length < 50) {
        if (inList) {
          htmlContent += '</ul>';
          inList = false;
        }
        htmlContent += `<h3 class="sub-header">${line.trim()}</h3>`;
      }
      // Check if line is a bullet point
      else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        if (!inList) {
          htmlContent += '<ul class="resume-list">';
          inList = true;
        }
        htmlContent += `<li>${line.trim().substring(1).trim()}</li>`;
      }
      // Regular line with content
      else if (line.trim()) {
        if (inList) {
          htmlContent += '</ul>';
          inList = false;
        }
        htmlContent += `<p>${line.trim()}</p>`;
      }
      // Empty line - add spacing
      else if (!inList) {
        htmlContent += '<div class="spacer"></div>';
      }
    });
    
    // Close any open list
    if (inList) {
      htmlContent += '</ul>';
    }
    
    // Add watermark if needed
    const watermarkHtml = showWatermark ? `
      <div class="watermark">
        FREE TRIAL VERSION
      </div>
    ` : '';
    
    // Create full HTML document with styling
    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Resume - ${name}</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            color: #333;
            position: relative;
          }
          .section-header {
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 5px;
            margin-top: 25px;
            margin-bottom: 15px;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .sub-header {
            color: #4b5563;
            margin-top: 15px;
            margin-bottom: 5px;
            font-size: 16px;
            font-weight: 600;
          }
          p {
            margin-bottom: 10px;
            text-align: justify;
          }
          .resume-list {
            margin-top: 10px;
            margin-bottom: 15px;
            padding-left: 20px;
          }
          .resume-list li {
            margin-bottom: 8px;
            position: relative;
          }
          .spacer {
            height: 10px;
          }
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 60px;
            color: rgba(200, 200, 200, 0.3);
            font-weight: bold;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
          }
          @media print {
            body {
              padding: 0;
              color: #000;
            }
            .section-header {
              color: #000;
              border-bottom-color: #000;
            }
            .watermark {
              color: rgba(200, 200, 200, 0.5);
              font-size: 80px;
            }
          }
        </style>
      </head>
      <body>
        ${watermarkHtml}
        ${htmlContent}
        <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #9ca3af;">
          Generated with AI Resume Builder
        </footer>
      </body>
      </html>
    `;
    
    const blob = new Blob([fullHTML], { type: "text/html;charset=utf-8" });
    saveAs(blob, `${name}_resume.html`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(resumeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const printResume = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    // Extract name from resume content
    const nameMatch = resumeContent.match(/^(.+?)(?:\n|$)/);
    const name = nameMatch && nameMatch[1].trim() ? nameMatch[1].trim() : 'Resume';
    
    // Create print-friendly HTML
    let printContent = '<div class="resume-content">';
    
    resumeContent.split('\n').forEach(line => {
      // Check if line is a header (all caps or ends with a colon)
      if (line.toUpperCase() === line && line.trim().length > 0 && /[A-Z]/.test(line)) {
        printContent += `<h2 class="section-header">${line}</h2>`;
      }
      // Check if line is a subheader (ends with a colon)
      else if (line.trim().endsWith(':') && line.length < 50) {
        printContent += `<h3 class="sub-header">${line}</h3>`;
      }
      // Check if line is a bullet point
      else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        printContent += `<div class="bullet-point">• ${line.trim().substring(1).trim()}</div>`;
      }
      // Regular line
      else if (line.trim()) {
        printContent += `<p>${line}</p>`;
      }
      // Empty line
      else {
        printContent += '<div class="spacer"></div>';
      }
    });
    
    printContent += '</div>';
    
    // Add watermark if needed
    const watermarkHtml = showWatermark ? `
      <div class="watermark">
        FREE TRIAL VERSION
      </div>
    ` : '';
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${name} - Resume</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            position: relative;
          }
          .resume-content {
            padding: 20px;
          }
          .section-header {
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 5px;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 16px;
          }
          .sub-header {
            color: #4b5563;
            margin-top: 15px;
            margin-bottom: 5px;
            font-size: 14px;
            font-weight: 600;
          }
          p {
            margin-bottom: 8px;
          }
          .bullet-point {
            margin-left: 15px;
            margin-bottom: 5px;
            position: relative;
          }
          .spacer {
            height: 8px;
          }
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 60px;
            color: rgba(200, 200, 200, 0.3);
            font-weight: bold;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            .resume-content {
              padding: 0;
            }
            .watermark {
              color: rgba(200, 200, 200, 0.5);
              font-size: 80px;
            }
            @page {
              margin: 0.5cm;
            }
          }
        </style>
      </head>
      <body>
        ${watermarkHtml}
        ${printContent}
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          };
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  // Get theme class based on selected theme
  const getThemeClass = () => {
    switch (previewTheme) {
      case 'modern':
        return 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100';
      case 'classic':
        return 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100';
      case 'professional':
        return 'bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100';
      case 'minimal':
        return 'bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100';
      case 'creative':
        return 'bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100';
      default:
        return 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100';
    }
  };

  // Get header style based on selected theme
  const getHeaderStyle = (line: string) => {
    const isHeader = line.toUpperCase() === line && line.trim().length > 0 && /[A-Z]/.test(line);
    const isSubheader = line.trim().endsWith(':') && line.length < 50;
    
    if (isHeader) {
      switch (previewTheme) {
        case 'modern':
          return 'font-bold text-lg text-blue-600 dark:text-blue-400 mt-6 mb-3 pb-1 border-b border-blue-300 dark:border-blue-700';
        case 'classic':
          return 'font-bold text-lg text-slate-800 dark:text-slate-200 mt-6 mb-3 pb-1 border-b-2 border-slate-300 dark:border-slate-700';
        case 'professional':
          return 'font-bold text-lg text-blue-800 dark:text-blue-300 mt-6 mb-3 pb-1 border-b border-blue-400 dark:border-blue-600';
        case 'minimal':
          return 'font-bold text-lg text-gray-900 dark:text-gray-100 mt-6 mb-3';
        case 'creative':
          return 'font-bold text-lg text-purple-700 dark:text-purple-300 mt-6 mb-3 pb-1 border-b border-purple-300 dark:border-purple-700';
        default:
          return 'font-bold text-lg mt-6 mb-3';
      }
    } else if (isSubheader) {
      switch (previewTheme) {
        case 'modern':
          return 'font-semibold text-md text-gray-700 dark:text-gray-300 mt-4 mb-2';
        case 'classic':
          return 'font-semibold text-md text-slate-700 dark:text-slate-300 mt-4 mb-2';
        case 'professional':
          return 'font-semibold text-md text-blue-700 dark:text-blue-300 mt-4 mb-2';
        case 'minimal':
          return 'font-semibold text-md text-gray-800 dark:text-gray-200 mt-4 mb-2';
        case 'creative':
          return 'font-semibold text-md text-purple-600 dark:text-purple-400 mt-4 mb-2';
        default:
          return 'font-semibold text-md mt-4 mb-2';
      }
    }
    
    return '';
  };

  // Get bullet point style based on selected theme
  const getBulletStyle = () => {
    switch (previewTheme) {
      case 'modern':
        return 'ml-5 mb-2 before:content-["•"] before:text-blue-500 before:mr-2 before:absolute before:left-[-15px]';
      case 'classic':
        return 'ml-5 mb-2 before:content-["•"] before:text-slate-500 before:mr-2 before:absolute before:left-[-15px]';
      case 'professional':
        return 'ml-5 mb-2 before:content-["•"] before:text-blue-600 before:mr-2 before:absolute before:left-[-15px]';
      case 'minimal':
        return 'ml-5 mb-2 before:content-["–"] before:text-gray-500 before:mr-2 before:absolute before:left-[-15px]';
      case 'creative':
        return 'ml-5 mb-2 before:content-["★"] before:text-purple-500 before:mr-2 before:absolute before:left-[-15px]';
      default:
        return 'ml-5 mb-2';
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {showWatermark && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-3 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>
                <strong>Free Trial:</strong> Your resume will include a watermark. Upgrade to remove watermarks and access more features.
              </span>
              <Link href="/pricing" className="text-primary hover:underline ml-auto">
                Upgrade
              </Link>
            </div>
          )}
          
          <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw Text</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap gap-2">
                {activeTab === "preview" && (
                  <div className="flex items-center">
                    <Palette className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Select 
                      value={previewTheme} 
                      onValueChange={setPreviewTheme}
                    >
                      <SelectTrigger className="w-[130px] h-9">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  disabled={isLoading}
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={printResume}
                  disabled={isLoading}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRegenerateClick}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  {isLoading ? "Regenerating..." : "Regenerate"}
                </Button>
              </div>
            </div>
            
            <TabsContent value="preview" className="mt-0">
              <div 
                ref={previewRef}
                className={`p-6 rounded-lg border shadow-sm relative ${getThemeClass()}`}
              >
                {showWatermark && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-gray-200 dark:text-gray-800 text-6xl font-bold transform -rotate-45 opacity-20">
                      FREE TRIAL
                    </div>
                  </div>
                )}
                <div className="prose prose-sm dark:prose-invert max-w-none relative z-10">
                  {resumeContent.split('\n').map((line, index) => {
                    // Check if line is a header (all caps or ends with a colon)
                    if ((line.toUpperCase() === line && line.trim().length > 0 && /[A-Z]/.test(line)) || 
                        (line.trim().endsWith(':') && line.length < 50)) {
                      return (
                        <h3 key={index} className={getHeaderStyle(line)}>
                          {line}
                        </h3>
                      );
                    }
                    // Check if line is a bullet point
                    else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                      return (
                        <div key={index} className={`relative ${getBulletStyle()}`}>
                          {line.trim().substring(1).trim()}
                        </div>
                      );
                    }
                    // Regular line
                    else if (line.trim()) {
                      return <p key={index} className="mb-2">{line}</p>;
                    }
                    // Empty line
                    return <div key={index} className="h-2"></div>;
                  })}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="raw" className="mt-0">
              <div className="p-4 rounded-lg border bg-muted font-mono text-sm">
                <pre className="whitespace-pre-wrap">{resumeContent}</pre>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Button 
              onClick={() => {
                // Extract name from resume content
                const nameMatch = resumeContent.match(/^(.+?)(?:\n|$)/);
                const name = nameMatch && nameMatch[1].trim() ? nameMatch[1].trim() : 'resume';
                generatePDF(resumeContent, name, showWatermark);
              }}
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              <FileType className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button 
              onClick={downloadAsText} 
              variant="outline"
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download Text
            </Button>
            <Button 
              onClick={downloadAsHTML} 
              variant="outline"
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              <Code className="h-4 w-4 mr-2" />
              Download HTML
            </Button>
            <Button 
              onClick={printResume} 
              variant="outline"
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Resume
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;