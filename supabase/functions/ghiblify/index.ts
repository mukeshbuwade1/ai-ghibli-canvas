
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Replicate from "https://esm.sh/replicate@0.25.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Get the user from the request
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Replicate client
    const REPLICATE_API_KEY = Deno.env.get("REPLICATE_API_KEY");
    if (!REPLICATE_API_KEY) {
      return new Response(JSON.stringify({ error: "Replicate API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_KEY,
    });

    const body = await req.json();

    // If it's a status check request
    if (body.predictionId) {
      console.log("Checking status for prediction:", body.predictionId);
      const prediction = await replicate.predictions.get(body.predictionId);
      
      // If prediction is complete, update the generation record
      if (prediction.status === "succeeded" && prediction.output) {
        const { data: generation, error: genError } = await supabaseClient
          .from("generations")
          .select("id")
          .eq("id", body.generationId)
          .single();

        if (generation && !genError) {
          // Update the generation with the transformed image URL
          await supabaseClient
            .from("generations")
            .update({
              transformed_image_url: Array.isArray(prediction.output) ? prediction.output[0] : prediction.output,
              status: "completed",
              updated_at: new Date().toISOString()
            })
            .eq("id", body.generationId);
        }
      } else if (prediction.status === "failed") {
        // Update generation status to failed
        await supabaseClient
          .from("generations")
          .update({
            status: "failed",
            updated_at: new Date().toISOString()
          })
          .eq("id", body.generationId);
      }

      console.log("Status check response:", prediction);
      return new Response(JSON.stringify(prediction), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate the request body
    if (!body.imageUrl || !body.style) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: imageUrl and style are required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    let model = "stability-ai/sdxl";
    let input: Record<string, any> = {};

    // Configure model and input based on style
    switch (body.style) {
      case "totoro":
        input = {
          prompt: "Transform this image into the style of My Neighbor Totoro by Studio Ghibli, with soft, dreamlike forest landscapes and rounded, cute character designs",
          image: body.imageUrl,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          strength: 0.7,
        };
        break;
      case "spirited":
        input = {
          prompt: "Transform this image into the style of Spirited Away by Studio Ghibli, with vibrant colors, ethereal spirits, and detailed, magical backgrounds",
          image: body.imageUrl,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          strength: 0.7,
        };
        break;
      case "howl":
        input = {
          prompt: "Transform this image into the style of Howl's Moving Castle by Studio Ghibli, with steampunk aesthetic and warm, romantic color palettes",
          image: body.imageUrl,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          strength: 0.7,
        };
        break;
      case "mononoke":
        input = {
          prompt: "Transform this image into the style of Princess Mononoke by Studio Ghibli, with rich natural tones and mystical forest elements",
          image: body.imageUrl,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          strength: 0.7,
        };
        break;
      case "highq_ghibli":
        // Use the dedicated Ghibli model for higher quality
        model = "lambdal/ghibli-diffusion";
        input = {
          prompt: "in ghibli style, detailed, beautiful",
          image: body.imageUrl,
          strength: 0.6,
        };
        break;
      default:
        // Default to general Ghibli style
        input = {
          prompt: "Transform this image into Studio Ghibli style animation, with hand-drawn aesthetic, pastel colors, and atmospheric lighting",
          image: body.imageUrl,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          strength: 0.7,
        };
    }

    console.log("Starting image transformation with:", model);
    // Create a record in the generations table
    const { data: generation, error: insertError } = await supabaseClient
      .from("generations")
      .insert({
        user_id: user.id,
        original_image_url: body.imageUrl,
        style: body.style,
        status: "processing",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting generation:", insertError);
      return new Response(JSON.stringify({ error: "Failed to create generation record" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Start the Replicate prediction
    const prediction = await replicate.predictions.create({
      version: model === "stability-ai/sdxl" 
        ? "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255a1de5618e9c03d2" 
        : "e39d2c7b35bbcf3a84660ea1be35f7c9ea8c765358506c0f5481952ea2efcbfe",
      input: input,
    });

    console.log("Prediction started:", prediction);
    return new Response(
      JSON.stringify({ 
        prediction,
        generationId: generation.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ghiblify function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
