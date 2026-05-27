import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';

const STAR_EMOJIS = ['✨', '⭐', '💫'];
const STAR_COUNT = 35;

const TYPEWRITER_TEXT = 'Will you keep choosing me, every single day? 🥺💕';

const CONFETTI_COLORS = [
  '#FFB6C1',
  '#FF69B4',
  '#FF1493',
  '#C71585',
  '#FFD700',
  '#FFC0CB',
  '#E8C4C8',
  '#F4C2C2',
];

const HEART_EMOJIS = ['💖', '💕', '💗', '💝', '💘', '💓', '❤️', '🩷', '🤍', '💞', '🥰', '😍'];

const SurpriseQuestion = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Track window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!showQuestion) return;

    let currentIndex = 0;
    setDisplayedText('');
    setTypewriterDone(false);

    const interval = setInterval(() => {
      currentIndex += 1;
      if (currentIndex <= TYPEWRITER_TEXT.length) {
        setDisplayedText(TYPEWRITER_TEXT.slice(0, currentIndex));
      } else {
        clearInterval(interval);
        setTypewriterDone(true);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [showQuestion]);

  // Show buttons after typewriter completes
  useEffect(() => {
    if (typewriterDone) {
      const timeout = setTimeout(() => {
        setShowButtons(true);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [typewriterDone]);

  // Generate random stars
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      emoji: STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
      fontSize: `${0.6 + Math.random() * 1.2}rem`,
    }));
  }, []);

  // Generate flying hearts
  const flyingHearts = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
      startX: Math.random() * windowSize.width - windowSize.width / 2,
      endX: (Math.random() - 0.5) * 600,
      size: 1.5 + Math.random() * 2,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celebrating]);

  const handleCelebrate = useCallback(() => {
    setCelebrating(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setTimeout(() => {
      setShowQuestion(true);
    }, 500);
  }, []);

  return (
    <section className="surprise-question-section">
      {/* Background Stars / Sparkles */}
      <div className="stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star-sparkle"
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
              fontSize: star.fontSize,
              pointerEvents: 'none',
            }}
          >
            {star.emoji}
          </span>
        ))}
      </div>

      {/* First Text Line */}
      <motion.div
        className="surprise-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        onAnimationComplete={handleIntroComplete}
      >
        And now... I have one more question for you 💍
      </motion.div>

      {/* Second Text Line - Typewriter */}
      <AnimatePresence>
        {showQuestion && (
          <motion.div
            className="surprise-typewriter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="typewriter-text">
              {displayedText}
              {!typewriterDone && <span className="typewriter-cursor">|</span>}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="surprise-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.button
              className="surprise-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCelebrate}
            >
              Always &amp; Forever 💕
            </motion.button>

            <motion.button
              className="surprise-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCelebrate}
            >
              Duh, Obviously! 🌸
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {celebrating && (
          <motion.div
            className="celebration-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ReactConfetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={500}
              recycle={true}
              colors={CONFETTI_COLORS}
            />

            <motion.div
              className="celebration-message"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              I love you more than words 💖
            </motion.div>

            {/* Flying Hearts */}
            {flyingHearts.map((heart) => (
              <motion.span
                key={heart.id}
                className="flying-heart"
                initial={{
                  opacity: 1,
                  y: windowSize.height / 2,
                  x: heart.startX,
                  scale: 0,
                }}
                animate={{
                  opacity: [1, 1, 0],
                  y: [windowSize.height / 2, -100],
                  x: [heart.startX, heart.startX + heart.endX],
                  scale: [0, heart.size, heart.size * 0.5],
                }}
                transition={{
                  duration: heart.duration,
                  delay: heart.delay,
                  ease: 'easeOut',
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
                style={{
                  position: 'fixed',
                  fontSize: `${heart.size}rem`,
                  pointerEvents: 'none',
                  zIndex: 1001,
                  left: '50%',
                }}
              >
                {heart.emoji}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SurpriseQuestion;
