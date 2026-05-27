import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timelineData = [
  {
    month: 'Month 1',
    caption: 'The day everything changed...',
    // 🖼️ Replace with actual photo URL
    image: null,
  },
  {
    month: 'Month 2',
    caption: 'We started building our world...',
    // 🖼️ Replace with actual photo URL
    image: null,
  },
  {
    month: 'Month 3',
    caption: 'Growing closer with every heartbeat...',
    // 🖼️ Replace with actual photo URL
    image: null,
  },
  {
    month: 'Month 4',
    caption: 'Four months and forever to go...',
    // 🖼️ Replace with actual photo URL
    image: null,
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
        className="gradient-text"
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
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
      >
        Our Story 💕
      </motion.h2>

      <motion.p
        style={{
          textAlign: 'center',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          color: '#c9a0b8',
          marginBottom: '60px',
          fontStyle: 'italic',
          letterSpacing: '0.3px',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Every moment with you is a memory I treasure
      </motion.p>

      {/* Timeline vertical line */}
      <div
        style={{
          position: 'relative',
        }}
      >
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
              className={`timeline-item ${isLeft ? 'left' : 'right'}`}
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
                className="timeline-content"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,107,157,0.15)',
                  borderRadius: '18px',
                  padding: '24px',
                  maxWidth: '340px',
                  width: '100%',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Image placeholder */}
                <div
                  className="timeline-image"
                  style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(192,132,252,0.1))',
                    border: '1px dashed rgba(255,107,157,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    color: '#c9a0b8',
                    marginBottom: '18px',
                    overflow: 'hidden',
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.month}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                      }}
                    />
                  ) : (
                    /* 🖼️ Replace with actual photo URL */
                    <span>📷 Your Photo Here</span>
                  )}
                </div>

                {/* Month label */}
                <h3
                  className="timeline-month"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '8px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {item.month}
                </h3>

                {/* Caption */}
                <p
                  className="timeline-caption"
                  style={{
                    fontSize: '0.95rem',
                    color: '#d4a5c0',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    margin: 0,
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
