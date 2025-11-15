import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, User, Menu, X, Instagram, HelpCircle, Crown, LogOut, Map } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../config/supabase';
import clsx from 'clsx';

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/roxone.tech', '_blank');
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsProfileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-bg-secondary backdrop-blur-lg bg-opacity-80 h-16 flex items-center px-4 md:px-6 border-b border-primary/10 sticky top-0 z-50">
      <div className="flex items-center gap-2 text-primary">
        <MessageSquare className="w-7 h-7" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
          Roxone AI
        </span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex ml-auto items-center gap-4">
        <Link
          to="/"
          className={clsx(
            "nav-link",
            location.pathname === "/" ? "active" : "text-text-secondary"
          )}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </Link>
        <Link
          to="/map"
          className={clsx(
            "nav-link",
            location.pathname === "/map" ? "active" : "text-text-secondary"
          )}
        >
          <Map className="w-5 h-5" />
          <span>Map</span>
        </Link>
        <Link
          to="/premium"
          className={clsx(
            "nav-link",
            location.pathname === "/premium" ? "active" : "text-text-secondary"
          )}
        >
          <Crown className="w-5 h-5" />
          <span>Premium</span>
        </Link>
        <Link
          to="/about"
          className={clsx(
            "nav-link",
            location.pathname === "/about" ? "active" : "text-text-secondary"
          )}
        >
          <User className="w-5 h-5" />
          <span>About</span>
        </Link>
        <Link
          to="/help"
          className={clsx(
            "nav-link",
            location.pathname === "/help" ? "active" : "text-text-secondary"
          )}
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </Link>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={handleInstagramClick}
            className="text-text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-bg-primary"
            aria-label="Visit our Instagram"
          >
            <Instagram className="w-5 h-5" />
          </button>
          
          {/* User Profile */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-bg-primary transition-colors"
              >
                <img
                  src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-primary"
                />
              </button>
              
              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-secondary rounded-xl shadow-lg border border-primary/10 py-2">
                  <div className="px-4 py-2 border-b border-primary/10">
                    <p className="text-text-primary font-medium truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-text-secondary hover:text-primary hover:bg-bg-primary flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex ml-auto items-center gap-4 md:hidden">
        {user && (
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2"
            >
              <img
                src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-primary"
              />
            </button>
            
            {/* Mobile Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-bg-secondary rounded-xl shadow-lg border border-primary/10 py-2">
                <div className="px-4 py-2 border-b border-primary/10">
                  <p className="text-text-primary font-medium truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-text-secondary hover:text-primary hover:bg-bg-primary flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
        <button
          onClick={handleInstagramClick}
          className="text-text-secondary hover:text-primary transition-colors p-2"
          aria-label="Visit our Instagram"
        >
          <Instagram className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-text-secondary hover:text-primary p-2"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-bg-secondary border-b border-primary/10 md:hidden animate-fade-in-down">
          <div className="flex flex-col p-4 gap-2">
            <Link
              to="/"
              className={clsx(
                "nav-link",
                location.pathname === "/" ? "active" : "text-text-secondary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat</span>
            </Link>
            <Link
              to="/map"
              className={clsx(
                "nav-link",
                location.pathname === "/map" ? "active" : "text-text-secondary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Map className="w-5 h-5" />
              <span>Map</span>
            </Link>
            <Link
              to="/premium"
              className={clsx(
                "nav-link",
                location.pathname === "/premium" ? "active" : "text-text-secondary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Crown className="w-5 h-5" />
              <span>Premium</span>
            </Link>
            <Link
              to="/about"
              className={clsx(
                "nav-link",
                location.pathname === "/about" ? "active" : "text-text-secondary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>About</span>
            </Link>
            <Link
              to="/help"
              className={clsx(
                "nav-link",
                location.pathname === "/help" ? "active" : "text-text-secondary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;