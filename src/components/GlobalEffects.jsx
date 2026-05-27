import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalEffects() {
  // ─── Cursor Sparkle Trail ───
  const mousePos = useRef({ x: 0, y: 0 });
  const [sparkleTrail, setSparkleTrail] = useState([]);

  // ─── Music Toggle ───
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // ─── Triple-Click Easter Egg ───
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  // ─── Konami Code Easter Egg ───
  const [showKonami, setShowKonami] = useState(false);
  const konamiIndexRef = useRef(0);
  const KONAMI_SEQUENCE = useMemo(
    () => ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'],
    []
  );

  // ─── Idle Surprise ───
  const [showIdleMessage, setShowIdleMessage] = useState(false);
  const idleTimerRef = useRef(null);

  // ─── Scroll Milestones ───
  const [scrollToast, setScrollToast] = useState(null);
  const [scrollHeartBurst, setScrollHeartBurst] = useState([]);
  const milestonesHit = useRef({ 25: false, 50: false, 75: false, 100: false });

  // ─────────────────────────────────────────────
  // 2. FLOATING ELEMENTS DATA (hearts, petals, stars)
  // ─────────────────────────────────────────────
  const floatingElements = useMemo(() => {
    const emojis = ['✨', '🩷', '💫', '·', '💕', '🌸'];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      fontSize: Math.random() * 14 + 8,
      opacity: Math.random() * 0.2 + 0.05,
      animationDuration: Math.random() * 25 + 18,
      animationDelay: Math.random() * 20,
    }));
  }, []);

  // ─────────────────────────────────────────────
  // 3. CURSOR SPARKLE TRAIL — mouse tracking
  // ─────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sparkle generation interval
  useEffect(() => {
    const sparkleEmojis = ['✨', '💖', '💕', '🌸'];
    const interval = setInterval(() => {
      const { x, y } = mousePos.current;
      if (x === 0 && y === 0) return;
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: x + (Math.random() * 20 - 10),
        y: y + (Math.random() * 20 - 10),
        emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)],
        fontSize: Math.random() * 8 + 10,
      };
      setSparkleTrail((prev) => [...prev.slice(-11), newSparkle]);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const removeSparkle = useCallback((id) => {
    setSparkleTrail((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // ─────────────────────────────────────────────
  // 4. MUSIC TOGGLE
  // ─────────────────────────────────────────────
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying((p) => !p);
  }, [isPlaying]);

  // ─────────────────────────────────────────────
  // 5. TRIPLE-CLICK EASTER EGG
  // ─────────────────────────────────────────────
  useEffect(() => {
    const handleClick = () => {
      clickCountRef.current += 1;

      if (clickCountRef.current === 1) {
        clickTimerRef.current = setTimeout(() => {
          clickCountRef.current = 0;
        }, 500);
      }

      if (clickCountRef.current >= 3) {
        clearTimeout(clickTimerRef.current);
        clickCountRef.current = 0;
        setShowLoveMessage(true);
        setTimeout(() => setShowLoveMessage(false), 3000);
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
      clearTimeout(clickTimerRef.current);
    };
  }, []);

  // ─────────────────────────────────────────────
  // 6. KONAMI CODE EASTER EGG
  // ─────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === KONAMI_SEQUENCE[konamiIndexRef.current]) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current === KONAMI_SEQUENCE.length) {
          konamiIndexRef.current = 0;
          setShowKonami(true);
          setTimeout(() => setShowKonami(false), 10000);
        }
      } else {
        konamiIndexRef.current = 0;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [KONAMI_SEQUENCE]);

  // Generate konami firework data
  const konamiFireworks = useMemo(() => {
    const emojis = ['🎆', '🎇', '🎆', '✨', '💖'];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      targetX: (Math.random() - 0.5) * 1000,
      targetY: (Math.random() - 0.5) * 1000,
    }));
  }, []);

  // ─────────────────────────────────────────────
  // 7. IDLE SURPRISE
  // ─────────────────────────────────────────────
  const resetIdleTimer = useCallback(() => {
    setShowIdleMessage(false);
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setShowIdleMessage(true);
      setTimeout(() => setShowIdleMessage(false), 3000);
    }, 10000);
  }, []);

  useEffect(() => {
    resetIdleTimer();
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    window.addEventListener('mousemove', resetIdleTimer);
    return () => {
      clearTimeout(idleTimerRef.current);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
    };
  }, [resetIdleTimer]);

  // ─────────────────────────────────────────────
  // 8. SCROLL MILESTONE CELEBRATIONS
  // ─────────────────────────────────────────────
  const milestoneMessages = useMemo(
    () => ({
      25: 'Your love story is just beginning... 💕',
      50: 'Halfway through — the best is yet to come 💕',
      75: 'Almost there... saving the best for last 🌸',
      100: 'You made it! Just like us — together till the end 💗',
    }),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;
      const scrollPercent = (scrollTop / docHeight) * 100;

      const thresholds = [25, 50, 75, 100];
      for (const t of thresholds) {
        if (scrollPercent >= t && !milestonesHit.current[t]) {
          milestonesHit.current[t] = true;
          setScrollToast({ id: Date.now(), message: milestoneMessages[t] });

          // Burst 8 hearts
          const hearts = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            angle: (i / 8) * Math.PI * 2,
          }));
          setScrollHeartBurst(hearts);

          setTimeout(() => {
            setScrollToast(null);
            setScrollHeartBurst([]);
          }, 3000);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [milestoneMessages]);

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <>
      {/* ── Injected Keyframes ── */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes petalFall {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateX(15px) rotate(90deg);
          }
          50% {
            transform: translateX(-15px) rotate(180deg);
          }
          75% {
            transform: translateX(10px) rotate(270deg);
          }
          100% {
            top: 105%;
            transform: translateX(-5px) rotate(360deg);
          }
        }
      `}</style>

      {/* ── 1. ANIMATED GRADIENT BACKGROUND — simple & clean ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          background: 'linear-gradient(135deg, #0d0a12, #1a0e1e, #12081a, #1e0f20, #0d0a12)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 25s ease infinite',
        }}
      />
      {/* Soft radial glow accent */}
      <div
        style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          width: '60vw',
          height: '60vw',
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,105,180,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
          pointerEvents: 'none',
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      {/* ── Slow-moving animated glow orbs ── */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: '20%',
          left: '15%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,105,180,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          bottom: '25%',
          right: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(186,85,211,0.06) 0%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <motion.div
        animate={{ x: [0, 20, -15, 0], y: [0, -20, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: '60%',
          left: '60%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,182,193,0.05) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* ── 2. FLOATING ELEMENTS ── */}
      {floatingElements.map((el) => (
        <div
          key={el.id}
          className="floating-element"
          style={{
            position: 'fixed',
            left: `${el.left}%`,
            top: '-5%',
            fontSize: `${el.fontSize}px`,
            opacity: el.opacity,
            animation: `petalFall ${el.animationDuration}s linear ${el.animationDelay}s infinite`,
            pointerEvents: 'none',
            zIndex: 1,
            userSelect: 'none',
          }}
        >
          {el.emoji}
        </div>
      ))}

      {/* ── 3. CURSOR SPARKLE TRAIL ── */}
      <AnimatePresence>
        {sparkleTrail.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 0, scale: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => removeSparkle(sparkle.id)}
            style={{
              position: 'fixed',
              left: sparkle.x,
              top: sparkle.y,
              pointerEvents: 'none',
              zIndex: 9998,
              fontSize: `${sparkle.fontSize}px`,
              userSelect: 'none',
            }}
          >
            {sparkle.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* ── 4. MUSIC TOGGLE BUTTON ── */}
      {/* 🎵 Replace src with your romantic song file, e.g., '/song.mp3' */}
      <audio ref={audioRef} loop src="" />
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 15px rgba(255,105,180,0.3)',
            '0 0 30px rgba(255,105,180,0.5)',
            '0 0 15px rgba(255,105,180,0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 9997,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,105,180,0.3), rgba(199,21,133,0.2))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,182,193,0.3)',
          color: '#FFB6C1',
          fontSize: '1.4rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
        }}
      >
        {isPlaying ? '🎵' : '🔇'}
      </motion.button>

      {/* ── 5. TRIPLE-CLICK EASTER EGG ── */}
      <AnimatePresence>
        {showLoveMessage && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(26,10,16,0.95)',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                fontFamily: "'Dancing Script', cursive",
                background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #FF1493)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
              }}
            >
              I love you 💕
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 6. KONAMI CODE EASTER EGG ── */}
      <AnimatePresence>
        {showKonami && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(26,10,16,0.95)',
              overflow: 'hidden',
            }}
          >
            {/* Firework bursts */}
            {konamiFireworks.map((fw) => (
              <motion.span
                key={fw.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: fw.targetX, y: fw.targetY, scale: [0, 3, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  fontSize: '2rem',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {fw.emoji}
              </motion.span>
            ))}

            {/* Center message */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              style={{
                textAlign: 'center',
                zIndex: 1,
                padding: '40px',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                  fontFamily: "'Dancing Script', cursive",
                  background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #FF1493, #FF69B4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}
              >
                {"You found my secret! 🎆\nThat's how much I love you — infinitely 💖"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 7. IDLE SURPRISE ── */}
      <AnimatePresence>
        {showIdleMessage && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            style={{
              position: 'fixed',
              right: 20,
              bottom: 100,
              zIndex: 9997,
              background: 'rgba(255,105,180,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,182,193,0.3)',
              padding: '16px 24px',
              borderRadius: 16,
              color: '#FFB6C1',
              fontSize: '0.95rem',
              maxWidth: 280,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            Psst... he worked really hard on this for you 🥺
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 8. SCROLL MILESTONE CELEBRATIONS ── */}
      <AnimatePresence>
        {scrollToast && (
          <motion.div
            key={scrollToast.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            style={{
              position: 'fixed',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9996,
              background: 'rgba(255,105,180,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,182,193,0.3)',
              padding: '12px 24px',
              borderRadius: 50,
              color: '#FFB6C1',
              fontSize: '0.95rem',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {scrollToast.message}

            {/* Heart burst from toast center */}
            {scrollHeartBurst.map((heart) => (
              <motion.span
                key={heart.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(heart.angle) * 80,
                  y: Math.sin(heart.angle) * 80,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  pointerEvents: 'none',
                  fontSize: '1.2rem',
                  userSelect: 'none',
                }}
              >
                💗
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
