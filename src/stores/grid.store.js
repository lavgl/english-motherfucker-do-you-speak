import { observable, action } from "mobx";

import range from "lodash/range";

import * as helpers from "./grid.helpers";

class GridStore {
  @observable rows = 10;
  @observable columns = 10;
  @observable letters = null;
  @observable activeCell = null;
  @observable cellsUsage = [];

  constructor() {
    this.randomizeGrid();
  }

  isCellActive = cellToCheck => {
    return helpers.isCellActive(this.activeCell, cellToCheck);
  };

  getUsage = cell => {
    return helpers.getCellUsage(this.cellsUsage, cell);
  };

  @action
  randomizeGrid = () => {
    this.letters = range(this.rows).map(() =>
      range(this.columns).map(helpers.randomChar),
    );
  };

  @action
  selectCell = (row, column) => {
    this.activeCell = { row, column };
  };

  @action
  saveCellUsage = cellUsage => {
    console.log("save cell usage", cellUsage);
    this.cellsUsage.push(cellUsage);
  };
}

export { GridStore };
export default new GridStore();
