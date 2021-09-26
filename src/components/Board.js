import React from "react";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareValues: Array(9).fill(null),
      nextPlayer: "X",
    };
  }

  squareClickHandler(i) {
    this.setState((prevState) => {
      if (prevState.squareValues[i] === null) {
        let newSquareValues = prevState.squareValues.slice();
        newSquareValues[i] = prevState.nextPlayer;

        let newNextPlayer = prevState.nextPlayer === "X" ? "O" : "X";

        return {
          ...prevState,
          squareValues: newSquareValues,
          nextPlayer: newNextPlayer,
        };
      }
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squareValues[i]}
        index={i}
        onSquareClick={this.squareClickHandler.bind(this)}
      />
    );
  }

  render() {
    const status = `Next player: ${this.state.nextPlayer}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
