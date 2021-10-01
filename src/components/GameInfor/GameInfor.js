const GameInfor = (props) => {
  const onClickToggleHandler = () => {
    props.toggleHistoryOrder();
  };
  return (
    <div>
      <div>
        <h3>{props.status}</h3>
      </div>
      <div>
        <button className="btn btn-primary" onClick={onClickToggleHandler}>
          Toggle history order
        </button>
      </div>
      <ol>{props.moves}</ol>
    </div>
  );
};

export default GameInfor;
