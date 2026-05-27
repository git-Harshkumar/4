import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  { id: 1, src: '/p1.jpeg', caption: 'A moment we will never forget 💕' },
  { id: 2, src: '/p2.jpeg', caption: 'Laughter that echoed forever 😊' },
  { id: 3, src: '/p3.jpeg', caption: 'Together under the same sky 🌙' },
  { id: 4, src: '/p4.jpeg', caption: 'Adventures with my favorite person 🌸' },
  { id: 5, src: '/p5.jpeg', caption: 'A stolen glance, a forever memory ✨' },
  { id: 6, src: '/p6.jpeg', caption: 'The little things matter the most 💗' },
  { id: 7, src: '/p7.jpeg', caption: 'Side by side, heart to heart 🩷' },
  { id: 8, src: '/p8.jpeg', caption: 'Our story, still being written 📖' },
  { id: 9, src: '/p9.jpeg', caption: 'You make every day brighter ☀️' },
  { id: 10, src: '/p10.jpeg', caption: 'My favorite view is you 💕' },
  { id: 11, src: '/p11.jpeg', caption: 'Forever grateful for us 🌹' },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openLightbox = (photo) => setSelectedPhoto(photo);
  const closeLightbox = () => setSelectedPhoto(null);

  const navigatePhoto = (direction) => {
    if (!selectedPhoto) return;
    const idx = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIdx = direction === 'next'
      ? (idx + 1) % photos.length
      : (idx - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[nextIdx]);
  };

  // Keyboard support
  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') navigatePhoto('prev');
      else if (e.key === 'ArrowRight') navigatePhoto('next');
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto]);

  return (
    <section style={{ padding: '80px 20px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Section heading */}
      <motion.h2
        style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          marginBottom: 12,
          background: 'linear-gradient(135deg, #ff6b9d, #c084fc, #ff6b9d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: "'Playfair Display', serif",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Our Memories 📸
      </motion.h2>

      <motion.p
        style={{
          textAlign: 'center',
          color: '#c9a0b8',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          marginBottom: 50,
          fontStyle: 'italic',
          fontFamily: "'Quicksand', sans-serif",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Every picture holds a thousand words, and every word is about you
      </motion.p>

      {/* ── Featured Photo (first photo, large) ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(255,107,157,0.2)' }}
        onClick={() => openLightbox(photos[0])}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,182,193,0.1)',
          cursor: 'pointer',
          marginBottom: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <img
          src={photos[0].src}
          alt={photos[0].caption}
          style={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <p style={{
          padding: '16px 20px',
          fontSize: '1.05rem',
          color: '#e8c4d8',
          margin: 0,
          fontStyle: 'italic',
          fontFamily: "'Quicksand', sans-serif",
          textAlign: 'center',
        }}>
          {photos[0].caption}
        </p>
      </motion.div>

      {/* ── Two-column highlight row ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
        marginBottom: 24,
      }}>
        {photos.slice(1, 3).map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(255,107,157,0.18)' }}
            onClick={() => openLightbox(photo)}
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,182,193,0.1)',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              style={{
                width: '100%',
                height: 280,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <p style={{
              padding: '12px 16px',
              fontSize: '0.9rem',
              color: '#d4a5c0',
              margin: 0,
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Three-column grid for remaining photos ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 20,
        marginBottom: 24,
      }}>
        {photos.slice(3).map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(255,107,157,0.18)' }}
            onClick={() => openLightbox(photo)}
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,182,193,0.1)',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              style={{
                width: '100%',
                height: 240,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <p style={{
              padding: '12px 16px',
              fontSize: '0.9rem',
              color: '#d4a5c0',
              margin: 0,
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ═══════════ LIGHTBOX MODAL ═══════════ */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(10, 0, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              cursor: 'pointer',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              onClick={closeLightbox}
              style={{
                position: 'absolute', top: 20, right: 24,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: '1.6rem', width: 44, height: 44, borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10001, backdropFilter: 'blur(8px)',
              }}
              whileHover={{ background: 'rgba(255,107,157,0.3)', scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>

            {/* Nav: Prev */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
              style={{
                position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: '1.5rem', width: 48, height: 48, borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10001, backdropFilter: 'blur(8px)',
              }}
              whileHover={{ background: 'rgba(255,107,157,0.25)', scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </motion.button>

            {/* Nav: Next */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
              style={{
                position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: '1.5rem', width: 48, height: 48, borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10001, backdropFilter: 'blur(8px)',
              }}
              whileHover={{ background: 'rgba(255,107,157,0.25)', scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.button>

            {/* Lightbox content */}
            <motion.div
              style={{ maxWidth: 750, width: '92%', cursor: 'default', textAlign: 'center' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              key={selectedPhoto.id}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                style={{
                  width: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: 18,
                  display: 'block',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                  background: '#0a0008',
                  margin: '0 auto',
                }}
              />

              <motion.p
                style={{
                  fontSize: '1.1rem', color: '#e8c4d8', fontStyle: 'italic',
                  margin: 0, lineHeight: 1.6, marginTop: 16,
                  fontFamily: "'Quicksand', sans-serif",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedPhoto.caption}
              </motion.p>

              <motion.p
                style={{ fontSize: '0.85rem', color: 'rgba(200,160,184,0.6)', marginTop: 8 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {photos.findIndex((p) => p.id === selectedPhoto.id) + 1} / {photos.length}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
