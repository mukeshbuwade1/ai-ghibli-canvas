
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
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

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-8/12">
          {/* Before/After Slider */}
          <div className="relative w-full h-[400px] border border-gray-200 rounded-lg overflow-hidden bg-[#F7F8FA]">
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
              className="absolute inset-y-0 left-0 w-0.5 bg-white shadow-xl z-10 cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-200">
                <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">Original</div>
            <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-md">Ghibli Style</div>
          </div>
          
          <div className="mt-4 w-full">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div className="w-full md:w-4/12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold mb-3">Your Ghibli Image is Ready!</h3>
          <p className="text-gray-500 mb-6">Download your transformed image or try another style</p>
          
          <Button
            className="w-full mb-3 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
            onClick={() => {
              const link = document.createElement('a');
              link.href = transformedImage;
              link.download = 'ghibli-transformation.png';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download className="w-4 h-4" />
            Download Image
          </Button>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Image Information</h4>
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="font-medium">Ghibli Style</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span className="font-medium">See downloads</span>
              </div>
              <div className="flex justify-between">
                <span>Created:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
