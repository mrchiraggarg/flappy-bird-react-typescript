import { useCallback, useEffect, useRef, useState } from 'react';
import { GameState, Pipe } from '../types/game';
import { 
  GAME_CONFIG, 
  checkCollision, 
  generatePipe, 
  updateBird, 
  updatePipes, 
  shouldGenerateNewPipe,
  calculateScore 
} from '../utils/gameUtils';

const INITIAL_BIRD = {
  x: 150,
  y: GAME_CONFIG.gameHeight / 2,
  velocity: 0,
  rotation: 0,
};

export const useGameLoop = () => {
  const [gameState, setGameState] = useState<GameState>({
    bird: INITIAL_BIRD,
    pipes: [],
    score: 0,
    highScore: parseInt(localStorage.getItem('flappyHighScore') || '0'),
    gameStatus: 'menu',
    lastTime: 0,
  });

  const animationFrameRef = useRef<number>();
  const pipeIdRef = useRef(0);
  const isJumpingRef = useRef(false);

  const jump = useCallback(() => {
    if (gameState.gameStatus === 'menu') {
      startGame();
    } else if (gameState.gameStatus === 'playing') {
      isJumpingRef.current = true;
    } else if (gameState.gameStatus === 'gameOver') {
      resetGame();
    }
  }, [gameState.gameStatus]);

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      bird: INITIAL_BIRD,
      pipes: [],
      score: 0,
      gameStatus: 'playing',
      lastTime: performance.now(),
    }));
    pipeIdRef.current = 0;
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      bird: INITIAL_BIRD,
      pipes: [],
      score: 0,
      gameStatus: 'menu',
      lastTime: 0,
    }));
    pipeIdRef.current = 0;
  };

  const gameLoop = useCallback((currentTime: number) => {
    setGameState(prevState => {
      if (prevState.gameStatus !== 'playing') {
        return prevState;
      }

      const deltaTime = currentTime - prevState.lastTime;
      if (deltaTime < 16) return prevState; // Cap at ~60fps

      // Update bird
      const newBird = updateBird(prevState.bird, deltaTime, isJumpingRef.current);
      isJumpingRef.current = false;

      // Update pipes
      let newPipes = updatePipes(prevState.pipes, deltaTime);

      // Generate new pipes
      if (shouldGenerateNewPipe(newPipes)) {
        const newPipe = generatePipe(pipeIdRef.current++, GAME_CONFIG.gameWidth);
        newPipes = [...newPipes, newPipe];
      }

      // Calculate score
      const newScore = calculateScore(newBird, newPipes);
      const scoredPipes = newPipes.map(pipe => ({
        ...pipe,
        passed: pipe.x + GAME_CONFIG.pipeWidth < newBird.x || pipe.passed,
      }));

      // Check collisions
      if (checkCollision(newBird, scoredPipes)) {
        const newHighScore = Math.max(newScore, prevState.highScore);
        if (newHighScore > prevState.highScore) {
          localStorage.setItem('flappyHighScore', newHighScore.toString());
        }
        
        return {
          ...prevState,
          bird: newBird,
          pipes: scoredPipes,
          score: newScore,
          highScore: newHighScore,
          gameStatus: 'gameOver',
          lastTime: currentTime,
        };
      }

      return {
        ...prevState,
        bird: newBird,
        pipes: scoredPipes,
        score: newScore,
        lastTime: currentTime,
      };
    });

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, []);

  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.gameStatus, gameLoop]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return { gameState, jump };
};