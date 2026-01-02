'use client';

import { useEffect, useRef, useState } from 'react';
import './dino.css';

const DinoGameInternal = () => {
  const [mounted, setMounted] = useState(false);
  const dinoRef = useRef<HTMLDivElement>(null);
  const cactusRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const gameOver = false;

  // Jump Logic
  const jump = () => {
    if (isJumping || gameOver) return;
    setIsJumping(true);
    let pos = 0;

    const upInterval = setInterval(() => {
      if (pos >= 90) {
        clearInterval(upInterval);
        const downInterval = setInterval(() => {
          if (pos <= 0) {
            clearInterval(downInterval);
            setIsJumping(false);
          } else {
            pos -= 4;
            if (dinoRef.current) dinoRef.current.style.bottom = `${pos}px`;
          }
        }, 25);
      } else {
        pos += 4;
        if (dinoRef.current) dinoRef.current.style.bottom = `${pos}px`;
      }
    }, 20);
  };

  // Handle mounting and key listener
  useEffect(() => {
    setMounted(true);

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') jump();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isJumping, gameOver]);

  // Collision + Score Logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && dinoRef.current && cactusRef.current) {
        const dinoRect = dinoRef.current.getBoundingClientRect();
        const cactusRect = cactusRef.current.getBoundingClientRect();

        if (
          cactusRect.left < dinoRect.right &&
          cactusRect.right > dinoRect.left &&
          cactusRect.bottom > dinoRect.top
        ) {
          // setGameOver(true);
          // cactusRef.current.style.animationPlayState = 'paused';
          // alert('Game Over! Final Score: ' + score);
        } else {
          setScore((prev) => prev + 1);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver, score]);

  if (!mounted) {
    return <div className="game" style={{ visibility: 'hidden' }} />;
  }

  return (
    <div className="game">
      <div className="mountains">
        <div className="mountain mountain1"></div>
        <div className="mountain mountain2"></div>
      </div>
      <div className="bumpy-wrapper">
        <svg
          className="bumpy-svg"
          viewBox="0 0 600 100"
          preserveAspectRatio="none"
        >
          <path
            className="bumpy-path"
            d="M0,100 
         L0,80 
         Q30,60 60,80 
         Q90,40 120,80 
         Q150,60 180,70 
         Q210,30 240,80 
         Q270,50 300,70 
         Q330,40 360,80 
         Q390,60 420,70 
         Q450,50 480,80 
         Q510,60 540,70 
         Q570,55 600,80 
         L600,100 Z"
          />
        </svg>
      </div>
      <div className="tree tree1"></div>
      <div className="tree tree2"></div>
      <div className="tree tree3"></div>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="ground"></div>

      <div ref={dinoRef} className="dino">
        <img
          style={{ width: '100%' }}
          src="https://img.itch.zone/aW1hZ2UvNTA5MzIwLzI2NDIzNTEucG5n/347x500/kwmG6Z.png"
        />
      </div>

      <div ref={cactusRef} className="cactus">
        <img
          style={{ width: '100%' }}
          src="https://img.itch.zone/aW1hZ2UvNTA5MzIwLzI2NDIzNTcucG5n/347x500/%2FqbQKf.png"
        />
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default DinoGameInternal;
