
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthUI from '@/components/AuthUI';
import { useUser } from '@/components/UserProvider';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Auth() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        
        <h1 className="text-center text-3xl font-extrabold text-gray-900">GhibliFy</h1>
        <h2 className="mt-2 text-center text-sm text-gray-600">
          Transform your images into Ghibli-style art
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Sign in to generate and save your Ghibli-style transformations
          </p>
        </div>
        
        <AuthUI />
      </div>
    </div>
  );
}
