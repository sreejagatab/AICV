import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface ResumeSection {
  title: string;
  content: string[];
  isHeader?: boolean;
}

export const generatePDF = (resumeContent: string, name: string = 'resume', showWatermark: boolean = false): void => {
  try {
    // Extract name from resume content if not provided
    if (name === 'resume') {
      const nameMatch = resumeContent.match(/^(.+?)(?:\n|$)/);
      if (nameMatch && nameMatch[1].trim()) {
        name = nameMatch[1].trim();
      }
    }
    
    // Create PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Set document properties
    doc.setProperties({
      title: `${name} Resume`,
      subject: 'Professional Resume',
      author: 'AI Resume Builder',
      keywords: 'resume, cv, job application, professional',
      creator: 'AI Resume Builder'
    });
    
    // Define colors and styles
    const colors = {
      primary: [41, 98, 255],    // Blue
      secondary: [100, 100, 100], // Dark gray
      text: [50, 50, 50],        // Almost black
      light: [150, 150, 150]     // Light gray
    };
    
    // Parse content into sections
    const sections = parseResumeContent(resumeContent);
    let yPosition = 20;
    const margin = {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20
    };
    const contentWidth = doc.internal.pageSize.width - margin.left - margin.right;
    
    // Check if first section is likely a header (name and contact info)
    let hasHeader = false;
    if (sections.length > 0 && (sections[0].title.toUpperCase() === sections[0].title || 
        sections[0].title.includes('PERSONAL') || sections[0].content.length <= 6)) {
      sections[0].isHeader = true;
      hasHeader = true;
    }
    
    // Render each section
    sections.forEach((section, sectionIndex) => {
      // Check if we need a new page
      if (yPosition > doc.internal.pageSize.height - margin.bottom) {
        doc.addPage();
        yPosition = margin.top;
      }
      
      // Special formatting for header section
      if (section.isHeader) {
        // Name as main header
        if (section.content.length > 0) {
          const possibleName = section.content[0].split(':').pop()?.trim() || section.content[0];
          doc.setFontSize(24);
          doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
          doc.setFont('helvetica', 'bold');
          doc.text(possibleName, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
          yPosition += 10;
        }
        
        // Contact information in a horizontal layout
        const contactInfo = section.content.slice(1);
        if (contactInfo.length > 0) {
          doc.setFontSize(10);
          doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
          doc.setFont('helvetica', 'normal');
          
          // Format contact info on one line if possible
          const contactText = contactInfo
            .map(line => line.split(':').pop()?.trim() || line)
            .join(' | ');
          
          const contactLines = doc.splitTextToSize(contactText, contentWidth);
          doc.text(contactLines, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
          yPosition += (contactLines.length * 6) + 5;
        }
        
        // Add a divider
        doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
        doc.setLineWidth(0.5);
        doc.line(margin.left, yPosition, doc.internal.pageSize.width - margin.right, yPosition);
        yPosition += 10;
      } else {
        // Regular section
        // Render section title
        if (section.title) {
          doc.setFontSize(14);
          doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
          doc.setFont('helvetica', 'bold');
          doc.text(section.title, margin.left, yPosition);
          yPosition += 7;
          
          // Add underline
          doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
          doc.setLineWidth(0.3);
          doc.line(margin.left, yPosition, doc.internal.pageSize.width - margin.right, yPosition);
          yPosition += 7;
        }
        
        // Render section content
        doc.setFontSize(10);
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        doc.setFont('helvetica', 'normal');
        
        // Process content with special formatting for different types of lines
        section.content.forEach(line => {
          // Check if line is a bullet point
          if (line.startsWith('- ') || line.startsWith('• ')) {
            const bulletText = line.substring(2);
            const textLines = doc.splitTextToSize(bulletText, contentWidth - 5);
            
            textLines.forEach((textLine: string, index: number) => {
              if (yPosition > doc.internal.pageSize.height - margin.bottom) {
                doc.addPage();
                yPosition = margin.top;
              }
              
              if (index === 0) {
                doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
                doc.text('•', margin.left, yPosition);
                doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
                doc.text(textLine, margin.left + 5, yPosition);
              } else {
                doc.text(textLine, margin.left + 5, yPosition);
              }
              
              yPosition += 5;
            });
          } 
          // Check if line is a subheading (contains colon)
          else if (line.includes(':') && line.indexOf(':') < 30) {
            const [subheading, content] = line.split(':', 2);
            
            if (yPosition > doc.internal.pageSize.height - margin.bottom) {
              doc.addPage();
              yPosition = margin.top;
            }
            
            // Render subheading in bold
            doc.setFont('helvetica', 'bold');
            doc.text(subheading + ':', margin.left, yPosition);
            
            // Render content in normal font
            if (content && content.trim()) {
              doc.setFont('helvetica', 'normal');
              const contentLines = doc.splitTextToSize(content.trim(), contentWidth - doc.getTextWidth(subheading + ': '));
              
              if (contentLines.length === 1) {
                // If content fits on one line, render on same line as subheading
                doc.text(content.trim(), margin.left + doc.getTextWidth(subheading + ': '), yPosition);
                yPosition += 6;
              } else {
                // If content needs multiple lines, render on next line
                yPosition += 6;
                contentLines.forEach(contentLine => {
                  if (yPosition > doc.internal.pageSize.height - margin.bottom) {
                    doc.addPage();
                    yPosition = margin.top;
                  }
                  doc.text(contentLine, margin.left + 5, yPosition);
                  yPosition += 5;
                });
              }
            } else {
              yPosition += 6;
            }
            
            doc.setFont('helvetica', 'normal');
          } 
          // Regular text
          else {
            const textLines = doc.splitTextToSize(line, contentWidth);
            
            textLines.forEach((textLine: string) => {
              if (yPosition > doc.internal.pageSize.height - margin.bottom) {
                doc.addPage();
                yPosition = margin.top;
              }
              
              doc.text(textLine, margin.left, yPosition);
              yPosition += 5;
            });
            
            // Add a small space after paragraphs
            yPosition += 1;
          }
        });
        
        // Add space after section
        yPosition += 8;
      }
    });
    
    // Add watermark if needed
    if (showWatermark) {
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(60);
        doc.setTextColor(200, 200, 200, 0.3); // Light gray with transparency
        doc.setFont('helvetica', 'bold');
        
        // Add the watermark text
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
        // Calculate position for rotated text (center of page)
        const x = pageWidth / 2;
        const y = pageHeight / 2;
        
        // Add the watermark text
        doc.setTextColor(200, 200, 200, 0.3); // Light gray with transparency
        doc.setFontSize(60);
        doc.setFont('helvetica', 'bold');
        doc.text('FREE TRIAL VERSION', x, y, { 
          align: 'center',
          angle: -45
        });
      }
    }
    
    // Add footer with page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(colors.light[0], colors.light[1], colors.light[2]);
      doc.text(
        `Page ${i} of ${totalPages} | Generated with AI Resume Builder`, 
        doc.internal.pageSize.width / 2, 
        doc.internal.pageSize.height - 10, 
        { align: 'center' }
      );
    }
    
    // Save the PDF
    const safeFileName = name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
    doc.save(`${safeFileName}_resume.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to simpler PDF generation if the enhanced version fails
    generateSimplePDF(resumeContent, name, showWatermark);
  }
};

// Fallback simple PDF generator
const generateSimplePDF = (resumeContent: string, name: string = 'resume', showWatermark: boolean = false): void => {
  const doc = new jsPDF();
  
  doc.setProperties({
    title: `${name} Resume`,
    subject: 'Resume',
    author: 'AI Resume Builder',
    creator: 'AI Resume Builder'
  });
  
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const contentWidth = pageWidth - (margin * 2);
  
  // Split text to fit page width
  const textLines = doc.splitTextToSize(resumeContent, contentWidth);
  
  // Add text to document
  doc.setFontSize(10);
  doc.text(textLines, margin, margin);
  
  // Add watermark if needed
  if (showWatermark) {
    const pageHeight = doc.internal.pageSize.height;
    
    // Add the watermark text
    doc.setFontSize(60);
    doc.setTextColor(200, 200, 200, 0.3); // Light gray with transparency
    doc.setFont('helvetica', 'bold');
    doc.text('FREE TRIAL VERSION', pageWidth / 2, pageHeight / 2, { 
      align: 'center',
      angle: -45
    });
  }
  
  // Save the PDF
  const safeFileName = name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
  doc.save(`${safeFileName}_resume.pdf`);
};

// Helper function to parse resume content into sections
const parseResumeContent = (content: string): ResumeSection[] => {
  const lines = content.split('\n');
  const sections: ResumeSection[] = [];
  let currentSection: ResumeSection | null = null;
  
  lines.forEach(line => {
    // Check if line is a section header (all caps or ends with colon)
    if ((line.toUpperCase() === line && line.trim().length > 0 && /[A-Z]/.test(line)) || 
        (line.trim().endsWith(':') && line.length < 50 && !line.trim().includes(' ') && line.trim().length > 3)) {
      // Save previous section if exists
      if (currentSection) {
        sections.push(currentSection);
      }
      
      // Start new section
      currentSection = {
        title: line.trim().endsWith(':') ? line.trim().slice(0, -1) : line.trim(),
        content: []
      };
    } else if (currentSection && line.trim()) {
      // Add line to current section
      currentSection.content.push(line.trim());
    } else if (currentSection) {
      // Add empty line as paragraph break if there's already content
      if (currentSection.content.length > 0) {
        currentSection.content.push('');
      }
    }
  });
  
  // Add the last section
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections;
};