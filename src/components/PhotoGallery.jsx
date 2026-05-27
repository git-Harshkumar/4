import React, { useState, useEffect, useRef } from 'react';
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
];

// Varied heights for masonry feel
const heightVariants = [260, 320, 240, 300, 280, 340, 250, 310];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxRef = useRef(null);

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  const navigatePhoto = (direction) => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % photos.length;
    } else {
      nextIndex = (currentIndex - 1 + photos.length) % photos.length;
    }
    setSelectedPhoto(photos[nextIndex]);
  };

  // Keyboard support
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto('prev');
      } else if (e.key === 'ArrowRight') {
        navigatePhoto('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedPhoto]);

  return (
    <section
      style={{
        padding: '80px 20px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      {/* Section heading */}
      <motion.h2
        className="gradient-text"
        style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          marginBottom: '12px',
          background: 'linear-gradient(135deg, #ff6b9d, #c084fc, #ff6b9d)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
      >
        Our Memories 📸
      </motion.h2>

      <motion.p
        style={{
          textAlign: 'center',
          color: '#c9a0b8',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          marginBottom: '50px',
          fontStyle: 'italic',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Every picture holds a thousand words, and every word is about you
      </motion.p>

      {/* Gallery grid - masonry-style using CSS columns */}
      <div
        className="gallery-grid"
        style={{
          columns: 'auto 280px',
          columnGap: '20px',
          maxWidth: 1060,
          margin: '0 auto',
        }}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="gallery-card"
            style={{
              breakInside: 'avoid',
              marginBottom: '20px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,107,157,0.12)',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'box-shadow 0.3s ease',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: 'easeOut',
            }}
            whileHover={{
              y: -5,
              boxShadow: '0 12px 40px rgba(255,107,157,0.2)',
            }}
            onClick={() => openLightbox(photo)}
          >
            {/* Actual photo */}
            <div
              className="gallery-image"
              style={{
                width: '100%',
                height: `${heightVariants[index]}px`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Caption */}
            <p
              className="gallery-caption"
              style={{
                padding: '14px 16px',
                fontSize: '0.9rem',
                color: '#d4a5c0',
                margin: 0,
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxOpen && selectedPhoto && (
          <motion.div
            className="lightbox"
            ref={lightboxRef}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(10, 0, 15, 0.92)',
              backdropFilter: 'blur(20px)',
              cursor: 'pointer',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              // Close if clicking the overlay background (not content)
              if (e.target === e.currentTarget) {
                closeLightbox();
              }
            }}
          >
            {/* Close button */}
            <motion.button
              className="lightbox-close"
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                fontSize: '1.6rem',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10001,
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s',
              }}
              whileHover={{
                background: 'rgba(255,107,157,0.3)',
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>

            {/* Left navigation */}
            <motion.button
              className="lightbox-nav"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('prev');
              }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
                fontSize: '1.5rem',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10001,
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s',
              }}
              whileHover={{
                background: 'rgba(255,107,157,0.25)',
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </motion.button>

            {/* Right navigation */}
            <motion.button
              className="lightbox-nav"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('next');
              }}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
                fontSize: '1.5rem',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10001,
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s',
              }}
              whileHover={{
                background: 'rgba(255,107,157,0.25)',
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.button>

            {/* Lightbox content */}
            <motion.div
              style={{
                maxWidth: '700px',
                width: '90%',
                cursor: 'default',
                textAlign: 'center',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              key={selectedPhoto.id}
            >
              {/* Actual photo in lightbox */}
              <motion.div
                style={{
                  width: '100%',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                }}
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  style={{
                    width: '100%',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    display: 'block',
                    background: '#0a0008',
                    borderRadius: '18px',
                  }}
                />
              </motion.div>

              {/* Caption */}
              <motion.p
                style={{
                  fontSize: '1.1rem',
                  color: '#e8c4d8',
                  fontStyle: 'italic',
                  margin: 0,
                  lineHeight: 1.6,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedPhoto.caption}
              </motion.p>

              {/* Photo counter */}
              <motion.p
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(200,160,184,0.6)',
                  marginTop: '12px',
                }}
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
