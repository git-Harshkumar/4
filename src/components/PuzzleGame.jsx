import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';

const SOLVED_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const TILE_GRADIENTS = {
  1: 'linear-gradient(135deg, #FFB6C1, #FF69B4)',
  2: 'linear-gradient(135deg, #FF69B4, #FF1493)',
  3: 'linear-gradient(135deg, #FF1493, #DB7093)',
  4: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  5: 'linear-gradient(135deg, #FF85A2, #FF69B4)',
  6: 'linear-gradient(135deg, #DB7093, #C71585)',
  7: 'linear-gradient(135deg, #FFC0CB, #FFB6C1)',
  8: 'linear-gradient(135deg, #FF85A2, #FF1493)',
};

const TILE_LABELS = ['', '💕', '💗', '💖', '💝', '✨', '💞', '💘', '❤️'];

function countInversions(arr) {
  let inversions = 0;
  const filtered = arr.filter((v) => v !== 0);
  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      if (filtered[i] > filtered[j]) {
        inversions++;
      }
    }
  }
  return inversions;
}

function isSolvable(arr) {
  return countInversions(arr) % 2 === 0;
}

function shuffleTiles() {
  let tiles;
  do {
    tiles = [...SOLVED_STATE];
    // Fisher-Yates shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (!isSolvable(tiles) || arraysEqual(tiles, SOLVED_STATE));
  return tiles;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
}

function getRow(index) {
  return Math.floor(index / 3);
}

function getCol(index) {
  return index % 3;
}

function isAdjacent(indexA, indexB) {
  const rowA = getRow(indexA);
  const colA = getCol(indexA);
  const rowB = getRow(indexB);
  const colB = getCol(indexB);
  const rowDiff = Math.abs(rowA - rowB);
  const colDiff = Math.abs(colA - colB);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

export default function PuzzleGame() {
  const [tiles, setTiles] = useState(SOLVED_STATE);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [boardSize, setBoardSize] = useState(300);

  const handleTileClick = useCallback(
    (clickedIndex) => {
      if (isSolved) return;
      const emptyIndex = tiles.indexOf(0);
      if (!isAdjacent(clickedIndex, emptyIndex)) return;

      const newTiles = [...tiles];
      [newTiles[clickedIndex], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[clickedIndex],
      ];
      setTiles(newTiles);
      setMoves((prev) => prev + 1);

      if (arraysEqual(newTiles, SOLVED_STATE)) {
        setIsSolved(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    },
    [tiles, isSolved]
  );

  const handleShuffle = useCallback(() => {
    setTiles(shuffleTiles());
    setMoves(0);
    setIsSolved(false);
    setShowConfetti(false);
    setGameStarted(true);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setTiles(shuffleTiles());
    setMoves(0);
    setIsSolved(false);
    setShowConfetti(false);
  }, []);

  // Responsive board size
  const responsiveBoardSize = useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 400) return 260;
    if (typeof window !== 'undefined' && window.innerWidth < 500) return 280;
    return 300;
  }, []);

  const tileSize = useMemo(
    () => (responsiveBoardSize - 4 * 2 - 4 * 2) / 3,
    [responsiveBoardSize]
  );

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #FF69B4, #FF1493, #FFB6C1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.75rem',
    textAlign: 'center',
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px',
    padding: '2rem',
    maxWidth: '500px',
    margin: '0 auto',
    position: 'relative',
  };

  const boardStyle = {
    width: `${responsiveBoardSize}px`,
    height: `${responsiveBoardSize}px`,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '4px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '4px',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(255,105,180,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 36px',
    fontSize: '1.05rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255,105,180,0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const shuffleButtonStyle = {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: '#FFB6C1',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '50px',
    padding: '10px 28px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const confettiColors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#DB7093', '#FFD700', '#FF85A2'];

  // Start screen
  if (!gameStarted) {
    return (
      <section style={{ padding: '1rem 0' }}>
        <motion.div
          style={cardStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={headingStyle}>Our Love Story Puzzle 🧩</h2>
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '0.5rem',
            }}
          >
            Slide the tiles to put them back in order — just like how we piece together
            every beautiful moment of our story. Click a tile next to the empty space to move it!
          </p>

          {/* Preview of solved board */}
          <div style={{ ...boardStyle, margin: '1.5rem auto', opacity: 0.6, pointerEvents: 'none' }}>
            {SOLVED_STATE.map((tile, index) => (
              <div
                key={index}
                style={{
                  aspectRatio: '1',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: tile === 0 ? 'transparent' : TILE_GRADIENTS[tile],
                  fontSize: '1.2rem',
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                {tile !== 0 && (
                  <>
                    <span style={{ fontSize: '1.4rem' }}>{TILE_LABELS[tile]}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{tile}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <motion.button
              style={buttonStyle}
              onClick={handleShuffle}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 6px 30px rgba(255,105,180,0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Puzzle 🧩
            </motion.button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section style={{ padding: '1rem 0', position: 'relative' }}>
      {/* Confetti */}
      {showConfetti && (
        <ReactConfetti
          width={typeof window !== 'undefined' ? window.innerWidth : 400}
          height={typeof window !== 'undefined' ? window.innerHeight : 600}
          numberOfPieces={200}
          colors={confettiColors}
          recycle={false}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, pointerEvents: 'none' }}
        />
      )}

      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ ...headingStyle, fontSize: '1.5rem', marginBottom: '1rem' }}>
          Our Love Story Puzzle 🧩
        </h2>

        {/* Game Board */}
        <div style={boardStyle}>
          {tiles.map((tile, index) => {
            if (tile === 0) {
              return (
                <motion.div
                  key="empty"
                  layout
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                />
              );
            }

            return (
              <motion.div
                key={tile}
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={() => handleTileClick(index)}
                whileHover={!isSolved ? { scale: 1.05 } : {}}
                whileTap={!isSolved ? { scale: 0.95 } : {}}
                style={{
                  aspectRatio: '1',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: TILE_GRADIENTS[tile],
                  cursor: isSolved ? 'default' : 'pointer',
                  fontSize: '1.5rem',
                  color: '#fff',
                  fontWeight: 700,
                  boxShadow: isSolved
                    ? '0 4px 16px rgba(255,105,180,0.4)'
                    : '0 2px 8px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  userSelect: 'none',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{TILE_LABELS[tile]}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    opacity: 0.85,
                    marginTop: '2px',
                    fontWeight: 600,
                  }}
                >
                  {tile}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Move counter & shuffle button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1.25rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              color: '#FFB6C1',
              fontSize: '1.05rem',
              fontWeight: 600,
            }}
          >
            🎯 Moves: {moves}
          </span>
          {!isSolved && (
            <motion.button
              style={shuffleButtonStyle}
              onClick={handleShuffle}
              whileHover={{
                scale: 1.05,
                background: 'rgba(255,255,255,0.12)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Shuffle 🔀
            </motion.button>
          )}
        </div>

        {/* Solved screen overlay */}
        {isSolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
            style={{
              marginTop: '1.5rem',
              textAlign: 'center',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '20px',
              border: '1px solid rgba(255,105,180,0.2)',
              boxShadow: '0 8px 32px rgba(255,105,180,0.15)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
              style={{ fontSize: '3rem', marginBottom: '0.75rem' }}
            >
              🎉✨🧩
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                fontSize: '1.5rem',
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FF69B4, #FFD700, #FF1493)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem',
                lineHeight: 1.5,
              }}
            >
              Just like us — perfectly pieced together 💕
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.95rem',
                marginBottom: '1rem',
              }}
            >
              Solved in {moves} moves!
            </motion.p>

            <motion.button
              style={buttonStyle}
              onClick={handlePlayAgain}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 6px 30px rgba(255,105,180,0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              Play Again 🔄
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
