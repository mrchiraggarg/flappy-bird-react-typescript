import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-green-200" />
      
      {/* Animated clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-10 w-16 h-8 bg-white/60 rounded-full animate-pulse" />
        <div className="absolute top-24 left-32 w-12 h-6 bg-white/40 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-32 right-20 w-20 h-10 bg-white/50 rounded-full animate-pulse delay-2000" />
        <div className="absolute top-8 right-40 w-14 h-7 bg-white/45 rounded-full animate-pulse delay-500" />
      </div>
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-green-400">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/50 to-green-600/50" />
        {/* Grass texture */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-green-700/30" />
      </div>
    </div>
  );
};