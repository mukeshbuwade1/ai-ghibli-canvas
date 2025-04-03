
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthUI from '@/components/AuthUI';
import { useUser } from '@/components/UserProvider';

export default function Auth() {
  const { user, loading } = useUser();

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
        <h1 className="text-center text-3xl font-extrabold text-gray-900">GhibliAI</h1>
        <h2 className="mt-2 text-center text-sm text-gray-600">
          Transform your images into Ghibli-style art
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthUI />
      </div>
    </div>
  );
}
