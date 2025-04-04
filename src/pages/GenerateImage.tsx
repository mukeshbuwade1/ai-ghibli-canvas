import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadZone from "@/components/UploadZone";
import StylePicker from "@/components/StylePicker";
import GenerateButton from "@/components/GenerateButton";
import ResultView from "@/components/ResultView";
import { useUser } from "@/components/UserProvider";
import {
  uploadImage,
  transformImage,
  checkTransformationStatus,
  getGenerationById,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, Loader } from "lucide-react";

export default function GenerateImage() {
  // const { user, loading } = useUser();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(
      null
    );
    const [predictionId, setPredictionId] = useState<string | null>(null);
    const [generationId, setGenerationId] = useState<string | null>(null);
   
    const { user, signOut,loading } = useUser();
    const navigate = useNavigate();
  
    const handleImageUploaded = (file: File, url: string) => {
      setFile(file);
      setPreviewUrl(url);
      setTransformedImageUrl(null); // Reset transformed image when new image is uploaded
    };
  
   


   
  if(loading)return<div className="flex w-full h-[100vh] justify-center items-center">
    <Loader></Loader> 
  </div>
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
    //   <div className="relative flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] bg-gray-50 text-center">
    //     <div className="mb-4 p-3 bg-primary/10 rounded-full">
    //       <img
    //         src="https://i.imgur.com/WLXSvSB.jpeg"
    //         alt="Totoro"
    //         className="w-16 h-16 rounded-full object-cover opacity-50"
    //       />
    //     </div>
    //     <h3 className="text-xl font-semibold mb-2">
    //       Your Ghibli Transformation
    //     </h3>
    //     <p className="text-gray-500 max-w-md">
    //       Upload an image, select a style and transform it into
    //       beautiful Ghibli-inspired artwork.
    //     </p>

    //     <div className="absolute inset-0 flex items-center justify-center opacity-5">
    //       <svg
    //         className="w-64 h-64"
    //         viewBox="0 0 100 100"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z"
    //           fill="none"
    //           stroke="currentColor"
    //           strokeWidth="1"
    //         ></path>
    //         <circle cx="35" cy="40" r="5" fill="currentColor"></circle>
    //         <circle cx="65" cy="40" r="5" fill="currentColor"></circle>
    //         <path
    //           d="M35,65 Q50,80 65,65"
    //           fill="none"
    //           stroke="currentColor"
    //           strokeWidth="2"
    //         ></path>
    //       </svg>
    //     </div>
    //   </div>
    <UploadZone onImageUploaded={handleImageUploaded} />
    )}

     {/* Step 3: Transform */}
     {/* {previewUrl && selectedStyle && ( */}
              <div className="mb-12 text-center">
               
                <GenerateButton
                  isDisabled={!previewUrl || !selectedStyle}
                  onClick={handleGenerate}
                  isLoading={isTransforming}
                />
                {!user && (
                  <p className="text-sm text-gray-500 mt-4">
                    You'll need to sign in before generating images.
                  </p>
                )}
              </div>
            {/* )} */}
  </div>
  )
}
