
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadZone from "@/components/UploadZone";
import StylePicker from "@/components/StylePicker";
import GenerateButton from "@/components/GenerateButton";
import ResultView from "@/components/ResultView";
import { useUser } from "@/components/UserProvider";
import { Loader } from "lucide-react";
import { useGenerateImage } from "@/hooks/useGenerateImage";

export default function GenerateImage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(
    null
  );
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
   
  const { user, signOut, loading } = useUser();
  const navigate = useNavigate();
  const { handleGenerate } = useGenerateImage();
  
  const handleImageUploaded = (file: File, url: string) => {
    setFile(file);
    setPreviewUrl(url);
    setTransformedImageUrl(null); // Reset transformed image when new image is uploaded
  };
  
  const handleGenerateClick = () => {
    handleGenerate({
      file,
      previewUrl,
      setIsTransforming,
      setGenerationId,
      setPredictionId,
      setTransformedImageUrl
    });
  };

  if (loading) return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <Loader className="animate-spin" /> 
    </div>
  );
  
  return (
    <div className="order-1 md:order-2">
      {isTransforming ? (
        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">
            Transforming Your Image
          </h3>
          <p className="text-gray-500">
            This may take up to a minute to complete...
          </p>
        </div>
      ) : transformedImageUrl ? (
        <ResultView
          originalImage={previewUrl}
          transformedImage={transformedImageUrl}
        />
      ) : (
        <UploadZone onImageUploaded={handleImageUploaded} />
      )}

      {/* Step 3: Transform */}
      <div className="mb-12 text-center">
        <GenerateButton
          isDisabled={!previewUrl || !selectedStyle}
          onClick={handleGenerateClick}
          isLoading={isTransforming}
        />
        {!user && (
          <p className="text-sm text-gray-500 mt-4">
            You'll need to sign in before generating images.
          </p>
        )}
      </div>
    </div>
  );
}
