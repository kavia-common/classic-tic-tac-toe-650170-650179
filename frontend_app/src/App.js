import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Minimal, modern Tic Tac Toe game with two-player local play.
 * Uses a light theme and the specified palette:
 * - primary: #4A90E2
 * - secondary: #FFFFFF
 * - accent: #F5A623
 */

// Square component
function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`ttt-square${isWinning ? ' winning' : ''}`}
      onClick={onClick}
      aria-label={`Square ${value || 'empty'}`}
    >
      {value}
    </button>
  );
}

// Board component
function Board({ squares, onSquareClick, winningLine }) {
  const renderSquare = (i) => {
    const isWinning = winningLine?.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        isWinning={!!isWinning}
      />
    );
  };

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {[0, 1, 2].map((row) => (
        <div className="ttt-row" role="row" key={row}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

// Helpers
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function calculateWinner(squares) {
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export default function App() {
  /** App state */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const status = useMemo(() => {
    const result = calculateWinner(squares);
    if (result?.winner) {
      return { text: `Player ${result.winner} wins!`, type: 'win', line: result.line };
    }
    if (squares.every(Boolean)) {
      return { text: "It's a draw!", type: 'draw', line: null };
    }
    return { text: `Player ${xIsNext ? 'X' : 'O'}'s turn`, type: 'turn', line: null };
  }, [squares, xIsNext]);

  const handleSquareClick = (index) => {
    // Ignore clicks if there's a winner or square is already filled
    if (status.type === 'win' || squares[index]) return;
    setSquares((prev) => {
      const next = prev.slice();
      next[index] = xIsNext ? 'X' : 'O';
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="app-root">
      <div className="ttt-container">
        <header className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <p
            className={`ttt-status ${status.type}`}
            role="status"
            aria-live="polite"
          >
            {status.text}
          </p>
        </header>

        <main className="ttt-main">
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winningLine={status.line}
          />
        </main>

        <footer className="ttt-footer">
          <button className="btn-restart" onClick={restartGame} aria-label="Restart game">
            Restart
          </button>
        </footer>
      </div>
    </div>
  );
}
