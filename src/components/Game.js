import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [state, setSate] = useState({
    history: [{ squares: Array(9).fill(null) }],
    nextPlayer: "X",
    winner: null,
  });

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
      let newHistory = prevState.history.slice();
      newHistory.push({ squares: newSquares });

      let newNextPlayer = prevState.nextPlayer === "X" ? "O" : "X";

      let newWinner = calculateWinner(newSquares);

      return {
        ...prevState,
        history: newHistory,
        nextPlayer: newNextPlayer,
        winner: newWinner,
      };
    });
  };
  const status =
    state.winner !== null
      ? `Winner: ${state.winner}`
      : `Next player: ${state.nextPlayer}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.history.at(-1).squares}
          nextPlayer={state.nextPlayer}
          isGameOver={state.winner !== null}
          onSquaresChange={squaresChangeHandler}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
