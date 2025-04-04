import React from 'react'
import { Button } from './ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useUser } from './UserProvider';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const { user, signOut } = useUser();
    const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">GhibliFy</h1>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Home
            </a>
            
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-primary transition-colors"
            >
              About Us
            </a>
            
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Login
            </a>
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={signOut}
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/auth")}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </header>
  )
}
