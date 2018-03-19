import random from "lodash/random";

const CHARACTERS = "abcdefghijklmnopqrstuwdxyz";

export const randomChar = () => CHARACTERS[random(CHARACTERS.length)];

export const isCellActive = (activeCell, cellToCheck) => {
  if (!activeCell) return false;

  return (
    activeCell.row === cellToCheck.row &&
    activeCell.column === cellToCheck.column
  );
};

export const getCellUsage = (usages, cell) => {
  return usages.find(
    usage => usage.row === cell.row && usage.column === cell.column,
  );
};
