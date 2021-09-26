const Square = (props) => {
  const clickHandler = () => {
    props.onSquareClick(props.index);
  };

  const classNameValue = props.isHightLight ? 'square hight-light' : 'square'

  return (
    <button className={classNameValue} onClick={clickHandler}>
      {props.value}
    </button>
  );
};

export default Square;
