const Square = (props) => {
  const clickHandler = () => {
    props.onSquareClick(props.index);
  };

  return (
    <button className="square" onClick={clickHandler}>
      {props.value}
    </button>
  );
};

export default Square;
