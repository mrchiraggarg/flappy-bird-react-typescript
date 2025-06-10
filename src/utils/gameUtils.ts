import { Bird, Pipe, GameConfig } from '../types/game';

export const GAME_CONFIG: GameConfig = {
  gravity: 0.6,
  jumpForce: -12,
  pipeSpeed: 3,
  pipeGap: 150,
  pipeWidth: 60,
  birdSize: 30,
  gameWidth: 800,
  gameHeight: 600,
};

export const checkCollision = (bird: Bird, pipes: Pipe[]): boolean => {
  const birdLeft = bird.x - GAME_CONFIG.birdSize / 2;
  const birdRight = bird.x + GAME_CONFIG.birdSize / 2;
  const birdTop = bird.y - GAME_CONFIG.birdSize / 2;
  const birdBottom = bird.y + GAME_CONFIG.birdSize / 2;

  // Check boundaries
  if (birdTop <= 0 || birdBottom >= GAME_CONFIG.gameHeight) {
    return true;
  }

  // Check pipe collisions
  for (const pipe of pipes) {
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + GAME_CONFIG.pipeWidth;

    if (birdRight > pipeLeft && birdLeft < pipeRight) {
      if (birdTop < pipe.topHeight || birdBottom > pipe.bottomY) {
        return true;
      }
    }
  }

  return false;
};

export const generatePipe = (id: number, x: number): Pipe => {
  const topHeight = Math.random() * (GAME_CONFIG.gameHeight - GAME_CONFIG.pipeGap - 100) + 50;
  const bottomY = topHeight + GAME_CONFIG.pipeGap;

  return {
    id,
    x,
    topHeight,
    bottomY,
    passed: false,
  };
};

export const updateBird = (bird: Bird, deltaTime: number, isJumping: boolean): Bird => {
  const newVelocity = isJumping ? GAME_CONFIG.jumpForce : bird.velocity + GAME_CONFIG.gravity;
  const newY = bird.y + newVelocity;
  const newRotation = Math.max(-30, Math.min(30, newVelocity * 3));

  return {
    ...bird,
    y: newY,
    velocity: newVelocity,
    rotation: newRotation,
  };
};

export const updatePipes = (pipes: Pipe[], deltaTime: number): Pipe[] => {
  return pipes
    .map(pipe => ({
      ...pipe,
      x: pipe.x - GAME_CONFIG.pipeSpeed,
    }))
    .filter(pipe => pipe.x > -GAME_CONFIG.pipeWidth);
};

export const shouldGenerateNewPipe = (pipes: Pipe[]): boolean => {
  if (pipes.length === 0) return true;
  const lastPipe = pipes[pipes.length - 1];
  return lastPipe.x < GAME_CONFIG.gameWidth - 300;
};

export const calculateScore = (bird: Bird, pipes: Pipe[]): number => {
  return pipes.filter(pipe => 
    !pipe.passed && pipe.x + GAME_CONFIG.pipeWidth < bird.x
  ).length;
};