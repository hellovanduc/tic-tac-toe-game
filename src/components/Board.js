import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setSate] = useState({
    squareValues: Array(9).fill(null),
    nextPlayer: "X",
    winner: null,
  });

  const squareClickHandler = (i) => {
    setSate((prevState) => {
      if (prevState.squareValues[i] !== null || prevState.winner !== null) {
        return prevState;
      } else {
        let newSquareValues = prevState.squareValues.slice();
        newSquareValues[i] = prevState.nextPlayer;

        let newNextPlayer = prevState.nextPlayer === "X" ? "O" : "X";

        let newWinner = calculateWinner(newSquareValues);

        return {
          ...prevState,
          nextPlayer: newNextPlayer,
          squareValues: newSquareValues,
          winner: newWinner,
        };
      }
    });
  };

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

  const renderSquare = (i) => {
    return (
      <Square
        value={state.squareValues[i]}
        index={i}
        onSquareClick={squareClickHandler}
      />
    );
  };

  return (
    <div>
      {state.winner !== null && (
        <div className="status">Winner is {state.winner}</div>
      )}
      <div className="status">Next player: {state.nextPlayer}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
