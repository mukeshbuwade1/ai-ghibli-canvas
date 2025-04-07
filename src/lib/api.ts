import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Generation {
  id: string;
  user_id: string;
  original_image_url: string;
  transformed_image_url: string | null;
  style: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('inputs')
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage
      .from('inputs')
      .getPublicUrl(filePath);
      
    return publicUrl;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    toast({
      title: 'Upload failed',
      description: error.message || 'Error uploading image',
      variant: 'destructive',
    });
    return null;
  }
};

export const transformImage = async (imageUrl: string, style: string): Promise<{ predictionId: string, generationId: string } | null> => {
  try {
    const { data: authData } = await supabase.auth.getSession();
    
    if (!authData.session) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to transform images',
        variant: 'destructive',
      });
      return null;
    }
    
    const response = await fetch(`https://uelyqikobhjrosibqzxh.supabase.co/functions/v1/ghiblify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.session.access_token}`,
      },
      body: JSON.stringify({
        imageUrl,
        style,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error transforming image');
    }
    
    const result = await response.json();
    return { 
      predictionId: result.prediction.id,
      generationId: result.generationId
    };
  } catch (error: any) {
    console.error('Error transforming image:', error);
    toast({
      title: 'Transformation failed',
      description: error.message || 'Error transforming image',
      variant: 'destructive',
    });
    return null;
  }
};

export const checkTransformationStatus = async (predictionId: string, generationId: string): Promise<any | null> => {
  try {
    const { data: authData } = await supabase.auth.getSession();
    
    if (!authData.session) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${window.location.origin}/functions/v1/ghiblify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.session.access_token}`,
      },
      body: JSON.stringify({
        predictionId,
        generationId
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error checking transformation status');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Error checking transformation status:', error);
    return null;
  }
};

export const getGenerationById = async (id: string): Promise<Generation | null> => {
  try {
    const { data, error } = await supabase
      .from('generations')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as Generation;
  } catch (error) {
    console.error('Error fetching generation:', error);
    return null;
  }
};

export const getUserGenerations = async (): Promise<Generation[]> => {
  try {
    const { data, error } = await supabase
      .from('generations')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as Generation[];
  } catch (error) {
    console.error('Error fetching user generations:', error);
    return [];
  }
};

export const testCors = async (testData: any): Promise<{ message: string; receivedData: any } | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('cors-test', {
      method: 'POST',
      body: testData
    });
    
    if (error) throw error;
    return data as { message: string; receivedData: any };
  } catch (error: any) {
    console.error('Error testing CORS:', error);
    toast({
      title: 'CORS test failed',
      description: error.message || 'Error communicating with the server',
      variant: 'destructive',
    });
    return null;
  }
};
