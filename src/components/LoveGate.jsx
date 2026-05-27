import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PETALS = ['💗', '🌸', '💕', '✨', '🩷'];
const TYPEWRITER_TEXT = 'What did I say to you on our very first day together?';

function generatePetals(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
    left: Math.random() * 100,
    animationDuration: 8 + Math.random() * 12,
    animationDelay: Math.random() * 15,
    fontSize: 12 + Math.random() * 20,
    opacity: 0.3 + Math.random() * 0.4,
  }));
}

function generateBurstHearts(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
    targetX: (Math.random() - 0.5) * 800,
    targetY: (Math.random() - 0.5) * 800,
    rotation: Math.random() * 720 - 360,
    delay: Math.random() * 0.3,
    duration: 1.2 + Math.random() * 0.8,
  }));
}

const petalsData = generatePetals(12);

export default function LoveGate({ onUnlock }) {
  const [unlocked, setUnlocked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [burstHearts] = useState(() => generateBurstHearts(30));
  const typewriterRef = useRef(null);
  const inputRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    typewriterRef.current = setInterval(() => {
      if (index < TYPEWRITER_TEXT.length) {
        setTypedText(TYPEWRITER_TEXT.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typewriterRef.current);
      }
    }, 50);

    return () => clearInterval(typewriterRef.current);
  }, []);

  // Handle unlock transition
  useEffect(() => {
    if (unlocked && onUnlock) {
      onUnlock();
    }
  }, [unlocked, onUnlock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showHeartBurst) return;

    setShowHeartBurst(true);

    setTimeout(() => {
      setUnlocked(true);
    }, 2000);
  };

  if (unlocked) return null;

  return (
    <motion.div
      className="love-gate"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0d0a12',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating petals background */}
      {petalsData.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            position: 'absolute',
            left: `${petal.left}%`,
            top: '-5%',
            fontSize: `${petal.fontSize}px`,
            opacity: petal.opacity,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            animationName: 'petalFall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {petal.emoji}
        </span>
      ))}

      {/* Subtle ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,105,180,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main centered content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{
          textAlign: 'center',
          zIndex: 2,
          padding: '40px',
          maxWidth: 520,
          width: '90%',
        }}
      >
        {/* Glowing title */}
        <motion.h1
          className="gate-title"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ff6b9d, #ffa8cc, #ff6b9d, #c084fc)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
            letterSpacing: '1px',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(255,107,157,0.4))',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          4 Months of Us 💕
        </motion.h1>

        {/* Subtle decorative line */}
        <motion.div
          style={{
            width: 80,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #ff6b9d, transparent)',
            margin: '0 auto 28px',
            borderRadius: 2,
          }}
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 1 }}
        />

        {/* Typewriter text */}
        <motion.p
          className="typewriter-text"
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: '#e8c4d8',
            marginBottom: '32px',
            minHeight: '2em',
            fontStyle: 'italic',
            lineHeight: 1.6,
            letterSpacing: '0.3px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {typedText}
          <motion.span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.1em',
              background: '#ff6b9d',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
            }}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.49, 0.5, 1], ease: 'linear' }}
          />
        </motion.p>

        {/* Input form */}
        <form onSubmit={handleSubmit}>
          <motion.input
            ref={inputRef}
            className="gate-input"
            type="text"
            placeholder="Type your answer here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '1rem',
              border: '2px solid rgba(255,107,157,0.3)',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.06)',
              color: '#fce4ec',
              outline: 'none',
              marginBottom: '18px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              letterSpacing: '0.5px',
            }}
            whileFocus={{
              borderColor: 'rgba(255,107,157,0.7)',
              boxShadow: '0 0 25px rgba(255,107,157,0.2)',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          />

          <motion.button
            className="gate-button"
            type="submit"
            style={{
              padding: '14px 40px',
              fontSize: '1.05rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
              color: '#fff',
              cursor: 'pointer',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 25px rgba(255,107,157,0.35)',
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 6px 35px rgba(255,107,157,0.5)',
            }}
            whileTap={{ scale: 0.96 }}
          >
            Enter Our World 🌸
          </motion.button>
        </form>
      </motion.div>

      {/* Heart burst overlay */}
      <AnimatePresence>
        {showHeartBurst && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 10000,
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {burstHearts.map((heart) => (
              <motion.span
                key={heart.id}
                style={{
                  position: 'absolute',
                  fontSize: '28px',
                  userSelect: 'none',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x: heart.targetX,
                  y: heart.targetY,
                  scale: [0, 3, 0],
                  opacity: [1, 1, 0],
                  rotate: heart.rotation,
                }}
                transition={{
                  duration: heart.duration,
                  delay: heart.delay,
                  ease: 'easeOut',
                }}
              >
                {heart.emoji}
              </motion.span>
            ))}

            {/* Central flash */}
            <motion.div
              style={{
                position: 'absolute',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,157,0.9) 0%, transparent 70%)',
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 60, opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
