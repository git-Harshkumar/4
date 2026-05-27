import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notes = [
  {
    id: 1,
    front: 'I love how you laugh at my terrible jokes 😄',
    back: 'And I will keep making terrible jokes just to hear it 🥰',
  },
  {
    id: 2,
    front: 'Your smile is my favorite notification 📱',
    back: 'I check for it every 5 seconds, not gonna lie 😅',
  },
  {
    id: 3,
    front: 'Every moment with you feels like magic ✨',
    back: 'Especially our late-night ice cream runs 🍦',
  },
  {
    id: 4,
    front: 'You make ordinary days extraordinary 🌟',
    back: 'Even grocery shopping becomes an adventure 🛒',
  },
  {
    id: 5,
    front: 'My heart chose you and keeps choosing you 💕',
    back: 'Every single day, without hesitation 💗',
  },
  {
    id: 6,
    front: 'You are my today and all of my tomorrows 🌸',
    back: 'And every moment in between 💝',
  },
];

const LoveNotes = () => {
  const [flippedCards, setFlippedCards] = useState([]);

  const handleFlip = (id) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const handleMouseEnter = (id) => {
    if (!flippedCards.includes(id)) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  const handleMouseLeave = (id) => {
    if (flippedCards.includes(id)) {
      setFlippedCards((prev) => prev.filter((cardId) => cardId !== id));
    }
  };

  return (
    <section className="love-notes-section">
      <motion.h2
        className="gradient-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Little Love Notes 💌
      </motion.h2>

      <motion.p
        className="love-notes-subheading"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Hover to discover hidden messages
      </motion.p>

      <div className="notes-grid">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
          >
            <div
              className={`note-card${flippedCards.includes(note.id) ? ' flipped' : ''}`}
              onMouseEnter={() => handleMouseEnter(note.id)}
              onMouseLeave={() => handleMouseLeave(note.id)}
              onClick={() => handleFlip(note.id)}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="note-card-inner">
                <div className="note-front">
                  <p className="note-text">{note.front}</p>
                </div>
                <div className="note-back">
                  <p className="note-text">{note.back}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LoveNotes;
