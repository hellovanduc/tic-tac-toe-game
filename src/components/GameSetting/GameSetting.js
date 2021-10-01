import { useState } from "react";
const GameSetting = (props) => {
  const [hiddenGameSetting, setHiddenGameSetting] = useState(true);

  const [enteredNumOfCols, setEnteredNumOfCols] = useState(props.currentNumOfCols);
  const [enteredNumOfRows, setEnteredNumOfRows] = useState(props.currentNumOfRows);

  const resetEnteredSizeToCurrentSize = () => {
    setEnteredNumOfCols(props.currentNumOfCols);
    setEnteredNumOfRows(props.currentNumOfRows);
  };

  const onClickSettingHandler = () => {
    setHiddenGameSetting(false);
  };

  const onClickCancelHandler = () => {
    let confirmed = window.confirm(
      "Do you really want to cancel this form, your setting will not be saved?"
    );

    if (confirmed) {
      resetEnteredSizeToCurrentSize();
      setHiddenGameSetting(true);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.saveGameSetting(+enteredNumOfRows, +enteredNumOfCols);
    setHiddenGameSetting(true);
  };

  const enteredNumOfColsChangeHandler = (event) => {
    setEnteredNumOfCols(event.target.value);
  };

  const enteredNumOfRowsChangeHandler = (event) => {
    setEnteredNumOfRows(event.target.value);
  };

  return (
    <div className="row">
      <div className="col-xs-12" hidden={!hiddenGameSetting}>
        <button className="btn btn-primary" onClick={onClickSettingHandler}>
          Setting
        </button>
      </div>
      <div className="col-xs-12" hidden={hiddenGameSetting}>
        <form onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col-xs-12">
              <label htmlFor="numOfRows">Number of rows</label>
              <input
                className="form-control"
                type="number"
                name="numOfRows"
                value={enteredNumOfCols}
                onChange={enteredNumOfColsChangeHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <label htmlFor="numOfCols">Number of columns</label>
              <input
                className="form-control"
                type="number"
                name="numOfCols"
                value={enteredNumOfRows}
                onChange={enteredNumOfRowsChangeHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <button
                className="btn btn-danger"
                type="button"
                onClick={onClickCancelHandler}
              >
                Cancel
              </button>
              <button className="btn btn-success" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameSetting;
