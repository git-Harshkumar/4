import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Original sections
import LoveGate from './components/LoveGate';
import Timeline from './components/Timeline';
import PhotoGallery from './components/PhotoGallery';
import VideoMemories from './components/VideoMemories';
import LoveNotes from './components/LoveNotes';
import SurpriseQuestion from './components/SurpriseQuestion';

// NEW: Global visual effects (bg, cursor trail, music, easter eggs, scroll milestones)
import GlobalEffects from './components/GlobalEffects';

// NEW: Games
import QuizGame from './components/QuizGame';
import CatchHeartsGame from './components/CatchHeartsGame';
import PuzzleGame from './components/PuzzleGame';

// NEW: Surprise Questions (scattered throughout)
import { SurpriseQ1, SurpriseQ2, SurpriseQ3, SurpriseQ4, SurpriseQ5, SurpriseQ6 } from './components/SurpriseQuestions';

// NEW: Love Letter (emotional finale)
import LoveLetter from './components/LoveLetter';

/**
 * 💕 Anniversary Website - 4 Months of Us — SUPERCHARGED EDITION
 *
 * Sections (in order):
 * 1. Love Gate - Interactive welcome with floating petals
 * 2. Our Story Timeline + Surprise Q1 (obsession slider)
 * 3. Photo Gallery + Surprise Q2 (word input)
 * 4. 🎮 Quiz Game — "How Well Do You Know Us?"
 * 5. Video Memories + Surprise Q3 (smile question)
 * 6. 🎮 Catch Hearts Game
 * 7. Love Notes + Surprise Q4 (movie title)
 * 8. 🎮 Puzzle Game
 * 9. Surprise Q5 (chat re-reads) + Surprise Q6 (luckiest)
 * 10. The Big Surprise Question
 * 11. 💌 Love Letter (hidden until surprise is answered)
 *
 * Global effects: animated bg, cursor trail, floating elements,
 * music button, easter eggs, scroll milestones
 */
function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const mainContentRef = useRef(null);

  // Smooth scroll after unlock
  useEffect(() => {
    if (isUnlocked && mainContentRef.current) {
      setTimeout(() => {
        mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [isUnlocked]);

  return (
    <div className="app">
      {/* 🌟 Global effects — always active after unlock */}
      {isUnlocked && <GlobalEffects />}

      {/* Section 1: Love Gate */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            key="love-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <LoveGate onUnlock={() => setIsUnlocked(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content — Revealed after gate unlock */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.main
            ref={mainContentRef}
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            style={{ position: 'relative', zIndex: 2 }}
          >

            {/* ═══════════ SECTION: Our Story Timeline ═══════════ */}
            <Timeline />

            {/* 💬 Surprise Q1: Obsession Slider */}
            <SurpriseQ1 />

            {/* ═══════════ SECTION: Photo Gallery ═══════════ */}
            <PhotoGallery />

            {/* 💬 Surprise Q2: Word Input */}
            <SurpriseQ2 />

            {/* ═══════════ SECTION: Game 1 — Quiz ═══════════ */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <QuizGame />
            </motion.div>

            {/* ═══════════ SECTION: Video Memories ═══════════ */}
            <VideoMemories />

            {/* 💬 Surprise Q3: Smile Question */}
            <SurpriseQ3 />

            {/* ═══════════ SECTION: Game 2 — Catch Hearts ═══════════ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.3 }}
            >
              <CatchHeartsGame />
            </motion.div>

            {/* ═══════════ SECTION: Love Notes ═══════════ */}
            <LoveNotes />

            {/* 💬 Surprise Q4: Movie Title */}
            <SurpriseQ4 />

            {/* ═══════════ SECTION: Game 3 — Puzzle ═══════════ */}
            <motion.div
              initial={{ opacity: 0, rotateX: 15 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ perspective: 1000 }}
            >
              <PuzzleGame />
            </motion.div>

            {/* 💬 Surprise Q5: Chat Re-reads */}
            <SurpriseQ5 />

            {/* 💬 Surprise Q6: Luckiest Question */}
            <SurpriseQ6 />

            {/* ═══════════ SECTION: The Big Surprise ═══════════ */}
            <SurpriseQuestion />

            {/* ═══════════ SECTION: Love Letter (hidden finale) ═══════════ */}
            {/* Reveals when user scrolls to the very bottom or after surprise */}
            <LoveLetter visible={true} />

            {/* Footer */}
            <footer style={{
              padding: '60px 20px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  color: '#FFB6C1',
                  marginBottom: 8,
                }}>
                  Made with 💖 for the most amazing person in my life
                </p>
                <p style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: '0.9rem',
                  color: '#c9a0b8',
                  fontStyle: 'italic',
                }}>
                  4 months down, forever to go... 🌸
                </p>
              </motion.div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
