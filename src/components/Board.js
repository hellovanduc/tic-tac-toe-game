import Square from "./Square";

const Board = (props) => {
  const squareClickHandler = (i) => {
    if (!props.isGameOver && props.squares[i] === null) {
      let newSquares = props.squares.slice()
      newSquares[i] = props.nextPlayer;

      props.onSquaresChange(newSquares);
    }
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        index={i}
        onSquareClick={squareClickHandler}
      />
    );
  };

  return (
    <div>
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
