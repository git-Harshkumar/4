import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 🎬 Your actual videos! Edit titles to match your memories
const videos = [
  {
    id: 1,
    title: 'Our First Date 💕',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    src: '/video1.mp4',
  },
  {
    id: 2,
    title: 'That Perfect Starting 🥰',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    src: '/video2.mp4',
  },
  {
    id: 3,
    title: 'Our first movie 🍿',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    src: '/video3.mp4',
  },
  {
    id: 4,
    title: 'Random videos🍳',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    src: '/video4.mp4',
  },
  {
    id: 5,
    title: 'Late Night Talks 🌙',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    src: '/vide05.mp4',
  },
  {
    id: 6,
    title: 'Best Kiss Together 😂',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    src: '/video6.mp4',
  },
  
];

const VideoMemories = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  const handleOpenModal = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  // When modal opens, load and play the video
  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [selectedVideo]);

  // Close modal on Escape key & lock scroll
  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedVideo, handleCloseModal]);

  return (
    <section className="video-section" style={{ padding: '80px 20px' }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
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
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Our Video Diary 🎬
      </motion.h2>

      <motion.p
        style={{
          textAlign: 'center',
          color: '#c9a0b8',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          marginBottom: '40px',
          fontStyle: 'italic',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Our favorite moments, captured forever
      </motion.p>

      {/* Video Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(255,107,157,0.2)' }}
            onClick={() => handleOpenModal(video)}
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,182,193,0.1)',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Gradient thumbnail with play button */}
            <div style={{
              width: '100%',
              height: 180,
              background: video.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                <span style={{ color: '#fff', fontSize: '1.4rem', marginLeft: 3 }}>▶</span>
              </div>
            </div>
            <p style={{
              padding: '14px 16px',
              fontSize: '0.95rem',
              color: '#FFB6C1',
              margin: 0,
              fontWeight: 600,
              fontFamily: "'Quicksand', sans-serif",
              textAlign: 'center',
            }}>
              {video.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Video Modal — uses direct src instead of <source> for better React compat */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(10, 0, 15, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 800,
                width: '92%',
                borderRadius: 20,
                overflow: 'hidden',
                background: 'rgba(15, 5, 10, 0.95)',
                border: '1px solid rgba(255,107,157,0.2)',
                boxShadow: '0 0 60px rgba(255,105,180,0.15)',
                position: 'relative',
              }}
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,182,193,0.3)',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#FFB6C1',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  backdropFilter: 'blur(10px)',
                }}
              >
                ✕
              </button>

              {/* Video player — direct src attribute for reliability */}
              <video
                ref={videoRef}
                src={selectedVideo.src}
                controls
                autoPlay
                muted
                loop
                playsInline
                style={{
                  display: 'block',
                  width: '100%',
                  maxHeight: '70vh',
                  background: '#000',
                  borderRadius: '20px 20px 0 0',
                }}
              />

              <h3 style={{
                padding: '16px 20px',
                color: '#FFB6C1',
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: 600,
                margin: 0,
                fontFamily: "'Quicksand', sans-serif",
              }}>
                {selectedVideo.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoMemories;
