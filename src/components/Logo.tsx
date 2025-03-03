import React from 'react';
import { FileText } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary p-1 rounded-md">
        <FileText className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">ResumeAI</span>
    </div>
  );
};

export default Logo;
