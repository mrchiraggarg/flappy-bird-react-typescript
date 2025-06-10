import React from 'react';
import { Bird as BirdType } from '../types/game';
import { GAME_CONFIG } from '../utils/gameUtils';

interface BirdProps {
  bird: BirdType;
  gameStatus: 'menu' | 'playing' | 'gameOver';
}

export const Bird: React.FC<BirdProps> = ({ bird, gameStatus }) => {
  const isFlapping = gameStatus === 'playing' && bird.velocity < -5;
  
  return (
    <div
      className={`absolute transition-all duration-100 ease-out ${
        isFlapping ? 'scale-110' : 'scale-100'
      }`}
      style={{
        left: `${bird.x - GAME_CONFIG.birdSize / 2}px`,
        top: `${bird.y - GAME_CONFIG.birdSize / 2}px`,
        width: `${GAME_CONFIG.birdSize}px`,
        height: `${GAME_CONFIG.birdSize}px`,
        transform: `rotate(${bird.rotation}deg)`,
        zIndex: 10,
      }}
    >
      <div className="relative w-full h-full">
        {/* Bird body */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full shadow-lg border-2 border-orange-600">
          {/* Wing */}
          <div
            className={`absolute top-1 right-1 w-4 h-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full transform transition-transform duration-100 ${
              isFlapping ? 'rotate-12 scale-110' : '-rotate-6'
            }`}
          />
          {/* Eye */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full">
            <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full" />
          </div>
          {/* Beak */}
          <div className="absolute top-3 -left-1 w-2 h-1 bg-orange-500 transform rotate-45" />
        </div>
        
        {/* Shadow */}
        <div
          className="absolute -bottom-1 -right-1 w-full h-full bg-black opacity-20 rounded-full blur-sm"
          style={{ transform: 'scale(0.8)' }}
        />
      </div>
    </div>
  );
};