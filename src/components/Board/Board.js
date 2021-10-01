import Square from "./Square/Square";

const Board = (props) => {
  const squareClickHandler = (i) => {
    if (!props.isGameOver && props.squares[i] === null) {
      let newSquares = props.squares.slice();
      newSquares[i] = props.nextPlayer;

      props.onSquaresChange(newSquares, i);
    }
  };

  const renderSquare = (i) => {
    return (
      <Square
        isHightLight={
          props.hightLightSquares !== null &&
          props.hightLightSquares.includes(i)
        }
        key={i}
        value={props.squares[i]}
        index={i}
        onSquareClick={squareClickHandler}
      />
    );
  };

  // Return [0, 1, 2, ..., numberOfElement - 1]
  const createContinuousArray = (numberOfElement) => {
    return [...Array(numberOfElement).keys()];
  };

  const rows = createContinuousArray(props.numOfRows);

  const renderRow = (row) => {
    let cols = createContinuousArray(props.numOfCols);

    return (
      <div key={row} className="board-row">
        {cols.map((col) => renderSquare(col + row * props.numOfCols))}
      </div>
    );
  };

  return <div>{rows.map((row) => renderRow(row))}</div>;
};

export default Board;
