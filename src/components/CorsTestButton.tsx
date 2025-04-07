
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { testCors } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const CorsTestButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ message: string; receivedData: any } | null>(null);

  const handleTestCors = async () => {
    setIsLoading(true);
    try {
      const testData = { 
        timestamp: new Date().toISOString(),
        testMessage: "Hello from the client!" 
      };
      
      const response = await testCors(testData);
      
      if (response) {
        setResult(response);
        toast({
          title: "CORS Test Successful",
          description: "The edge function responded successfully!",
        });
      }
    } catch (error) {
      console.error("Error testing CORS:", error);
      toast({
        title: "CORS Test Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-medium">Test CORS Edge Function</h3>
      <Button 
        onClick={handleTestCors}
        disabled={isLoading}
        className="w-full max-w-xs"
      >
        {isLoading ? "Testing..." : "Run CORS Test"}
      </Button>
      
      {result && (
        <div className="mt-4 p-4 bg-white border rounded-md w-full max-w-md">
          <h4 className="font-medium mb-2">Result:</h4>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CorsTestButton;
