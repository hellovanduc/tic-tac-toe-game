import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setSate] = useState({
    squareValues: Array(9).fill(null),
    nextPlayer: "X",
  });

  const squareClickHandler = (i) => {
    setSate((prevState) => {
      if (prevState.squareValues[i] === null) {
        let newSquareValues = prevState.squareValues.slice();
        newSquareValues[i] = prevState.nextPlayer;

        let newNextPlayer  = prevState.nextPlayer === "X" ? "O" : "X"

        return {...prevState, nextPlayer: newNextPlayer, squareValues: newSquareValues};
      }
    });
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
