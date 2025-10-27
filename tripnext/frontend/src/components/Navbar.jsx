import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L8 8L8 24L16 30L24 24V8L16 2Z" fill="#FF6B4A"/>
              <path d="M12 10H20V14H12V10Z" fill="white"/>
              <path d="M12 18H20V22H12V18Z" fill="white"/>
            </svg>
            <span className="text-2xl font-bold text-[#FF6B4A]">wanderlog</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </Link>
            <Link to="/guides" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Travel guides
            </Link>
            <Link to="/hotels" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Hotels
            </Link>
          </div>

          {/* Search and Auth */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="hidden lg:flex items-center relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Explore by destination"
                  className="pl-10 w-64 bg-gray-50 border-gray-200"
                />
              </div>
            )}
            
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/trips')}
                  className="text-gray-700 hover:text-gray-900"
                >
                  My Trips
                </Button>
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;