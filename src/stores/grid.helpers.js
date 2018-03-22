import random from "lodash/random";
import flatMap from "lodash/fp/flatMap";
import compose from "lodash/fp/compose";
import filter from "lodash/fp/filter";
import uniqBy from "lodash/fp/uniqBy";
import range from "lodash/range";

const CHARACTERS = "abcdefghijklmnopqrstuwdxyz";

// const log = label => value => {
//   console.log(label, value);
//   return value;
// };

export const randomChar = () => CHARACTERS[random(CHARACTERS.length)];

const isTheSameCell = (cell1, cell2) =>
  cell1.row === cell2.row && cell1.column === cell2.column;
const _isTheSameCell = cell1 => cell2 => isTheSameCell(cell1, cell2);

export const isCellActive = (activeCell, cellToCheck) => {
  if (!activeCell) return false;

  return isTheSameCell(activeCell, cellToCheck);
};

export const getCellUsage = (usages, cell) => {
  return usages.find(_isTheSameCell(cell));
};

const forCurrentUser = user => cell => user === cell.user;
const toAllCellsAround = cell => {
  const { row, column } = cell;
  return [
    { row, column: column + 1 },
    { row, column: column - 1 },
    { row: row + 1, column },
    { row: row + 1, column: column + 1 },
    { row: row + 1, column: column - 1 },
    { row: row - 1, column },
    { row: row - 1, column: column + 1 },
    { row: row - 1, column: column - 1 },
  ];
};
const cellToSting = cell => `${cell.row}|${cell.column}`;
const insideGrid = gridSize => cell => {
  const { rows, columns } = gridSize;
  return (
    cell.row >= 0 &&
    cell.row < rows &&
    cell.column >= 0 &&
    cell.column < columns
  );
};
const notUsedByAnotherUsers = usedCells => cell => {
  return !usedCells.find(_isTheSameCell(cell));
};

const isFirstUserTurn = (usedCells, user) => {
  return !usedCells.find(forCurrentUser(user));
};

const getFirstColumn = rows => range(rows).map(row => ({ row, column: 0 }));

export const findAvailableCellsForNonFirstTurn = (usedCells, gridSize, user) =>
  compose([
    // log("output"),
    filter(notUsedByAnotherUsers(usedCells)),
    // log("before filtering by another user"),
    filter(insideGrid(gridSize)),
    // log("before filtering inside grid"),
    uniqBy(cellToSting),
    // log("before finding uniq"),
    flatMap(toAllCellsAround),
    // log("before toAllCellsAround"),
    filter(forCurrentUser(user)),
    // log("before finding forCurrentUser"),
  ])(usedCells);

export const findAvailableCellsForFirstTurn = (usedCells, gridSize, user) =>
  compose([filter(notUsedByAnotherUsers(usedCells)), getFirstColumn])(
    gridSize.rows,
  );

export const isCellSelectable = ({ usedCells, cell, gridSize, user }) => {
  if (isFirstUserTurn(usedCells, user) && cell.column === 0) {
    return !!findAvailableCellsForFirstTurn(usedCells, gridSize, user).find(
      _isTheSameCell(cell),
    );
  }

  return !!findAvailableCellsForNonFirstTurn(usedCells, gridSize, user).find(
    _isTheSameCell(cell),
  );
};
