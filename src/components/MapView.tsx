import React from 'react';
import { Map, ExternalLink, MapPin, Navigation } from 'lucide-react';

function MapView() {
  const handleOpenMap = () => {
    window.open('https://roxone.io', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 bg-bg-primary relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10">
          <MapPin className="w-8 h-8 text-primary/10" />
        </div>
        <div className="absolute bottom-10 left-10">
          <Navigation className="w-8 h-8 text-primary/10" />
        </div>
        <div className="absolute top-1/4 left-1/4">
          <Map className="w-12 h-12 text-primary/10" />
        </div>
      </div>

      <div className="max-w-md w-full bg-bg-secondary rounded-2xl p-6 md:p-8 shadow-xl border border-primary/10 text-center relative z-10 backdrop-blur-sm">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg mx-auto">
            <Map className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Interactive Map Experience
        </h1>
        
        <p className="text-text-secondary mb-6">
          Explore our interactive map with location tracking, custom markers, and detailed analytics. Perfect for planning and visualizing your marketing campaigns.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleOpenMap}
            className="btn-material btn-material-primary w-full flex items-center justify-center gap-2 py-3"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Open Interactive Map</span>
          </button>
          
          <div className="flex items-center justify-center gap-2 text-text-secondary text-sm">
            <MapPin className="w-4 h-4" />
            <span>Opens in a new browser tab</span>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary/10">
          <h3 className="text-lg font-semibold text-primary mb-3">Key Features</h3>
          <ul className="space-y-2 text-text-secondary text-left">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3 h-3 text-primary" />
              </div>
              <span>Custom location markers with detailed information</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Navigation className="w-3 h-3 text-primary" />
              </div>
              <span>Radius drawing and coverage analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Map className="w-3 h-3 text-primary" />
              </div>
              <span>AI-powered location insights and recommendations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MapView;