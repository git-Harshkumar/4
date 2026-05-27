import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 🎬 Your actual videos! Edit titles to match your memories
const videos = [
  {
    id: 1,
    title: 'Our First Drive 🚗',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    src: '/video1.mp4',
  },
  {
    id: 2,
    title: 'That Perfect Sunset 🌅',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    src: '/video2.mp4',
  },
  {
    id: 3,
    title: 'Dancing in the Rain 💃',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    src: '/video3.mp4',
  },
  {
    id: 4,
    title: 'Kitchen Adventures 🍳',
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
    title: 'Being Silly Together 😂',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    src: '/video6.mp4',
  },
  {
    id: 7,
    title: 'My Favorite Moments 💕',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    src: '/video7.mp4',
  },
];

const VideoMemories = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const carouselRef = useRef(null);

  const handleOpenModal = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedVideo, handleCloseModal]);

  return (
    <section className="video-section" style={{ padding: '80px 0', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
      <motion.h2
        className="gradient-text"
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
        }}
      >
        Our Video Diary 🎬
      </motion.h2>

      <motion.p
        style={{
          textAlign: 'center',
          color: '#c9a0b8',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          marginBottom: '30px',
          fontStyle: 'italic',
          padding: '0 20px',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Our favorite moments, captured forever
      </motion.p>

      <div className="video-carousel" ref={carouselRef}>
        {videos.map((video, index) => (
          <motion.div
            className="video-card"
            key={video.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15 * index,
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
            onClick={() => handleOpenModal(video)}
          >
            <div
              className="video-thumbnail"
              style={{ background: video.gradient }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
            </div>
            <p className="video-title">{video.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="video-modal"
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
              className="video-modal-content"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '800px',
                width: '90%',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'rgba(30, 10, 20, 0.9)',
                border: '1px solid rgba(255,107,157,0.2)',
                boxShadow: '0 0 60px rgba(255,105,180,0.2)',
                position: 'relative',
              }}
            >
              <button
                onClick={handleCloseModal}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,182,193,0.3)',
                  background: 'rgba(0,0,0,0.5)',
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

              {/* Actual video player — muted by default */}
              <video
                controls
                autoPlay
                muted
                loop
                playsInline
                width="100%"
                style={{ display: 'block', borderRadius: '20px 20px 0 0', background: '#000', maxHeight: '70vh' }}
                key={selectedVideo.src}
              >
                <source src={selectedVideo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

          