import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContinueToggle() {
  const [answer, setAnswer] = useState(null); // null, 'yes', 'no'
  const [celebrating, setCelebrating] = useState(false);

  // Generate celebration particles
  const confetti = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      emoji: ['🎉', '💕', '🥳', '💖', '✨', '🎊', '💗', '🩷', '👑', '🌸', '🎆', '💐'][i % 12],
      x: (Math.random() - 0.5) * 800,
      y: -(Math.random() * 600 + 100),
      rotate: Math.random() * 720 - 360,
      delay: Math.random() * 0.8,
      size: 1 + Math.random() * 1.5,
      duration: 2 + Math.random() * 1.5,
    })), []
  );

  const fireworks = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: ['🎆', '🎇', '✨', '💖', '🎉'][i % 5],
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 600,
      delay: 0.5 + Math.random() * 1.5,
    })), []
  );

  const handleYes = () => {
    setAnswer('yes');
    setCelebrating(true);
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <AnimatePresence mode="wait">
        {answer === null && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            style={{
              maxWidth: 550,
              width: '100%',
              textAlign: 'center',
              padding: '50px 35px',
              borderRadius: 28,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,182,193,0.15)',
              boxShadow: '0 0 50px rgba(255,105,180,0.08)',
              position: 'relative',
            }}
          >
            {/* Decorative hearts */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontSize: '3rem', marginBottom: 20 }}
            >
              💕
            </motion.div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              color: '#FFB6C1',
              lineHeight: 1.4,
              marginBottom: 10,
              fontWeight: 700,
            }}>
              One Last Question...
            </h2>

            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
              color: '#e8c4d8',
              lineHeight: 1.6,
              marginBottom: 40,
              fontWeight: 600,
            }}>
              Do you want to continue the 5th month and all the coming months with me? 🥺
            </p>

            {/* Toggle Switch */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
            }}>
              <span style={{
                color: '#8a6a7a',
                fontSize: '1rem',
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 600,
              }}>
                Hmm... 🤔
              </span>

              <motion.div
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 80,
                  height: 42,
                  borderRadius: 50,
                  background: 'rgba(255,105,180,0.15)',
                  border: '2px solid rgba(255,105,180,0.3)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                <motion.div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    boxShadow: '0 0 10px rgba(255,105,180,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                  }}
                  whileHover={{ boxShadow: '0 0 20px rgba(255,105,180,0.6)' }}
                >
                  💖
                </motion.div>
              </motion.div>

              <span style={{
                color: '#FFB6C1',
                fontSize: '1.1rem',
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
              }}>
                YES! 💕
              </span>
            </div>

            <p style={{
              color: '#6a4a5a',
              fontSize: '0.8rem',
              marginTop: 20,
              fontStyle: 'italic',
              fontFamily: "'Quicksand', sans-serif",
            }}>
              (There's only one right answer 😏)
            </p>
          </motion.div>
        )}

        {answer === 'yes' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Confetti explosion */}
            {confetti.map((c) => (
              <motion.span
                key={`confetti-${c.id}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  fontSize: `${c.size}rem`,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: c.x,
                  y: c.y,
                  scale: [0, 1.5, 1, 0],
                  opacity: [1, 1, 1, 0],
                  rotate: c.rotate,
                }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  ease: 'easeOut',
                }}
              >
                {c.emoji}
              </motion.span>
            ))}

            {/* Firework bursts */}
            {fireworks.map((f) => (
              <motion.span
                key={`fw-${f.id}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  fontSize: '2rem',
                  pointerEvents: 'none',
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: f.x,
                  y: f.y,
                  scale: [0, 2.5, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: f.delay,
                  ease: 'easeOut',
                }}
              >
                {f.emoji}
              </motion.span>
            ))}

            {/* Big YES message */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative', zIndex: 3 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', marginBottom: 10 }}
              >
                🥳
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                  background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #FF1493, #FFD700)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.4,
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                SHE SAID YES! 🎉💕
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                  color: '#e8c4d8',
                  lineHeight: 1.6,
                  maxWidth: 500,
                  margin: '0 auto',
                  marginBottom: 12,
                }}
              >
                Month 5, Month 6, Month 100...
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                  color: '#FFB6C1',
                  fontWeight: 600,
                }}
              >
                I'm not going anywhere. Forever starts now 💕
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, type: 'spring', bounce: 0.5 }}
                style={{
                  marginTop: 30,
                  fontSize: '2.5rem',
                }}
              >
                🤞💖🤞
              </motion.div>

              {/* Pulsing heart ring */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(255,105,180,0.3)',
                    '0 0 0 20px rgba(255,105,180,0)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
