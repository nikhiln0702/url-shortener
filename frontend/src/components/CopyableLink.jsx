import React, { useState } from 'react';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const CopyableLink = ({ shortUrl }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Copies text to clipboard and provides feedback
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="flex items-center w-full p-2 space-x-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg">
      <a 
        href={shortUrl} 
        target="_blank" 
        rel="noreferrer" 
        className="flex-grow p-2 text-blue-600 dark:text-blue-400 font-mono text-sm truncate hover:underline"
      >
        {shortUrl}
      </a>
      <button
        onClick={handleCopy}
        className={`flex items-center justify-center w-11 h-11 rounded-md shrink-0 transition-all duration-200 ${
          isCopied 
            ? 'bg-green-500 text-white' 
            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
        }`}
        aria-label="Copy to clipboard"
      >
        {isCopied ? <CheckIcon className="h-6 w-6" /> : <DocumentDuplicateIcon className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default CopyableLink;