import React from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';

interface GameUIProps {
  score: number;
  highScore: number;
  gameStatus: 'menu' | 'playing' | 'gameOver';
  onJump: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({ score, highScore, gameStatus, onJump }) => {
  if (gameStatus === 'playing') {
    return (
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-6xl font-bold text-white drop-shadow-lg">
          {score}
        </div>
      </div>
    );
  }

  if (gameStatus === 'menu') {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-md mx-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Flappy Bird</h1>
          <p className="text-gray-600 mb-6">Tap or press SPACE to fly</p>
          
          {highScore > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6 text-amber-600">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Best: {highScore}</span>
            </div>
          )}
          
          <button
            onClick={onJump}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Start Game
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Click anywhere or use spacebar to jump
          </p>
        </div>
      </div>
    );
  }

  if (gameStatus === 'gameOver') {
    const isNewHighScore = score > 0 && score >= highScore;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-md mx-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Over</h2>
          
          <div className="space-y-3 mb-6">
            <div className="text-2xl font-semibold text-gray-700">
              Score: {score}
            </div>
            
            <div className={`flex items-center justify-center gap-2 ${
              isNewHighScore ? 'text-yellow-600' : 'text-amber-600'
            }`}>
              <Trophy className={`w-5 h-5 ${isNewHighScore ? 'animate-bounce' : ''}`} />
              <span className="font-semibold">
                {isNewHighScore ? 'New High Score!' : `Best: ${highScore}`}
              </span>
            </div>
          </div>
          
          <button
            onClick={onJump}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Press SPACE or tap to restart
          </p>
        </div>
      </div>
    );
  }

  return null;
};