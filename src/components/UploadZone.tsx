
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Image, Upload, Camera, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
          "w-full min-h-[400px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all p-6",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50",
          previewUrl ? "bg-gray-50" : "bg-white"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative w-full h-full flex flex-col items-center">
            <div className="relative w-full h-64 mb-6">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('fileInput')?.click()}
                className="flex items-center gap-2"
              >
                <FileImage className="w-4 h-4" />
                Upload Another Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            <div className="mb-6 p-4 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Transform your image to Ghibli style</h3>
            <p className="text-gray-500 mb-8">
              Upload an image or drag and drop it here
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <FileImage className="w-4 h-4" />
                Upload Image
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
                disabled
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-6">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
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
