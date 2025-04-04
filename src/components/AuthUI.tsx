
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Github } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type AuthMode = 'signin' | 'signup' | 'forgotPassword';

export default function AuthUI() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [loading, setLoading] = useState(false);
  const [providerError, setProviderError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProviderError(null);

    try {
      if (authMode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
      } else if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:'http://localhost:3000' //"https://uelyqikobhjrosibqzxh.supabase.co/auth/v1/callback",
          }
        });

        if (error) throw error;
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account.",
        });
      } else if (authMode === 'forgotPassword') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/reset-password',
        });

        if (error) throw error;
        toast({
          title: "Password reset link sent",
          description: "Please check your email to reset your password.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      setProviderError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        if (error.message.includes('provider is not enabled')) {
          setProviderError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured. Please use email/password authentication.`);
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      toast({
        title: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Sign In Error`,
        description: error.message || `An error occurred during ${provider} sign in.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {authMode === 'signin' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Reset Password'}
        </h2>
        <p className="text-gray-600 mt-2">
          {authMode === 'signin' 
            ? 'Welcome back! Sign in to continue' 
            : authMode === 'signup' 
              ? 'Create an account to get started' 
              : 'Enter your email to receive a reset link'}
        </p>
      </div>

      {providerError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{providerError}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-4 mb-6">
        <Button 
          variant="outline" 
          className="flex items-center justify-center gap-2"
          onClick={() => handleOAuthSignIn('google')}
        >
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center justify-center gap-2"
          onClick={() => handleOAuthSignIn('github')}
        >
          <Github size={18} />
          Continue with GitHub
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {authMode !== 'forgotPassword' && (
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {authMode === 'signin' && (
                <span 
                  className="text-xs text-primary cursor-pointer"
                  onClick={() => setAuthMode('forgotPassword')}
                >
                  Forgot password?
                </span>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Processing...' : 
            authMode === 'signin' ? 'Sign In' : 
            authMode === 'signup' ? 'Sign Up' : 
            'Send Reset Link'}
        </Button>
      </form>

      <div className="text-center mt-6">
        {authMode === 'signin' ? (
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span 
              className="text-primary cursor-pointer font-medium"
              onClick={() => setAuthMode('signup')}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <span 
              className="text-primary cursor-pointer font-medium"
              onClick={() => setAuthMode('signin')}
            >
              Sign in
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
