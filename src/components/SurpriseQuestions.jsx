import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cardStyle = {
  maxWidth: 600,
  margin: '0 auto',
  padding: '40px 30px',
  borderRadius: 24,
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  border: '1px solid rgba(255,182,193,0.2)',
  boxShadow: '0 0 40px rgba(255,105,180,0.1)',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
};

const questionStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
  color: '#FFB6C1',
  marginBottom: 24,
  lineHeight: 1.5,
};

const gradientTextStyle = {
  background: 'linear-gradient(135deg, #ff6b9d, #c084fc, #ff6b9d)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const pinkBtnStyle = {
  padding: '14px 28px',
  borderRadius: 50,
  fontSize: '1rem',
  fontFamily: "'Quicksand', sans-serif",
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  background: 'linear-gradient(135deg, #FF69B4, #C71585)',
  color: '#fff',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const outlineBtnStyle = {
  ...pinkBtnStyle,
  background: 'transparent',
  border: '1px solid rgba(255,182,193,0.4)',
  color: '#FFB6C1',
};

const inputStyle = {
  width: '100%',
  maxWidth: 350,
  fontSize: '1.1rem',
  color: '#FFB6C1',
  padding: '14px 20px',
  borderRadius: 50,
  border: '1px solid rgba(255,182,193,0.3)',
  background: 'rgba(255,105,180,0.08)',
  outline: 'none',
  textAlign: 'center',
  fontFamily: "'Quicksand', sans-serif",
  boxSizing: 'border-box',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q1: Obsession Slider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function SurpriseQ1() {
  const [value, setValue] = useState(50);
  const [answered, setAnswered] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (value >= 100 && !answered) {
      setAnswered(true);
      setHearts(
        Array.from({ length: 20 }, (_, i) => ({
          id: i,
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 600,
          emoji: ['💖', '💕', '💗', '💝', '🩷'][Math.floor(Math.random() * 5)],
          delay: Math.random() * 0.3,
        }))
      );
    }
  }, [value, answered]);

  return (
    <motion.div
      style={{ padding: '40px 20px' }}
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
    >
      <div style={cardStyle}>
        <p style={questionStyle}>
          On a scale of 1 to obsessed... how much do you think about me daily? 👀
        </p>

        {!answered ? (
          <>
            <div style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, ...gradientTextStyle, marginBottom: 20 }}>
              {value}
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FF69B4', height: 8, cursor: 'pointer' }}
            />
            <p style={{ color: '#c9a0b8', fontSize: '0.85rem', marginTop: 12, fontStyle: 'italic' }}>
              {value < 30 ? 'Really? Just that? 😒' : value < 60 ? 'Getting warmer... 🤨' : value < 90 ? 'Almost there! 😏' : 'Keep going... 👀💕'}
            </p>
          </>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
            <div style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, ...gradientTextStyle, marginBottom: 12 }}>
              I KNEW IT 😏💕
            </div>
            {hearts.map((h) => (
              <motion.span
                key={h.id}
                style={{ position: 'absolute', left: '50%', top: '50%', fontSize: '1.5rem', pointerEvents: 'none' }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: h.x, y: h.y, scale: [0, 2, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 1.5, delay: h.delay, ease: 'easeOut' }}
              >
                {h.emoji}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q2: Word Input
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function SurpriseQ2() {
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [floatingWords, setFloatingWords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setSubmitted(true);
    setFloatingWords(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: 1 + Math.random() * 3,
        x: (Math.random() - 0.5) * 400,
        startY: Math.random() * 200,
        rotation: (Math.random() - 0.5) * 60,
        opacity: 0.3 + Math.random() * 0.5,
        delay: Math.random() * 1,
        duration: 3 + Math.random() * 2,
      }))
    );
  };

  return (
    <motion.div
      style={{ padding: '40px 20px' }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', bounce: 0.4 }}
    >
      <div style={cardStyle}>
        <p style={questionStyle}>
          Quick! First word that comes to mind when you think of me 🤔
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type here..."
              style={inputStyle}
            />
            <motion.button
              type="submit"
              style={pinkBtnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show me ✨
            </motion.button>
          </form>
        ) : (
          <div style={{ position: 'relative', minHeight: 200 }}>
            {floatingWords.map((w) => (
              <motion.div
                key={w.id}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  fontSize: `${w.size}rem`,
                  color: '#FFB6C1',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
                initial={{ x: w.x, y: w.startY, opacity: w.opacity, rotate: w.rotation, scale: 0 }}
                animate={{ y: w.startY - 300, opacity: 0, scale: 1 }}
                transition={{ duration: w.duration, delay: w.delay, ease: 'easeOut' }}
              >
                {inputValue}
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              style={{ color: '#c9a0b8', fontStyle: 'italic', marginTop: 160 }}
            >
              That's beautiful... just like you 💕
            </motion.p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q3: Smile Question
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function SurpriseQ3() {
  const [answered, setAnswered] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Your smile says otherwise 💕';

  useEffect(() => {
    if (!answered) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [answered]);

  return (
    <motion.div
      style={{ padding: '40px 20px' }}
      initial={{ opacity: 0, rotateY: 90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div style={cardStyle}>
        <p style={questionStyle}>
          Admit it. You smiled the first time I texted you, didn't you? 😏
        </p>

        {!answered ? (
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button style={pinkBtnStyle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setAnswered(true)}>
              Obviously 😊
            </motion.button>
            <motion.button style={outlineBtnStyle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setAnswered(true)}>
              No way 🙄
            </motion.button>
          </div>
        ) : (
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 2.5, 1.5] }}
              transition={{ duration: 0.8, times: [0, 0.5, 1], type: 'spring' }}
              style={{ fontSize: '4rem', marginBottom: 16 }}
            >
              👀
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontSize: '1.3rem', color: '#FFB6C1', fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}
            >
              {typedText}
              <motion.span
                style={{ display: 'inline-block', width: 2, height: '1.1em', background: '#FF69B4', marginLeft: 2, verticalAlign: 'text-bottom' }}
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.49, 0.5, 1] }}
              />
            </motion.p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q4: Movie Title
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function SurpriseQ4() {
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setSubmitted(true);
  };

  return (
    <motion.div
      style={{ padding: '40px 20px' }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', bounce: 0.3 }}
    >
      <div style={cardStyle}>
        <p style={questionStyle}>
          If our relationship was a movie, it would be called...? 🎬
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter the movie title..."
              style={inputStyle}
            />
            <motion.button type="submit" style={pinkBtnStyle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Premiere Night 🎬
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            style={{
              maxWidth: 350,
              margin: '20px auto',
              padding: '40px 30px',
              background: 'linear-gradient(135deg, #1a0a10, #2d0a1f)',
              borderRadius: 20,
              border: '2px solid rgba(255,105,180,0.4)',
              position: 'relative',
            }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(255,105,180,0.2), 0 0 60px rgba(199,21,133,0.1)',
                  '0 0 60px rgba(255,105,180,0.4), 0 0 100px rgba(199,21,133,0.2)',
                  '0 0 30px rgba(255,105,180,0.2), 0 0 60px rgba(199,21,133,0.1)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none' }}
            />
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              background: 'linear-gradient(135deg, #FFB6C1, #FFD700, #FF69B4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 10,
              lineHeight: 1.3,
            }}>
              {inputValue}
            </h3>
            <p style={{ color: '#c9a0b8', fontFamily: "'Quicksand', sans-serif", fontSize: '1.1rem', marginBottom: 16 }}>
              A Love Story ✨
            </p>
            <p style={{ color: '#8a6a7a', fontStyle: 'italic', fontSize: '0.85rem' }}>
              ⭐⭐⭐⭐⭐ "The greatest love story ever told"
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q5: Chat Re-reads
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function SurpriseQ5() {
  const [selectedOption, setSelectedOption] = useState(null);
  const reactions = [
    'Liar liar pants on fire 🔥😂',
    "Only a few? I'm watching you 👀",
    "Now THAT'S the honesty I signed up for 💀💕",
    "SAME. We're so perfect for each other 🥰",
  ];
  const options = ['Once 😇', 'A few times 😅', 'I lost count 💀', "It's my daily routine 🥰"];

  return (
    <motion.div
      style={{ padding: '40px 20px' }}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', bounce: 0.3 }}
    >
      <div style={cardStyle}>
        <p style={questionStyle}>
          How many times have you re-read our old chats? 👀
        </p>

        {selectedOption === null ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {options.map((opt, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedOption(i)}
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 16,
                  border: '1px solid rgba(255,182,193,0.15)',
                  background: 'rgba(255,105,180,0.08)',
                  color: '#e8c4d8',
                  fontSize: '1rem',
                  fontFamily: "'Quicksand', sans-serif",
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,105,180,0.4)', background: 'rgba(255,105,180,0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <p style={{ fontSize: '1.3rem', fontWeight: 600, ...gradientTextStyle, lineHeight: 1.5 }}>
              {reactions[selectedOption]}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q6: Luckiest Question
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function SurpriseQ6() {
  const [answered, setAnswered] = useState(false);
  const [crowns, setCrowns] = useState([]);

  const handleClick = () => {
    setAnswered(true);
    setCrowns(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        size: 1 + Math.random() * 1.5,
      }))
    );
  };

  return (
    <motion.div
      style={{ padding: '40px 20px' }}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', bounce: 0.4 }}
    >
      <div style={{ ...cardStyle, overflow: 'visible', position: 'relative' }}>
        <p style={questionStyle}>
          Final question — are you the luckiest girl alive or THE luckiest girl alive? 😏
        </p>

        {!answered ? (
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button style={pinkBtnStyle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleClick}>
              Luckiest 🌸
            </motion.button>
            <motion.button style={outlineBtnStyle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleClick}>
              THE Luckiest 👑
            </motion.button>
          </div>
        ) : (
          <div style={{ position: 'relative', minHeight: 200 }}>
            {/* Falling crowns */}
            {crowns.map((c) => (
              <motion.span
                key={c.id}
                style={{
                  position: 'absolute',
                  left: `${c.x}%`,
                  top: -40,
                  fontSize: `${c.size}rem`,
                  pointerEvents: 'none',
                }}
                initial={{ y: -40, opacity: 1 }}
                animate={{ y: 400, opacity: [1, 1, 0] }}
                transition={{ duration: c.duration, delay: c.delay, ease: 'easeIn' }}
              >
                👑
              </motion.span>
            ))}

            {/* Trumpets */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontSize: '2.5rem', marginBottom: 20 }}
            >
              🎺🎺🎺
            </motion.div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                ...gradientTextStyle,
                lineHeight: 1.5,
                fontWeight: 600,
              }}
            >
              And I'm the luckiest guy because I have YOU 💕
            </motion.p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
