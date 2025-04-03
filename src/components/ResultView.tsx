
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ResultViewProps {
  originalImage: string | null;
  transformedImage: string | null;
}

const ResultView = ({ originalImage, transformedImage }: ResultViewProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  
  if (!originalImage || !transformedImage) {
    return null;
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseInt(e.target.value));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newPosition = (x / rect.width) * 100;
    setSliderPosition(newPosition);
  };

  return (
    <div className="w-full my-8">
      <h2 className="text-xl font-bold mb-4">Your Ghibli Transformation</h2>
      
      <div className="relative w-full h-[400px] border border-gray-200 rounded-lg overflow-hidden">
        {/* Before - Original Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={originalImage} 
            alt="Original" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* After - Transformed Image */}
        <div 
          className="absolute inset-0 overflow-hidden" 
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={transformedImage} 
            alt="Transformed" 
            className="w-full h-full object-contain"
            style={{ 
              width: `${100 / (sliderPosition / 100)}%`,
              maxWidth: 'none'
            }}
          />
        </div>
        
        {/* Slider Handle */}
        <div 
          className="absolute inset-y-0 left-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={() => {
            const handleMouseMove = (e: MouseEvent) => {
              const container = document.querySelector('.slider-container') as HTMLDivElement;
              if (container) {
                const rect = container.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const newPosition = (x / rect.width) * 100;
                setSliderPosition(newPosition);
              }
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
            <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">Original</div>
        <div className="absolute top-2 right-2 bg-primary bg-opacity-90 text-white text-xs px-2 py-1 rounded">Ghibli Style</div>
      </div>
      
      <div className="mt-4 w-full">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      <div className="mt-6 flex justify-center">
        <a
          href={transformedImage}
          download="ghibli-transformation.png"
          className="bg-secondary hover:bg-secondary/90 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Transformed Image
        </a>
      </div>
    </div>
  );
};

export default ResultView;
