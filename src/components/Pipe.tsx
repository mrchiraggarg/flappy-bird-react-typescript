import React from 'react';
import { Pipe as PipeType } from '../types/game';
import { GAME_CONFIG } from '../utils/gameUtils';

interface PipeProps {
  pipe: PipeType;
}

export const Pipe: React.FC<PipeProps> = ({ pipe }) => {
  return (
    <>
      {/* Top pipe */}
      <div
        className="absolute bg-gradient-to-r from-green-600 via-green-500 to-green-400 border-2 border-green-700 shadow-lg"
        style={{
          left: `${pipe.x}px`,
          top: 0,
          width: `${GAME_CONFIG.pipeWidth}px`,
          height: `${pipe.topHeight}px`,
        }}
      >
        <div className="absolute inset-x-0 -bottom-2 h-4 bg-gradient-to-r from-green-700 via-green-600 to-green-500 border-2 border-green-800 rounded-b-sm" />
        {/* Pipe highlight */}
        <div className="absolute left-1 top-2 bottom-2 w-2 bg-green-300 opacity-60 rounded-full" />
      </div>

      {/* Bottom pipe */}
      <div
        className="absolute bg-gradient-to-r from-green-600 via-green-500 to-green-400 border-2 border-green-700 shadow-lg"
        style={{
          left: `${pipe.x}px`,
          top: `${pipe.bottomY}px`,
          width: `${GAME_CONFIG.pipeWidth}px`,
          height: `${GAME_CONFIG.gameHeight - pipe.bottomY}px`,
        }}
      >
        <div className="absolute inset-x-0 -top-2 h-4 bg-gradient-to-r from-green-700 via-green-600 to-green-500 border-2 border-green-800 rounded-t-sm" />
        {/* Pipe highlight */}
        <div className="absolute left-1 top-4 bottom-2 w-2 bg-green-300 opacity-60 rounded-full" />
      </div>
    </>
  );
};