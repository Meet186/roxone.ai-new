import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { Mail, Lock, LogIn, UserPlus, MessageSquare, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    setError('');
    setSuccessMessage('');
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAuthError = (error: any) => {
    console.error('Auth error:', error);
    
    if (error?.message?.includes('network')) {
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setError('Network error. Retrying...');
        setTimeout(() => handleEmailAuth(), 1000);
        return;
      }
      setError('Network error. Please check your connection and try again.');
    } else if (error?.message?.includes('Invalid login credentials')) {
      if (isSignUp) {
        setError('Unable to create account. This email may already be registered.');
      } else {
        setError('Invalid email or password. Please check your credentials and try again, or sign up if you don\'t have an account.');
      }
    } else if (error?.message?.includes('Email not confirmed')) {
      setError('Please verify your email address before signing in.');
    } else if (error?.message?.includes('Database error')) {
      setError('Unable to create account. Please try again later or contact support if the problem persists.');
    } else if (error?.message?.includes('User already registered')) {
      setError('An account with this email already exists. Please sign in instead.');
      setIsSignUp(false);
    } else {
      setError(error?.message || 'Authentication failed. Please try again.');
    }
  };

  const handleEmailAuth = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (isSignUp && !acceptTerms) {
      setError('Please accept the terms and conditions to continue.');
      return;
    }
    
    setError('');
    setSuccessMessage('');
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        
        if (signUpError) throw signUpError;
        setSuccessMessage('Account created successfully! You can now sign in.');
        setIsSignUp(false);
        setPassword(''); // Clear password for security
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) throw signInError;
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
      setRetryCount(0);
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccessMessage('');
    setAcceptTerms(false);
    setPassword(''); // Clear password when switching modes
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6">
      <div className="w-full text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-primary">
          <MessageSquare className="w-8 h-8" />
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            Roxone AI
          </span>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-bg-secondary rounded-2xl p-6 shadow-xl border border-primary/10">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-3 mb-4 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 rounded-lg p-3 mb-4 text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 bg-bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs text-text-secondary mt-1">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            {isSignUp && (
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="btn-material btn-material-primary w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin">⌛</span>
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={switchMode}
              className="text-primary hover:underline text-sm"
              disabled={loading}
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>

          {!isSignUp && (
            <div className="mt-2 text-center">
              <p className="text-xs text-text-secondary">
                New to Roxone AI? Create an account to get started with AI-powered conversations.
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="w-full text-center mt-8 text-text-secondary text-sm">
        <p className="mb-2">
          By using Roxone AI, you agree to our Terms of Service and Privacy Policy.
        </p>
        <p>© {new Date().getFullYear()} Roxone AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Auth;