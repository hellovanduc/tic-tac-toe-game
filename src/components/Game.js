import { useState } from "react";
import Board from "./Board/Board";
import GameSetting from "./GameSetting/GameSetting";
import GameInfor from "./GameInfor/GameInfor";

const DEFAULT_NUM_OF_COLS = 5;
const DEFAULT_NUM_OF_ROWS = 5;

const Game = () => {
  const [state, setSate] = useState({
    history: [
      {
        squares: Array(DEFAULT_NUM_OF_COLS * DEFAULT_NUM_OF_ROWS).fill(null),
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
  const [numOfRows, setNumOfRows] = useState(DEFAULT_NUM_OF_ROWS);
  const [numOfCols, setNumOfCols] = useState(DEFAULT_NUM_OF_COLS);

  const current = state.history[state.move];

  const calculateWinner = (squares, currentLocation, currentPlayer) => {
    const locations = convertSquaresToLocations(squares);

    const isValidRow = (row) => {
      return row >= 0 && row < numOfRows;
    };

    const isValidCol = (col) => {
      return col >= 0 && col < numOfCols;
    };

    const processToReturn = (hightLightLocations) => {
      let hightLightSquares = hightLightLocations.map(
        (location) => location.row * numOfCols + location.col
      );

      return [currentPlayer, hightLightSquares];
    };

    let hightLightLocations = [];

    for (
      let col = currentLocation.col - 4;
      col <= currentLocation.col + 4;
      col++
    ) {
      if (
        isValidCol(col) &&
        locations[currentLocation.row][col] === currentPlayer
      ) {
        hightLightLocations.push({ row: currentLocation.row, col: col });
        if (hightLightLocations.length === 5) {
          return processToReturn(hightLightLocations);
        }
      } else {
        hightLightLocations = [];
      }
    }

    for (
      let row = currentLocation.row - 4;
      row <= currentLocation.row + 4;
      row++
    ) {
      if (
        isValidRow(row) &&
        locations[row][currentLocation.col] === currentPlayer
      ) {
        hightLightLocations.push({ row: row, col: currentLocation.col });
        if (hightLightLocations.length === 5) {
          return processToReturn(hightLightLocations);
        }
      } else {
        hightLightLocations = [];
      }
    }

    for (let i = -4; i <= 4; i++){
      let row = currentLocation.row + i
      let col = currentLocation.col + i
      if (isValidRow(row) && isValidCol(col) && locations[row][col] === currentPlayer) {
        hightLightLocations.push({ row, col })
        if (hightLightLocations.length === 5) {
          return processToReturn(hightLightLocations);
        }
      }
      else {
        hightLightLocations = []
      }
    }

    for (let i = -4; i <= 4; i++) {
      let row = currentLocation.row - i;
      let col = currentLocation.col + i;
      if (
        isValidRow(row) &&
        isValidCol(col) &&
        locations[row][col] === currentPlayer
      ) {
        hightLightLocations.push({ row, col });
        if (hightLightLocations.length === 5) {
          return processToReturn(hightLightLocations);
        }
      } else {
        hightLightLocations = [];
      }
    }

    return [null, null];
  };

  const convertSquareIndexToLocation = (squareIndex) => {
    let col = squareIndex % numOfCols;

    let row = 0;
    while (squareIndex - numOfCols >= 0) {
      squareIndex -= numOfCols;
      row++;
    }

    return { col, row };
  };

  const convertSquaresToLocations = (squares) => {
    let locations = Array(numOfRows);

    for (let i = 0; i < locations.length; i++) {
      locations[i] = Array(numOfCols);
    }

    // eslint-disable-next-line
    squares.map((value, index) => {
      let location = convertSquareIndexToLocation(index);
      locations[location.row][location.col] = value;
    });

    return locations;
  };

  const squaresChangeHandler = (newSquares, squareIndex) => {
    setSate((prevState) => {
      let prevHistory = prevState.history[prevState.move];
      let newNextPlayer = prevHistory.nextPlayer === "X" ? "O" : "X";

      let newOutOfEmptySquares = !newSquares.includes(null);

      let newLocation = convertSquareIndexToLocation(squareIndex);

      let [newWinner, newHightLightSquares] = calculateWinner(
        newSquares,
        newLocation,
        prevHistory.nextPlayer
      );

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
        <button className="btn btn-secondary" onClick={() => goToMove(step)}>
          {description}
          {location}
        </button>
      </li>
    );
  });

  const toggleHistoryOrder = () => {
    setRevertOrder((prevValue) => !prevValue);
  };

  const onSaveGameSetting = (numOfRows, numOfCols) => {
    setNumOfCols(numOfCols);
    setNumOfRows(numOfRows);
    setSate({
      history: [
        {
          squares: Array(numOfCols * numOfRows).fill(null),
          nextPlayer: "X",
          winner: null,
          location: null,
          hightLightSquares: null,
          outOfEmptySquares: false,
        },
      ],
      move: 0,
    });
  };

  return (
    <div className="container">
      <GameSetting
        saveGameSetting={onSaveGameSetting}
        currentNumOfCols={numOfCols}
        currentNumOfRows={numOfRows}
      />
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Board
            squares={current.squares}
            nextPlayer={current.nextPlayer}
            isGameOver={current.winner !== null}
            hightLightSquares={current.hightLightSquares}
            onSquaresChange={squaresChangeHandler}
            numOfRows={numOfRows}
            numOfCols={numOfCols}
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <GameInfor
            toggleHistoryOrder={toggleHistoryOrder}
            status={getStatus()}
            revertOrder={revertOrder}
            moves={revertOrder ? moves.reverse() : moves}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
