import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [state, setSate] = useState({
    history: [
      {
        squares: Array(9).fill(null),
        nextPlayer: "X",
        winner: null,
        location: null,
        hightLightSquares: null,
        outOfEmptySquares: false,
      },
    ],
    move: 0,
  });

  const [revertOrder, setRevertOrder] = useState(false);

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
        return [squares[a], [a, b, c]];
      }
    }

    return [null, null];
  };

  const squaresChangeHandler = (newSquares, squareIndex) => {
    setSate((prevState) => {
      let prevHistory = prevState.history[prevState.move];
      let newNextPlayer = prevHistory.nextPlayer === "X" ? "O" : "X";

      let [newWinner, newHightLightSquares] = calculateWinner(newSquares);

      let newOutOfEmptySquares = !newSquares.includes(null);

      let newLocation = convertSquareIndexToLocation(squareIndex);

      let newHistory = prevState.history.slice(0, prevState.move + 1).concat([
        {
          squares: newSquares,
          nextPlayer: newNextPlayer,
          winner: newWinner,
          location: newLocation,
          hightLightSquares: newHightLightSquares,
          outOfEmptySquares: newOutOfEmptySquares,
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

  const convertSquareIndexToLocation = (squareIndex) => {
    let col = (squareIndex % 3) + 1;

    let row = 1;
    while (squareIndex - 3 >= 0) {
      squareIndex -= 3;
      row++;
    }

    return { col, row };
  };

  const getStatus = () => {
    if (current.winner !== null) {
      return `Winner: ${current.winner}`;
    } else if (current.outOfEmptySquares) {
      return "Result: draw";
    } else {
      return `Next player: ${current.nextPlayer}`;
    }
  };

  const goToMove = (step) => {
    setSate({
      ...state,
      move: step,
    });
  };

  const moves = state.history.map((value, step) => {
    let description = step === 0 ? "Go to game start" : `Go to move #${step}`;
    let location =
      value.location === null
        ? ""
        : ` (col: ${value.location.col}, row: ${value.location.row})`;

    let classNameValue = step === state.move ? "selected" : "";

    return (
      <li key={step} className={classNameValue}>
        <button onClick={() => goToMove(step)}>
          {description}
          {location}
        </button>
      </li>
    );
  });

  const toggleHistoryOrder = () => {
    setRevertOrder((prevValue) => !prevValue);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          nextPlayer={current.nextPlayer}
          isGameOver={current.winner !== null}
          hightLightSquares={current.hightLightSquares}
          onSquaresChange={squaresChangeHandler}
        />
      </div>
      <div className="game-info">
        <div>
          <h3>{getStatus()}</h3>
        </div>
        <div>
          <button onClick={toggleHistoryOrder}>Toggle history order</button>
        </div>
        <ol>{revertOrder ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
};

export default Game;
