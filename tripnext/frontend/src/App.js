import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import TripsPage from './components/TripsPage';
import NewTripPage from './components/NewTripPage';
import TripDetailPage from './components/TripDetailPage';
import GuidesPage from './components/GuidesPage';
import HotelsPage from './components/HotelsPage';
import AuthPage from './components/AuthPage';
import { Toaster } from './components/ui/toaster';
import { authAPI } from './services/api';

// Component to handle auth session
const AuthHandler = ({ onAuth, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for session_id in URL fragment
    const hash = window.location.hash;
    if (hash && hash.includes('session_id=')) {
      setLoading(true);
      const sessionId = hash.split('session_id=')[1].split('&')[0];
      
      // Process session_id
      authAPI.createSession(sessionId)
        .then((userData) => {
          onAuth(userData);
          // Clean URL fragment
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Auth error:', error);
          setLoading(false);
          navigate('/login');
        });
    }
  }, [location, navigate, onAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B4A] mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          // Verify session with backend
          const currentUser = await authAPI.getMe();
          setUser(currentUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Session expired:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('session_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('session_token');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B4A]"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AuthHandler onAuth={handleAuth}>
        <div className="App">
          <Navbar
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={<HomePage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/trips" replace />
                ) : (
                  <AuthPage isLogin={true} onAuth={handleAuth} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/trips" replace />
                ) : (
                  <AuthPage isLogin={false} onAuth={handleAuth} />
                )
              }
            />
            <Route
              path="/trips"
              element={
                isAuthenticated ? (
                  <TripsPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/trip/new"
              element={
                isAuthenticated ? (
                  <NewTripPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/trip/:tripId"
              element={
                isAuthenticated ? (
                  <TripDetailPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
          </Routes>
          <Toaster />
        </div>
      </AuthHandler>
    </BrowserRouter>
  );
}

export default App;