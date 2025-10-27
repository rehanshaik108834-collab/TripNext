import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';

const AuthPage = ({ isLogin = true, onAuth }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = () => {
    // Redirect to Emergent Auth
    const redirectUrl = `${window.location.origin}/trips`;
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 pt-16">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L8 8L8 24L16 30L24 24V8L16 2Z" fill="#FF6B4A"/>
              <path d="M12 10H20V14H12V10Z" fill="white"/>
              <path d="M12 18H20V22H12V18Z" fill="white"/>
            </svg>
            <span className="text-3xl font-bold text-[#FF6B4A]">wanderlog</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome back!' : 'Start your journey'}
          </h1>
          <p className="text-gray-600">
            {isLogin
              ? 'Log in to access your trips and itineraries'
              : 'Create an account to start planning your adventures'}
          </p>
        </div>

        {/* Google OAuth Button */}
        <Button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 mb-4"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loading ? 'Connecting...' : `Continue with Google`}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Alternative Auth Methods (Mock) */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full py-6"
            disabled
          >
            Continue with Email (Coming Soon)
          </Button>
        </div>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              onClick={() => navigate(isLogin ? '/signup' : '/login')}
              className="text-[#FF6B4A] font-semibold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="underline">Privacy Policy</a>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;