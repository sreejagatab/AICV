import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  History, 
  Trash2, 
  FileText, 
  Clock, 
  AlertTriangle, 
  Search, 
  Edit, 
  Save, 
  X, 
  Eye,
  Download,
  FileType
} from "lucide-react";
import { ResumeHistory as ResumeHistoryType, ResumeFormData } from "@/types/resume";
import { getResumeHistory, deleteResumeFromHistory, clearResumeHistory, updateResumeInHistory } from "@/util/storage";
import { formatDate } from "@/util/string";
import { generatePDF } from "@/util/pdf";

interface ResumeHistoryProps {
  onLoadResume: (resumeData: ResumeFormData) => void;
}

const ResumeHistory: React.FC<ResumeHistoryProps> = ({ onLoadResume }) => {
  const [history, setHistory] = useState<ResumeHistoryType[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<ResumeHistoryType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [previewResume, setPreviewResume] = useState<ResumeFormData | null>(null);

  // Load history when dialog opens
  useEffect(() => {
    if (isOpen) {
      const historyData = getResumeHistory();
      setHistory(historyData);
      setFilteredHistory(historyData);
    }
  }, [isOpen]);

  // Filter history when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredHistory(history);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredHistory(
        history.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.resumeData.jobTitle.toLowerCase().includes(query) ||
            item.resumeData.skills.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, history]);

  // Handle delete resume
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteResumeFromHistory(id);
    setHistory(history.filter(item => item.id !== id));
    setFilteredHistory(filteredHistory.filter(item => item.id !== id));
  };

  // Handle clear all history
  const handleClearAll = () => {
    clearResumeHistory();
    setHistory([]);
    setFilteredHistory([]);
  };

  // Handle load resume
  const handleLoadResume = (resumeData: ResumeFormData) => {
    onLoadResume(resumeData);
    setIsOpen(false);
    setPreviewResume(null);
  };

  // Start editing resume name
  const startEditing = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditName(name);
  };

  // Save edited resume name
  const saveEditedName = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (editName.trim()) {
      // Find the resume in history
      const resumeToUpdate = history.find(item => item.id === id);
      
      if (resumeToUpdate) {
        // Create updated resume with new name
        const updatedResume = {
          ...resumeToUpdate,
          name: editName.trim()
        };
        
        // Update in storage
        updateResumeInHistory(updatedResume);
        
        // Update state
        const updatedHistory = history.map(item => 
          item.id === id ? updatedResume : item
        );
        
        setHistory(updatedHistory);
        setFilteredHistory(
          filteredHistory.map(item => item.id === id ? updatedResume : item)
        );
      }
    }
    
    setEditingId(null);
  };

  // Cancel editing
  const cancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  // Preview resume
  const handlePreviewResume = (resumeData: ResumeFormData, e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewResume(resumeData);
  };

  // Close preview
  const closePreview = () => {
    setPreviewResume(null);
  };

  // Download resume as PDF
  const downloadAsPDF = (resumeData: ResumeFormData, e: React.MouseEvent) => {
    e.stopPropagation();
    if (resumeData.generatedResume) {
      generatePDF(resumeData.generatedResume, resumeData.name);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setPreviewResume(null);
        setEditingId(null);
        setSearchQuery("");
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="h-4 w-4" />
          Resume History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        {!previewResume ? (
          <>
            <DialogHeader>
              <DialogTitle>Resume History</DialogTitle>
              <DialogDescription>
                View and load your previously generated resumes.
              </DialogDescription>
            </DialogHeader>

            {history.length > 0 ? (
              <>
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resumes..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <ScrollArea className="h-[350px] rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-[120px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((item) => (
                          <TableRow 
                            key={item.id} 
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleLoadResume(item.resumeData)}
                          >
                            <TableCell className="font-medium">
                              {editingId === item.id ? (
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                  <Input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="h-8"
                                    autoFocus
                                  />
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={(e) => saveEditedName(item.id, e)}
                                  >
                                    <Save className="h-4 w-4 text-green-500" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={cancelEditing}
                                  >
                                    <X className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  {item.name}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-50 hover:opacity-100"
                                    onClick={(e) => startEditing(item.id, item.name, e)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {item.resumeData.jobTitle || "Not specified"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(item.date, { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={(e) => handlePreviewResume(item.resumeData, e)}
                                  title="Preview"
                                >
                                  <Eye className="h-4 w-4 text-blue-500" />
                                </Button>
                                {item.resumeData.generatedResume && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={(e) => downloadAsPDF(item.resumeData, e)}
                                    title="Download PDF"
                                  >
                                    <FileType className="h-4 w-4 text-green-500" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={(e) => handleDelete(item.id, e)}
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                            No resumes match your search
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>

                <DialogFooter className="flex justify-between items-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Clear All
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear Resume History</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all saved resumes from your history.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearAll}>
                          Clear All
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Resume History</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't generated any resumes yet. Once you create a resume, it will appear here.
                </p>
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </div>
            )}
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle>Resume Preview</DialogTitle>
                <Button variant="ghost" size="sm" onClick={closePreview}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DialogDescription>
                {previewResume.name} - {previewResume.jobTitle || "No job title"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-2">
              <div className="flex justify-end gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleLoadResume(previewResume)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </Button>
                {previewResume.generatedResume && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => generatePDF(previewResume.generatedResume, previewResume.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                )}
              </div>
              
              <ScrollArea className="h-[400px] rounded-md border p-4 bg-muted/30">
                {previewResume.generatedResume ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {previewResume.generatedResume.split('\n').map((line, index) => {
                      // Check if line is a header (all caps or ends with a colon)
                      if (line.toUpperCase() === line && line.trim().length > 0 && /[A-Z]/.test(line)) {
                        return <h3 key={index} className="font-bold mt-4 mb-2">{line}</h3>;
                      }
                      // Check if line is a subheader (ends with a colon)
                      else if (line.trim().endsWith(':') && line.length < 50) {
                        return <h4 key={index} className="font-semibold mt-3 mb-1">{line}</h4>;
                      }
                      // Check if line is a bullet point
                      else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                        return (
                          <div key={index} className="ml-5 mb-1 relative before:content-['•'] before:absolute before:left-[-15px]">
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
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Generated Content</h3>
                    <p className="text-muted-foreground">
                      This resume doesn't have any generated content yet.
                    </p>
                  </div>
                )}
              </ScrollArea>
              
              <DialogFooter className="mt-4">
                <Button variant="secondary" onClick={closePreview}>
                  Back to History
                </Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResumeHistory;