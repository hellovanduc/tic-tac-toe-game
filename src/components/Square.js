import React from "react";

class Square extends React.Component {
  clickHandler() {
    this.props.onSquareClick(this.props.index);
  }

  render() {
    return (
      <button className="square" onClick={this.clickHandler.bind(this)}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
