import Square from "./Square";

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
        key={i}
        value={props.squares[i]}
        index={i}
        onSquareClick={squareClickHandler}
      />
    );
  };

  const rows = [0, 1, 2]

  const renderRow = (row) => {
    let cols = [0, 1, 2]
    
    return <div key={row} className="board-row">
      {cols.map(col => renderSquare(col + row*3))}
    </div>;
  };

  return (
    <div>
      {rows.map(row => renderRow(row))}
    </div>
  );
};

export default Board;
