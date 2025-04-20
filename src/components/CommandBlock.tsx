
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CommandBlockProps {
  command: string;
  index: number;
  stepId: string;
  onComplete: (stepId: string) => void;
}

const CommandBlock: React.FC<CommandBlockProps> = ({ command, index, stepId, onComplete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    onComplete(stepId);
    toast.success('Command copied to clipboard');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={cn(
      'command-block relative bg-card/50 p-4 rounded-md mb-2',
      'border border-border/50 transition-colors duration-300',
      copied && 'border-green-500/50'
    )}>
      <pre className="whitespace-pre-wrap break-all text-sm font-mono text-foreground/90">{command}</pre>
      <button 
        onClick={handleCopy} 
        className={cn(
          "command-copy-button absolute right-2 top-2 p-2 rounded-md",
          "hover:bg-accent transition-colors duration-200"
        )}
        aria-label="Copy command"
      >
        {copied ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <Copy size={16} className="text-muted-foreground" />
        )}
      </button>
    </div>
  );
};

export default CommandBlock;
