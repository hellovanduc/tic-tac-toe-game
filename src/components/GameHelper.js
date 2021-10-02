const convertSquaresToLocations = (squares, numOfRows, numOfCols) => {
  let locations = Array(numOfRows);

  for (let i = 0; i < locations.length; i++) {
    locations[i] = Array(numOfCols);
  }

  // eslint-disable-next-line
  squares.map((value, index) => {
    let location = convertSquareIndexToLocation(index, numOfCols);
    locations[location.row][location.col] = value;
  });

  return locations;
};

const calculateWinner = (
  squares,
  currentLocation,
  currentPlayer,
  numOfCols,
  numOfRows
) => {
  const locations = convertSquaresToLocations(squares, numOfRows, numOfCols);

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

  for (let i = -4; i <= 4; i++) {
    let row = currentLocation.row + i;
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

const convertSquareIndexToLocation = (squareIndex, numOfCols) => {
  let col = squareIndex % numOfCols;

  let row = 0;
  while (squareIndex - numOfCols >= 0) {
    squareIndex -= numOfCols;
    row++;
  }

  return { col, row };
};

export { convertSquareIndexToLocation, calculateWinner };
