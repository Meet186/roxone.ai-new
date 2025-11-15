import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './config/supabase';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import About from './components/About';
import Help from './components/Help';
import Premium from './components/Premium';
import Auth from './components/Auth';
import MapView from './components/MapView';

function AppContent() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const setProfile = useAuthStore((state) => state.setProfile);
  const showNavbar = user || (location.pathname !== '/' && location.pathname !== '/auth');

  useEffect(() => {
    if (user) {
      // Fetch user profile
      const fetchProfile = async () => {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(profile);
        }
      };

      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user, setProfile]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Chat /> : <Auth />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </div>
  );
}

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;