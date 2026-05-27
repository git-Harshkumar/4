import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PETAL_EMOJIS = ['🌹', '🌸', '💗', '🩷'];

{/* ✏️ Edit this letter with your own words! */}
const LETTER_LINES = [
  'My Dearest Love,',
  '',
  'Four months. 120 days. Thousands of moments.',
  "And I'd choose every single one again",
  'just to end up right here, with you.',
  '',
  "You're not just my girlfriend —",
  "you're my favorite part of every day.",
  'My first thought in the morning,',
  'my last smile at night.',
  '',
  'Thank you for being you.',
  'Thank you for choosing me.',
  'Thank you for making ordinary days extraordinary.',
  '',
  'Happy 4 months, my love. 💕',
  '',
  'Forever yours,',
  '— Your Idiot 🥺💗',
];

const EKG_PATH = 'M0,40 L60,40 L70,40 L80,10 L90,70 L100,40 L110,40 L120,40 L130,35 L140,45 L150,40 L200,40 L210,40 L220,10 L230,70 L240,40 L250,40 L300,40';

export default function LoveLetter({ visible }) {
  const petals = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
      left: Math.random() * 100,
      duration: 20 + Math.random() * 20,
      delay: Math.random() * 15,
      size: 10 + Math.random() * 16,
      opacity: 0.1 + Math.random() * 0.15,
    })), []
  );

  if (!visible) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(45,10,30,0.5) 0%, transparent 70%)',
      }}
    >
      {/* Inject petalFall keyframes */}
      <style>{`
        @keyframes letterPetalFall {
          0% { transform: translateY(-5vh) translateX(0px) rotate(0deg); }
          25% { transform: translateY(25vh) translateX(15px) rotate(90deg); }
          50% { transform: translateY(50vh) translateX(-10px) rotate(180deg); }
          75% { transform: translateY(75vh) translateX(20px) rotate(270deg); }
          100% { transform: translateY(105vh) translateX(-5px) rotate(360deg); }
        }
      `}</style>

      {/* Slow floating rose petals */}
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-5%',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `letterPetalFall ${p.duration}s linear ${p.delay}s infinite`,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* The Love Letter */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: '60px 40px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ✏️ Edit the letter above (LETTER_LINES array) with your own words! */}
        {LETTER_LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 + i * 0.3, ease: 'easeOut' }}
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: line === '' ? '0.5rem' : (i === 0 || i === LETTER_LINES.length - 1 || i === LETTER_LINES.length - 2)
                ? 'clamp(1.4rem, 3vw, 1.8rem)'
                : 'clamp(1.2rem, 2.5vw, 1.6rem)',
              color: '#e8c4d8',
              lineHeight: line === '' ? 1 : 2,
              textAlign: 'center',
              letterSpacing: '0.5px',
              margin: 0,
              fontWeight: (i === 0 || i >= LETTER_LINES.length - 2) ? 700 : 400,
              minHeight: line === '' ? '1rem' : 'auto',
            }}
          >
            {line || '\u00A0'}
          </motion.p>
        ))}
      </motion.div>

      {/* Heartbeat EKG Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8, duration: 1 }}
        style={{ position: 'relative', zIndex: 2, margin: '30px auto' }}
      >
        <svg
          width="300"
          height="80"
          viewBox="0 0 300 80"
          style={{ display: 'block', margin: '0 auto', filter: 'drop-shadow(0 0 6px rgba(255,105,180,0.8))' }}
        >
          <motion.path
            d={EKG_PATH}
            stroke="#FF69B4"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 8, ease: 'easeInOut' }}
          />
        </svg>

        {/* Heart that appears after EKG draws */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: 1 }}
          transition={{ delay: 11.5, duration: 0.8, ease: 'easeOut' }}
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            marginTop: 8,
          }}
        >
          💖
        </motion.div>
      </motion.div>

      {/* Candle Flicker */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.6, 1, 0.5],
          scale: [1, 1.05, 0.98, 1.03, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 30,
          fontSize: '3rem',
          zIndex: 2,
          filter: 'drop-shadow(0 0 20px rgba(255,165,0,0.4))',
        }}
      >
        🕯️
      </motion.div>

      {/* Second candle on the left */}
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.5, 0.9, 0.6],
          scale: [1, 1.03, 0.97, 1.05, 1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 30,
          fontSize: '3rem',
          zIndex: 2,
          filter: 'drop-shadow(0 0 20px rgba(255,165,0,0.4))',
        }}
      >
        🕯️
      </motion.div>
    </motion.section>
  );
}
