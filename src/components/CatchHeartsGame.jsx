import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HEART_EMOJIS = ['💖', '💕', '💗', '💝'];
const STAR_EMOJIS = ['⭐', '✨'];
const BOMB_EMOJI = '💣';

const GAME_HEIGHT = 400;
const BASKET_WIDTH_PERCENT = 8;
const ITEM_SPEED = 4;
const SPAWN_INTERVAL = 400;
const TICK_INTERVAL = 50;
const GAME_DURATION = 20;

let itemIdCounter = 0;

function getRandomItem() {
  const rand = Math.random();
  if (rand < 0.05) {
    return { emoji: BOMB_EMOJI, type: 'bomb' };
  } else if (rand < 0.20) {
    return { emoji: STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)], type: 'star' };
  } else {
    return { emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)], type: 'heart' };
  }
}

export default function CatchHeartsGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [basketX, setBasketX] = useState(50);
  const [items, setItems] = useState([]);
  const [basketFlash, setBasketFlash] = useState(null);
  const [borderFlash, setBorderFlash] = useState(false);

  const gameAreaRef = useRef(null);
  const itemsRef = useRef([]);
  const basketXRef = useRef(50);
  const scoreRef = useRef(0);
  const gameStartedRef = useRef(false);
  const gameOverRef = useRef(false);

  // Keep refs in sync
  useEffect(() => { itemsRef.current = items; }, [items]);
  useEffect(() => { basketXRef.current = basketX; }, [basketX]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { gameStartedRef.current = gameStarted; }, [gameStarted]);
  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);

  const moveBasket = useCallback((direction) => {
    setBasketX((prev) => {
      const next = direction === 'left' ? prev - 5 : prev + 5;
      return Math.max(5, Math.min(95, next));
    });
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStartedRef.current || gameOverRef.current) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveBasket('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveBasket('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveBasket]);

  // Mouse/touch controls
  const handleAreaClick = useCallback((e) => {
    if (!gameStarted || gameOver) return;
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    moveBasket(clickX < halfWidth ? 'left' : 'right');
  }, [gameStarted, gameOver, moveBasket]);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Spawn items
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const spawner = setInterval(() => {
      const { emoji, type } = getRandomItem();
      const newItem = {
        id: ++itemIdCounter,
        x: Math.random() * 80 + 10,
        y: -30,
        emoji,
        type,
      };
      setItems((prev) => [...prev, newItem]);
    }, SPAWN_INTERVAL);
    return () => clearInterval(spawner);
  }, [gameStarted, gameOver]);

  // Game tick: move items and detect collisions
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const tick = setInterval(() => {
      setItems((prevItems) => {
        const remaining = [];
        let scoreChange = 0;
        let caughtHeart = false;
        let caughtBomb = false;

        for (const item of prevItems) {
          const newY = item.y + ITEM_SPEED;

          // Check collision: item reached basket level and is close in x
          if (newY > 350 && newY < 400 && Math.abs(item.x - basketXRef.current) < BASKET_WIDTH_PERCENT) {
            if (item.type === 'bomb') {
              scoreChange -= 2;
              caughtBomb = true;
            } else {
              scoreChange += 1;
              caughtHeart = true;
            }
            // Item is removed (not added to remaining)
            continue;
          }

          // Remove items that fell past the game area
          if (newY > GAME_HEIGHT + 30) {
            continue;
          }

          remaining.push({ ...item, y: newY });
        }

        if (scoreChange !== 0) {
          setScore((prev) => Math.max(0, prev + scoreChange));
        }
        if (caughtHeart) {
          setBasketFlash('green');
          setTimeout(() => setBasketFlash(null), 200);
        }
        if (caughtBomb) {
          setBorderFlash(true);
          setTimeout(() => setBorderFlash(false), 300);
        }

        return remaining;
      });
    }, TICK_INTERVAL);
    return () => clearInterval(tick);
  }, [gameStarted, gameOver]);

  const startGame = useCallback(() => {
    itemIdCounter = 0;
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBasketX(50);
    setItems([]);
    setGameOver(false);
    setGameStarted(true);
    setBasketFlash(null);
    setBorderFlash(false);
  }, []);

  const getGameOverMessage = () => {
    if (score > 15) return 'You caught them all — just like in real life 🥺💕';
    if (score > 10) return 'Not bad! Your heart-catching skills are almost as good as your smile 😊';
    if (score > 5) return 'We need to practice... more cuddle time! 🤗';
    return 'The hearts were too fast — but mine is always yours 💗';
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #FF69B4, #FF1493, #FFB6C1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    textAlign: 'center',
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px',
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    padding: '14px 40px',
    fontSize: '1.1rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255,105,180,0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '1rem',
  };

  const gameAreaStyle = {
    width: '100%',
    height: `${GAME_HEIGHT}px`,
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: borderFlash
      ? '2px solid rgba(255,0,0,0.8)'
      : '1px solid rgba(255,255,255,0.1)',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'border 0.2s ease',
    boxShadow: borderFlash
      ? '0 0 30px rgba(255,0,0,0.3), inset 0 0 30px rgba(255,0,0,0.1)'
      : '0 0 30px rgba(255,105,180,0.1)',
  };

  const hudStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 20px',
    fontSize: '1.2rem',
    color: '#FFB6C1',
    fontWeight: 700,
    position: 'relative',
    zIndex: 10,
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  };

  const basketStyle = {
    position: 'absolute',
    bottom: '10px',
    left: `${basketX}%`,
    transform: 'translateX(-50%)',
    width: '60px',
    textAlign: 'center',
    fontSize: '2.5rem',
    zIndex: 5,
    filter: basketFlash === 'green'
      ? 'drop-shadow(0 0 16px rgba(0,255,100,0.8))'
      : 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
    transition: 'left 0.05s linear, filter 0.1s ease',
  };

  // Start screen
  if (!gameStarted) {
    return (
      <section style={{ padding: '1rem 0' }}>
        <motion.div
          style={cardStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={headingStyle}>Catch My Heart 💖</h2>
          <p style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: '0.5rem',
          }}>
            Hearts are falling from the sky! Move the basket left and right to catch as many as you can.
            Grab hearts 💖 and stars ⭐ for points, but watch out for bombs 💣 — they'll steal your score!
          </p>
          <p style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.85rem',
            marginBottom: '1rem',
          }}>
            Use ← → arrow keys, or click/tap the left and right halves of the game area.
          </p>
          <div style={{ textAlign: 'center' }}>
            <motion.button
              style={buttonStyle}
              onClick={startGame}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 30px rgba(255,105,180,0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game 🎮
            </motion.button>
          </div>
        </motion.div>
      </section>
    );
  }

  // Game over screen
  if (gameOver) {
    return (
      <section style={{ padding: '1rem 0' }}>
        <motion.div
          style={cardStyle}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <h2 style={headingStyle}>Game Over!</h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
            style={{ textAlign: 'center', margin: '1.5rem 0' }}
          >
            <div style={{
              fontSize: '4rem',
              marginBottom: '0.5rem',
            }}>
              {score > 15 ? '🏆' : score > 10 ? '🎉' : score > 5 ? '💕' : '💗'}
            </div>
            <p style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FF69B4, #FFD700, #FF1493)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem',
            }}>
              You caught {score} hearts!
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
                maxWidth: '400px',
                margin: '0 auto',
              }}
            >
              {getGameOverMessage()}
            </motion.p>
          </motion.div>
          <div style={{ textAlign: 'center' }}>
            <motion.button
              style={buttonStyle}
              onClick={startGame}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 30px rgba(255,105,180,0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again 🔄
            </motion.button>
          </div>
        </motion.div>
      </section>
    );
  }

  // Active game
  return (
    <section style={{ padding: '1rem 0' }}>
      <div style={cardStyle}>
        <h2 style={{ ...headingStyle, fontSize: '1.5rem', marginBottom: '1rem' }}>
          Catch My Heart 💖
        </h2>
        <div
          ref={gameAreaRef}
          style={gameAreaStyle}
          onClick={handleAreaClick}
        >
          {/* Ambient floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(255,182,193,0.3)',
                left: `${15 + i * 14}%`,
                bottom: '0px',
                zIndex: 1,
                pointerEvents: 'none',
              }}
              animate={{
                y: [0, -GAME_HEIGHT - 20],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'linear',
              }}
            />
          ))}

          {/* HUD */}
          <div style={hudStyle}>
            <span>💖 Score: {score}</span>
            <span>⏱️ {timeLeft}s</span>
          </div>

          {/* Falling items */}
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}px`,
                  fontSize: '1.8rem',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                  pointerEvents: 'none',
                  filter: item.type === 'bomb'
                    ? 'drop-shadow(0 2px 6px rgba(255,0,0,0.4))'
                    : 'drop-shadow(0 2px 6px rgba(255,105,180,0.4))',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.15 }}
              >
                {item.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Basket */}
          <div style={basketStyle}>
            🧺
          </div>

          {/* Ground glow */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to top, rgba(255,105,180,0.08), transparent)',
            pointerEvents: 'none',
            zIndex: 1,
          }} />
        </div>

        {/* Instructions below game area */}
        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.8rem',
          marginTop: '0.75rem',
        }}>
          ← → keys or click/tap left & right to move the basket
        </p>
      </div>
    </section>
  );
}
