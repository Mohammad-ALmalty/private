
import React, { useEffect, useState } from 'react';

interface HeartProps {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  symbol: string;
}

const SYMBOLS = ['❤️', '💖', '✨', '💕', '🌹', '🌸'];

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${10 + Math.random() * 15}s`,
        size: `${Math.random() * 20 + 10}px`,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      }));
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          {heart.symbol}
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;
