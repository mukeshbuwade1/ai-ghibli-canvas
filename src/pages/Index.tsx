
import React, { useState } from 'react';
import UploadZone from '@/components/UploadZone';
import StylePicker from '@/components/StylePicker';
import GenerateButton from '@/components/GenerateButton';
import ResultView from '@/components/ResultView';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<{file: File, url: string} | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleImageUploaded = (file: File, previewUrl: string) => {
    setUploadedImage({ file, url: previewUrl });
    setTransformedImage(null); // Reset transformed image when new upload
  };

  const handleStyleSelected = (styleId: string) => {
    setSelectedStyle(styleId);
    setTransformedImage(null); // Reset transformed image when style changes
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) {
      toast({
        title: "Missing input",
        description: "Please upload an image and select a style first",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with timeout
    // This would be replaced with actual API call to Replicate API
    setTimeout(() => {
      // For demo purposes, we'll just use the same image as transformed
      // In production, this would be the result from the AI
      setTransformedImage(uploadedImage.url);
      setIsGenerating(false);
      
      toast({
        title: "Transformation Complete",
        description: "Your image has been transformed to Ghibli style!",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold ghibli-gradient text-transparent bg-clip-text">
                GhibliAI Wrapper
              </h1>
              <p className="text-gray-500 mt-1">Transform your images into Studio Ghibli style art</p>
            </div>
            <div>
              <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Upload Your Image</h2>
            <UploadZone onImageUploaded={handleImageUploaded} />
          </section>

          {/* Style Selection */}
          <section 
            className={`bg-white rounded-xl shadow-sm p-6 transition-opacity ${uploadedImage ? 'opacity-100' : 'opacity-70 pointer-events-none'}`}
          >
            <StylePicker 
              styles={[]} // The styles are hardcoded in the StylePicker component for now
              selectedStyle={selectedStyle} 
              onStyleSelect={handleStyleSelected} 
            />
          </section>

          {/* Generate Button */}
          <div className="flex justify-center">
            <GenerateButton 
              isDisabled={!uploadedImage || !selectedStyle}
              onClick={handleGenerate}
              isLoading={isGenerating}
            />
          </div>

          {/* Result View */}
          {transformedImage && (
            <section className="bg-white rounded-xl shadow-sm p-6">
              <ResultView 
                originalImage={uploadedImage?.url || null} 
                transformedImage={transformedImage} 
              />
            </section>
          )}

          {/* Ad Placement - Only visible for free users */}
          <section className="bg-ad-container rounded-lg p-4 text-center">
            <div className="h-16 flex items-center justify-center border border-dashed border-gray-300">
              <p className="text-gray-400 text-sm">Ad Placement (Free Tier)</p>
            </div>
          </section>

          {/* Usage Info */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 text-center">
              Free tier: 5 transformations/month | <span className="text-primary">Upgrade to Premium</span> for unlimited transformations
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GhibliAI Wrapper | Powered by Studio Ghibli-Inspired AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
