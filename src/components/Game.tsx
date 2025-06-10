import React from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { Bird } from './Bird';
import { Pipe } from './Pipe';
import { GameUI } from './GameUI';
import { Background } from './Background';
import { GAME_CONFIG } from '../utils/gameUtils';

export const Game: React.FC = () => {
  const { gameState, jump } = useGameLoop();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-gray-700"
        style={{
          width: `${GAME_CONFIG.gameWidth}px`,
          height: `${GAME_CONFIG.gameHeight}px`,
          maxWidth: '100vw',
          maxHeight: '80vh',
        }}
        onClick={jump}
      >
        <Background />
        
        {/* Pipes */}
        {gameState.pipes.map(pipe => (
          <Pipe key={pipe.id} pipe={pipe} />
        ))}
        
        {/* Bird */}
        <Bird bird={gameState.bird} gameStatus={gameState.gameStatus} />
        
        {/* UI Overlay */}
        <GameUI
          score={gameState.score}
          highScore={gameState.highScore}
          gameStatus={gameState.gameStatus}
          onJump={jump}
        />
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
        <p>Use SPACEBAR, CLICK, or TAP to control the bird</p>
      </div>
    </div>
  );
};