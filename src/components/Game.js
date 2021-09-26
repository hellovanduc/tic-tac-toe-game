import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [state, setSate] = useState({
    history: [{ squares: Array(9).fill(null), nextPlayer: "X", winner: null }],
    move: 0,
  });

  const current = state.history[state.move];

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const squaresChangeHandler = (newSquares) => {
    setSate((prevState) => {
      let prevHistory = prevState.history[prevState.move];
      let newNextPlayer = prevHistory.nextPlayer === "X" ? "O" : "X";

      let newWinner = calculateWinner(newSquares);

      let newHistory = prevState.history.slice(0, prevState.move + 1).concat([
        {
          squares: newSquares,
          nextPlayer: newNextPlayer,
          winner: newWinner,
        },
      ]);

      let newMove = newHistory.length - 1;

      return {
        ...prevState,
        history: newHistory,
        move: newMove,
      };
    });
  };

  const status =
    current.winner !== null
      ? `Winner: ${current.winner}`
      : `Next player: ${current.nextPlayer}`;

  const goToMove = (step) => {
    setSate({
      ...state,
      move: step,
    });
  };

  const moves = state.history.map((value, step) => {
    let description = step === 0 ? "Go to game start" : `Go to move #${step}`;
    return (
      <li key={step}>
        <button onClick={() => goToMove(step)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          nextPlayer={current.nextPlayer}
          isGameOver={current.winner !== null}
          onSquaresChange={squaresChangeHandler}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
