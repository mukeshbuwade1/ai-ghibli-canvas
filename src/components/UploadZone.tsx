
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Image, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onImageUploaded: (file: File, previewUrl: string) => void;
}

const UploadZone = ({ onImageUploaded }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback((file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setPreviewUrl(url);
      onImageUploaded(file, url);
    };
    reader.readAsDataURL(file);
  }, [onImageUploaded, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  return (
    <div className="w-full">
      <div 
        className={cn(
          "w-full h-[400px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all p-4",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50",
          previewUrl ? "bg-gray-50" : "bg-white"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {previewUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white"
            >
              <p className="text-center font-medium">
                Click or drop to change image
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 p-4 bg-gray-100 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload an image</h3>
            <p className="text-gray-500 text-center max-w-sm mb-4">
              Drag and drop your image here, or click to select a file
            </p>
            <p className="text-xs text-gray-400">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
          </>
        )}
        <input 
          id="fileInput" 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default UploadZone;
