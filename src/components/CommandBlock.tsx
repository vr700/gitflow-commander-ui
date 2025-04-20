
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandBlockProps {
  command: string;
  index: number;
}

const CommandBlock: React.FC<CommandBlockProps> = ({ command, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={cn('command-block', copied && 'copied')}>
      <pre className="whitespace-pre-wrap break-all">{command}</pre>
      <button 
        onClick={handleCopy} 
        className="command-copy-button"
        aria-label="Copy command"
      >
        {copied ? (
          <Check size={16} className="text-green-600" />
        ) : (
          <Copy size={16} className="text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default CommandBlock;
