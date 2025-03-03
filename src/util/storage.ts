import { ResumeFormData, ResumeHistory } from "@/types/resume";

// Save resume to local storage history
export const saveResumeToHistory = (resumeData: ResumeFormData): ResumeHistory => {
  if (typeof window === 'undefined') {
    throw new Error('Cannot access localStorage in server-side context');
  }
  
  try {
    // Get existing history
    const existingHistory = getResumeHistory();
    
    // Create new history item
    const newHistoryItem: ResumeHistory = {
      id: generateId(),
      name: resumeData.name || 'Unnamed Resume',
      date: new Date().toISOString(),
      resumeData: resumeData
    };
    
    // Add to history (limit to 20 items)
    const updatedHistory = [newHistoryItem, ...existingHistory].slice(0, 20);
    
    // Save to local storage
    localStorage.setItem('resumeHistory', JSON.stringify(updatedHistory));
    
    return newHistoryItem;
  } catch (error) {
    console.error('Error saving resume to history:', error);
    throw error;
  }
};

// Get resume history from local storage
export const getResumeHistory = (): ResumeHistory[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const historyString = localStorage.getItem('resumeHistory');
    if (!historyString) return [];
    
    return JSON.parse(historyString) as ResumeHistory[];
  } catch (error) {
    console.error('Error getting resume history:', error);
    return [];
  }
};

// Update an existing resume in history
export const updateResumeInHistory = (updatedResume: ResumeHistory): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const existingHistory = getResumeHistory();
    const updatedHistory = existingHistory.map(item => 
      item.id === updatedResume.id ? updatedResume : item
    );
    
    localStorage.setItem('resumeHistory', JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error updating resume in history:', error);
  }
};

// Delete resume from history
export const deleteResumeFromHistory = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const existingHistory = getResumeHistory();
    const updatedHistory = existingHistory.filter(item => item.id !== id);
    
    localStorage.setItem('resumeHistory', JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error deleting resume from history:', error);
  }
};

// Clear all resume history
export const clearResumeHistory = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('resumeHistory');
  } catch (error) {
    console.error('Error clearing resume history:', error);
  }
};

// Get a specific resume from history by ID
export const getResumeById = (id: string): ResumeHistory | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const existingHistory = getResumeHistory();
    return existingHistory.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Error getting resume by ID:', error);
    return null;
  }
};

// Save the current resume as a draft
export const saveResumeDraft = (resumeData: ResumeFormData): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('resumeDraft', JSON.stringify(resumeData));
  } catch (error) {
    console.error('Error saving resume draft:', error);
  }
};

// Get the current resume draft
export const getResumeDraft = (): ResumeFormData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const draftString = localStorage.getItem('resumeDraft');
    if (!draftString) return null;
    
    return JSON.parse(draftString) as ResumeFormData;
  } catch (error) {
    console.error('Error getting resume draft:', error);
    return null;
  }
};

// Clear the current resume draft
export const clearResumeDraft = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('resumeDraft');
  } catch (error) {
    console.error('Error clearing resume draft:', error);
  }
};

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + 
         Math.random().toString(36).substring(2, 10);
};