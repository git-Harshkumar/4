import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    question: 'What is my most annoying habit? 😅',
    options: [
      'Overthinking everything 😅',
      'Sending 47 texts in a row 📱',
      'Eating your food 🍕',
      'All of the above 💀',
    ],
    correctIndex: 3,
    funnyReaction: 'You know me too well... guilty as charged! 💀',
  },
  {
    question: "What's my reaction when you wear that one outfit? 👀",
    options: [
      "I pretend I'm fine 😶",
      "I literally can't think straight 🫠",
      'I start planning our wedding 💒',
      'B and C 🥵',
    ],
    correctIndex: 3,
    funnyReaction: 'CAUGHT. Every. Single. Time. 🫠',
  },
  {
    question: 'What do I do when I miss you? 🥺',
    options: [
      'Stalk your Instagram 👀',
      "Text you 'hey' 47 times 📱",
      'Smell your hoodie 🧥',
      'All of the above and more 💀',
    ],
    correctIndex: 3,
    funnyReaction: "Don't judge me... you're just that amazing 🥺",
  },
  {
    question: 'My love language is? 💕',
    options: [
      'Acts of service 🤝',
      'Quality time ⏰',
      'Staring at you for too long 👁️',
      'Sending memes at 3am 📱',
    ],
    correctIndex: 2,
    funnyReaction: "It's not creepy if it's love... right? 👁️💕",
  },
  {
    question: "What's my favorite thing about you? 🥰",
    options: [
      'Your smile 😊',
      'Your laugh 😂',
      'The way you exist ✨',
      'Genuinely everything 💖',
    ],
    correctIndex: 3,
    funnyReaction: "Trick question — I can't pick just one! 💖",
  },
];

const CONFETTI_EMOJIS = ['💖', '✨', '🎉', '💕', '🥳', '💗', '🌟', '🎊', '💘', '🦋'];

