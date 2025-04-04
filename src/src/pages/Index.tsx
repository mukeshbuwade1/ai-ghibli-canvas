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
import { LogOut, LogIn, CheckCircle, Crown, ArrowRight } from "lucide-react";
import GhibliConverter from "@/components/GhibliConverter";
import WhyGhibliAI from "@/components/WhyGhibliAI";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GhibliRestyler from "@/components/Restyler";
import FAQAccordion from "@/components/Faqs";
import { useGenerateImage } from "@/hooks/useGenerateImage";

export default function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  
  const { user, signOut } = useUser();

  const{handleGenerate}=useGenerateImage()
console.log(file)
console.log(previewUrl)
  const handleImageUploaded = (file: File, url: string) => {
    setFile(file);
    setPreviewUrl(url);
    setTransformedImageUrl(null);
   
  };

  const handleGenerateButtonClick=()=>{
    handleGenerate({
      file,
      previewUrl,
      setGenerationId,
      setIsTransforming,
      setPredictionId,
      setTransformedImageUrl,
    })
  }



 

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     
<NavBar/>
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <section className="text-center max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Transform Your Photos into Ghibli-Style Art
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Turn any image into beautiful Studio Ghibli-inspired artwork with
            our AI transformation tool.
          </p>
        </section>

        {/* Workflow section */}
        <div className="">
          <div className="flex flex-col items-center">
           
           

            

            {/* Results */}
          <div className="">
            {isTransforming ? (
              <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Transforming Your Image</h3>
                <p className="text-gray-500">This may take up to a minute to complete...</p>
              </div>
            ) : transformedImageUrl ? (
              <ResultView originalImage={previewUrl} transformedImage={transformedImageUrl} />
            ) : (
              <div className="mb-12 w-full max-w-2xl">
              <UploadZone onImageUploaded={handleImageUploaded} />
            </div>
            )}
          </div>

          {previewUrl && (
              <div className="mb-12 text-center">
                
                <GenerateButton 
                  isDisabled={!previewUrl } 
                  onClick={handleGenerateButtonClick}
                  isLoading={isTransforming}
                />
                {!user && (
                  <p className="text-sm text-gray-500 mt-4">
                    You'll need to sign in before generating images.
                  </p>
                )}
              </div>
            )}

           
          </div>

         
        
        </div>


       {/* <Plan/> */}

        

        
<GhibliRestyler/>
          <GhibliConverter/>
  <WhyGhibliAI/>
<FAQAccordion/>
        {/* Footer */}
    <Footer/>
      </div>
    </div>
  );
}
