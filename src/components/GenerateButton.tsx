
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  isLoading: boolean;
}

const GenerateButton = ({ isDisabled, onClick, isLoading }: GenerateButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={cn(
        "relative px-8 py-4 text-lg font-medium text-white rounded-md transition-all",
        "bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg",
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:translate-y-[-1px]",
        isLoading ? "!text-transparent" : ""
      )}
    >
      {isLoading ? (
        <>
          <span className="absolute inset-0 flex items-center justify-center text-white">
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          Processing...
        </>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          Transform to Ghibli Style
        </span>
      )}
    </button>
  );
};

export default GenerateButton;
