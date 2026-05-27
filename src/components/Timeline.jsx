import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    month: 'Month 1',
    caption: 'The day everything changed...',
    photos: ['/p12.jpeg', '/p6.jpeg', '/p7.jpeg'],
  },
  {
    month: 'Month 2',
    caption: 'We started building our world...',
    photos: ['/p2.jpeg', '/p3.jpeg'],
  },
  {
    month: 'Month 3',
    caption: 'Growing closer with every heartbeat...',
    photos: ['/p13.jpeg', '/p4.jpeg', '/p10.jpeg'],
  },
  {
    month: 'Month 4',
    caption: 'Four months and forever to go...',
    photos: ['/p1.jpeg', '/p10.jpeg', '/p11.jpeg'],
  },
];

export default function Timeline() {
  return (
    <section
      style={{
        padding: '80px 20px',
        maxWidth: 900,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Section heading */}
      <motion.h2
        style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #ff6b9d, #c084fc, #ff6b9d)',
          backgroundSize: '200% 200%',
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
        Hello My Cutiest Chubby😁💕
      </motion.h2>

      <motion.p
        style={{
          textAlign: 'center',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          color: '#c9a0b8',
          marginBottom: '60px',
          fontStyle: 'italic',
          letterSpacing: '0.3px',
          fontFamily: "'Quicksand', sans-serif",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Every moment with you is a memory I treasure
      </motion.p>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Central vertical line */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(180deg, #ff6b9d, #c084fc, #ff6b9d)',
            transform: 'translateX(-50%)',
            borderRadius: '2px',
          }}
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Timeline items */}
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-end' : 'flex-start',
                paddingRight: isLeft ? 'calc(50% + 30px)' : '0',
                paddingLeft: isLeft ? '0' : 'calc(50% + 30px)',
                marginBottom: '60px',
                position: 'relative',
              }}
              initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Dot on the timeline */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '30px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 15px rgba(255,107,157,0.5)',
                  zIndex: 2,
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
              />

              {/* Connecting line from dot to card */}
              <div
                style={{
                  position: 'absolute',
                  top: '37px',
                  left: isLeft ? 'calc(50% - 30px)' : '50%',
                  width: '30px',
                  height: '2px',
                  background: 'rgba(255,107,157,0.3)',
                }}
              />

              {/* Timeline content card */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,107,157,0.12)',
                  borderRadius: '18px',
                  padding: '20px',
                  maxWidth: '360px',
                  width: '100%',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                {/* Photo grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: item.photos.length === 1 ? '1fr' : item.photos.length === 2 ? '1fr 1fr' : '1fr 1fr',
                  gridTemplateRows: item.photos.length > 2 ? 'auto auto' : 'auto',
                  gap: 6,
                  marginBottom: 16,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                  {item.photos.map((photo, i) => (
                    <div
                      key={i}
                      style={{
                        overflow: 'hidden',
                        borderRadius: 10,
                        height: item.photos.length > 2 && i === 0 ? 170 : 130,
                        gridColumn: item.photos.length === 3 && i === 0 ? '1 / -1' : 'auto',
                      }}
                    >
                      <img
                        src={photo}
                        alt={`${item.month} memory ${i + 1}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Month label */}
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.5px',
                    fontFamily: "'Playfair Display', serif",
                    margin: 0,
                    marginBottom: 6,
                  }}
                >
                  {item.month}
                </h3>

                {/* Caption */}
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#d4a5c0',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    margin: 0,
                    fontFamily: "'Quicksand', sans-serif",
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Ending heart */}
        <motion.div
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            paddingTop: '10px',
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          💗
        </motion.div>
      </div>
    </section>
  );
}
