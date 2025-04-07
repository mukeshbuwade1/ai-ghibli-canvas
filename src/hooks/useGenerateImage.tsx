
import { useUser } from "@/components/UserProvider";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
import { checkTransformationStatus, getGenerationById, transformImage, uploadImage } from "@/lib/api";

interface GenerateImageParams {
  file: File | null;
  previewUrl: string | null;
  setIsTransforming: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerationId: React.Dispatch<React.SetStateAction<string | null>>;
  setPredictionId: React.Dispatch<React.SetStateAction<string | null>>;
  setTransformedImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useGenerateImage = () => {
    const { toast } = useToast();
    const { user } = useUser();
    const navigate = useNavigate();

    const handleGenerate = async ({
      file,
      previewUrl,
      setIsTransforming,
      setGenerationId,
      setPredictionId,
      setTransformedImageUrl
    }: GenerateImageParams) => {
        // Check if user is logged in first
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please log in to transform images.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }
    
        if (!previewUrl) {
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
    
          const result = await transformImage(imageUrl, "ghibli");
    
          if (result) {
            setPredictionId(result.predictionId);
            setGenerationId(result.generationId);
    
            // Poll for status updates
            const interval = setInterval(async () => {
              const status = await checkTransformationStatus(
                result.predictionId,
                result.generationId
              );
    
              if (
                status &&
                (status.status === "succeeded" || status.status === "failed")
              ) {
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
                    description:
                      "There was an error transforming your image. Please try again.",
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
            description:
              error.message ||
              "An error occurred during transformation. Please try again.",
            variant: "destructive",
          });
          setIsTransforming(false);
        }
      };
    
    return { handleGenerate };
};
