
import React, { useState, useEffect } from "react";
import UploadZone from "@/components/UploadZone";
import StylePicker from "@/components/StylePicker";
import GenerateButton from "@/components/GenerateButton";
import ResultView from "@/components/ResultView";
import { useUser } from "@/components/UserProvider";
import { uploadImage, transformImage, checkTransformationStatus, getGenerationById } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, signOut } = useUser();

  const handleImageUploaded = (file: File, url: string) => {
    setFile(file);
    setPreviewUrl(url);
    setTransformedImageUrl(null); // Reset transformed image when new image is uploaded
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleGenerate = async () => {
    if (!previewUrl || !selectedStyle) {
      toast({
        title: "Missing information",
        description: "Please upload an image and select a style first.",
        variant: "destructive",
      });
      return;
    }

    setIsTransforming(true);
    try {
      // If we're using a File object directly, we need to upload it first
      const imageUrl = file ? await uploadImage(file) : previewUrl;
      
      if (!imageUrl) {
        throw new Error("Failed to prepare image for transformation");
      }
      
      const result = await transformImage(imageUrl, selectedStyle);
      
      if (result) {
        setPredictionId(result.predictionId);
        setGenerationId(result.generationId);
        
        // Poll for status updates
        const interval = setInterval(async () => {
          const status = await checkTransformationStatus(result.predictionId, result.generationId);
          
          if (status && (status.status === "succeeded" || status.status === "failed")) {
            clearInterval(interval);
            setIsTransforming(false);
            
            if (status.status === "succeeded") {
              // Get the updated generation record
              const generation = await getGenerationById(result.generationId);
              if (generation && generation.transformed_image_url) {
                setTransformedImageUrl(generation.transformed_image_url);
                toast({
                  title: "Transformation complete!",
                  description: "Your image has been successfully transformed.",
                });
              }
            } else {
              toast({
                title: "Transformation failed",
                description: "There was an error transforming your image. Please try again.",
                variant: "destructive",
              });
            }
          }
        }, 2000); // Check every 2 seconds
      }
    } catch (error: any) {
      console.error("Error during transformation:", error);
      toast({
        title: "Transformation failed",
        description: error.message || "An error occurred during transformation. Please try again.",
        variant: "destructive",
      });
      setIsTransforming(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">GhibliAI</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.email}
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={signOut}
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <section className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Transform Your Photos into Ghibli-Style Art</h2>
          <p className="text-lg text-gray-600 mb-8">
            Turn any image into beautiful Studio Ghibli-inspired artwork with our AI transformation tool.
          </p>
        </section>

        {/* Workflow section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            {/* Step 1: Upload Image */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                Upload Your Image
              </h3>
              <UploadZone onImageUploaded={handleImageUploaded} />
            </div>

            {/* Step 2: Choose Style */}
            {previewUrl && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                  Choose Ghibli Style
                </h3>
                <StylePicker 
                  styles={[]} // Styles are hardcoded in the component
                  selectedStyle={selectedStyle} 
                  onStyleSelect={handleStyleSelect} 
                />
              </div>
            )}

            {/* Step 3: Transform */}
            {previewUrl && selectedStyle && (
              <div className="mb-12 text-center">
                <h3 className="text-xl font-semibold mb-6 flex items-center justify-center">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                  Transform Your Image
                </h3>
                <GenerateButton 
                  isDisabled={!previewUrl || !selectedStyle} 
                  onClick={handleGenerate}
                  isLoading={isTransforming}
                />
              </div>
            )}
          </div>

          {/* Results */}
          <div className="order-1 md:order-2">
            {isTransforming ? (
              <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Transforming Your Image</h3>
                <p className="text-gray-500">This may take up to a minute to complete...</p>
              </div>
            ) : transformedImageUrl ? (
              <ResultView originalImage={previewUrl} transformedImage={transformedImageUrl} />
            ) : (
              <div className="relative flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] bg-gray-50 text-center">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <img src="https://i.imgur.com/WLXSvSB.jpeg" alt="Totoro" className="w-16 h-16 rounded-full object-cover opacity-50" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Ghibli Transformation</h3>
                <p className="text-gray-500 max-w-md">
                  Upload an image, select a style and transform it into beautiful Ghibli-inspired artwork.
                </p>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <svg className="w-64 h-64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" fill="none" stroke="currentColor" strokeWidth="1"></path>
                    <circle cx="35" cy="40" r="5" fill="currentColor"></circle>
                    <circle cx="65" cy="40" r="5" fill="currentColor"></circle>
                    <path d="M35,65 Q50,80 65,65" fill="none" stroke="currentColor" strokeWidth="2"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer section */}
        <div className="text-center mt-16 mb-8 text-sm text-gray-500">
          <p>GhibliAI © {new Date().getFullYear()} - Transform your images into Ghibli-style art</p>
        </div>
      </div>
    </div>
  );
}