const shakeKeyframes = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}
`;

function ConfettiBurst() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * 360;
        const distance = 80 + Math.random() * 160;
        const dx = Math.cos((angle * Math.PI) / 180) * distance;
        const dy = Math.sin((angle * Math.PI) / 180) * distance;
        const emoji = CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length];
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: dx,
              y: dy,
              opacity: 0,
              scale: 0.2 + Math.random() * 0.6,
              rotate: Math.random() * 720 - 360,
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.6,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              fontSize: `${1 + Math.random() * 1.2}rem`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {emoji}
          </motion.span>
        );
      })}
    </div>
  );
}

function getScoreMessage(score) {
  if (score === 5)
    return "You know me better than I know myself! We're literally soulmates 💕";
  if (score === 4)
    return 'So close! You almost know me perfectly... almost 😏';
  if (score === 3)
    return 'Not bad! But we clearly need more late-night talks 🌙';
  if (score === 2)
    return 'Hmm... we need to spend more time together 😤💕';
  return "Were you even paying attention?! 😂 Just kidding, I love you anyway 💗";
}

export default function QuizGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showReaction, setShowReaction] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleAnswer = useCallback(
    (index) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(index);

      const correct = index === QUESTIONS[currentQuestion].correctIndex;
      setIsCorrect(correct);

      if (correct) {
        setScore((prev) => prev + 1);
      } else {
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }

      setShowReaction(true);

      setTimeout(() => {
        setShowReaction(false);
        setSelectedAnswer(null);
        if (currentQuestion < QUESTIONS.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setGameComplete(true);
        }
      }, 2000);
    },
    [selectedAnswer, currentQuestion]
  );

  const resetGame = useCallback(() => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowReaction(false);
    setIsCorrect(false);
    setGameComplete(false);
    setShaking(false);
  }, []);

  const sectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    position: 'relative',
    overflow: 'hidden',
  };

  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #FF1493)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255,182,193,0.2)',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
  };

  const questionTextStyle = {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
    color: '#FFB6C1',
    marginBottom: '30px',
    textAlign: 'center',
    lineHeight: 1.4,
  };

  const optionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  };

  const optionButtonStyle = (index) => {
    let bg = 'rgba(255,105,180,0.08)';
    let borderColor = 'rgba(255,182,193,0.15)';
    let color = '#e8c4d8';

    if (selectedAnswer !== null) {
      if (index === QUESTIONS[currentQuestion].correctIndex) {
        bg = 'rgba(0,255,100,0.15)';
        borderColor = 'rgba(0,255,100,0.5)';
        color = '#90EE90';
      } else if (index === selectedAnswer && !isCorrect) {
        bg = 'rgba(255,50,50,0.15)';
        borderColor = 'rgba(255,50,50,0.5)';
        color = '#FF6B6B';
      }
    }

    return {
      padding: '16px',
      borderRadius: '16px',
      border: `1px solid ${borderColor}`,
      background: bg,
      color,
      fontSize: '1rem',
      cursor: selectedAnswer !== null ? 'default' : 'pointer',
      fontFamily: "'Quicksand', sans-serif",
      textAlign: 'center',
      outline: 'none',
      lineHeight: 1.4,
    };
  };

  // START SCREEN
  if (!gameStarted) {
    return (
      <section style={sectionStyle}>
        <style>{shakeKeyframes}</style>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            ...cardStyle,
            textAlign: 'center',
            padding: '60px 40px',
          }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '20px' }}
          >
            💕
          </motion.div>

          <h2
            style={{
              ...gradientTextStyle,
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              marginBottom: '16px',
              fontWeight: 700,
            }}
          >
            How Well Do You Know Us?
          </h2>

          <p
            style={{
              color: '#e8c4d8',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
              marginBottom: '10px',
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            5 questions. No cheating. Let's see if you really know us...
          </p>

          <p
            style={{
              color: 'rgba(255,182,193,0.6)',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '0.9rem',
              marginBottom: '36px',
            }}
          >
            (Spoiler: the answers might surprise you 😏)
          </p>

          <motion.button
            onClick={() => setGameStarted(true)}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 40px rgba(255,105,180,0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
              color: '#fff',
              border: 'none',
              padding: '18px 48px',
              borderRadius: '50px',
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(255,105,180,0.3)',
              outline: 'none',
              letterSpacing: '0.5px',
            }}
          >
            Start Quiz 🎮
          </motion.button>
        </motion.div>
      </section>
    );
  }

  // SCORE / COMPLETE SCREEN
  if (gameComplete) {
    return (
      <section style={sectionStyle}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            ...cardStyle,
            textAlign: 'center',
            padding: '60px 40px',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {score >= 4 && <ConfettiBurst />}

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 250 }}
            style={{ marginBottom: '10px' }}
          >
            <span
              style={{
                ...gradientTextStyle,
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: 800,
                display: 'inline-block',
              }}
            >
              {score}/5
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p
              style={{
                color: '#FFB6C1',
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                marginBottom: '12px',
                fontWeight: 600,
              }}
            >
              {score === 5
                ? '🏆 PERFECT SCORE! 🏆'
                : score >= 3
                ? '✨ Nice Job! ✨'
                : '💗 A For Effort! 💗'}
            </p>
            <p
              style={{
                color: '#e8c4d8',
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '440px',
                marginLeft: 'auto',
                marginRight: 'auto',
                opacity: 0.9,
              }}
            >
              {getScoreMessage(score)}
            </p>
          </motion.div>

          <motion.button
            onClick={resetGame}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 40px rgba(255,105,180,0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
              color: '#fff',
              border: 'none',
              padding: '16px 44px',
              borderRadius: '50px',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(255,105,180,0.3)',
              outline: 'none',
            }}
          >
            Play Again 🔄
          </motion.button>
        </motion.div>
      </section>
    );
  }

  // QUESTION SCREEN
  const q = QUESTIONS[currentQuestion];

  return (
    <section style={sectionStyle}>
      <style>{shakeKeyframes}</style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            ...gradientTextStyle,
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            marginBottom: '12px',
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          How Well Do You Know Us? 💕
        </motion.h2>

        {/* Progress indicator */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '30px',
            alignItems: 'center',
          }}
        >
          {QUESTIONS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === currentQuestion ? 1.3 : 1,
                background:
                  i < currentQuestion
                    ? '#FF69B4'
                    : i === currentQuestion
                    ? 'linear-gradient(135deg, #FF69B4, #FF1493)'
                    : 'rgba(255,182,193,0.2)',
              }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background:
                  i < currentQuestion
                    ? '#FF69B4'
                    : i === currentQuestion
                    ? '#FF1493'
                    : 'rgba(255,182,193,0.2)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
          <span
            style={{
              color: 'rgba(255,182,193,0.5)',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '0.85rem',
              marginLeft: '8px',
            }}
          >
            {currentQuestion + 1}/{QUESTIONS.length}
          </span>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 80, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              ...(shaking
                ? { animation: 'shake 0.5s ease-in-out' }
                : {}),
            }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              ...cardStyle,
              ...(shaking
                ? { animation: 'shake 0.5s ease-in-out' }
                : {}),
            }}
          >
            {/* Score badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '20px',
                color: 'rgba(255,182,193,0.5)',
                fontFamily: "'Quicksand', sans-serif",
                fontSize: '0.85rem',
              }}
            >
              Score: {score}
            </div>

            {/* Question text */}
            <p style={questionTextStyle}>{q.question}</p>

            {/* Options grid */}
            <div style={optionGridStyle}>
              {q.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  whileHover={
                    selectedAnswer === null
                      ? {
                          scale: 1.03,
                          borderColor: 'rgba(255,105,180,0.4)',
                        }
                      : {}
                  }
                  whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                  disabled={selectedAnswer !== null}
                  style={optionButtonStyle(idx)}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Reaction overlay */}
            <AnimatePresence>
              {showReaction && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '24px',
                    background: isCorrect
                      ? 'rgba(0,50,0,0.92)'
                      : 'rgba(60,0,0,0.92)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '30px',
                    zIndex: 10,
                  }}
                >
                  {isCorrect && <ConfettiBurst />}

                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 10,
                    }}
                    style={{
                      fontSize: 'clamp(2rem, 6vw, 3rem)',
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 800,
                      color: isCorrect ? '#90EE90' : '#FF6B6B',
                      marginBottom: '16px',
                      textShadow: isCorrect
                        ? '0 0 30px rgba(0,255,100,0.4)'
                        : '0 0 30px rgba(255,50,50,0.4)',
                    }}
                  >
                    {isCorrect ? 'YASSS 🎉' : 'WRONG 💔'}
                  </motion.span>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      color: isCorrect
                        ? 'rgba(200,255,200,0.9)'
                        : 'rgba(255,200,200,0.9)',
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                      textAlign: 'center',
                      lineHeight: 1.6,
                      maxWidth: '380px',
                    }}
                  >
                    {q.funnyReaction}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
