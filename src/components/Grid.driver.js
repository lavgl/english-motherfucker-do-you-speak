import React from "react";
import { Provider } from "mobx-react";
import { mount } from "enzyme";

import stores from "../stores";
import Grid from "./Grid";

class GridDriver {
  subject = null;

  render = props => {
    this.subject = mount(
      <Provider {...stores}>
        <Grid {...props} />
      </Provider>,
    );
    return this.subject;
  };

  getCellAt = (row, column) => {
    return this.subject.find(`[data-qa="grid-cell-${row}-${column}"]`);
  };

  clickCellAt = (row, column) => {
    const cell = this.getCellAt(row, column);
    cell.find("div").simulate("click");
  };

  isCellActive = (row, column) => {
    return this.getCellAt(row, column).hasClass("active");
  };

  setupGrid = () => {
    this.clickCellAt(0, 0);
  };

  submitAnswer = (user, row, column) => {
    stores.grid.saveCellUsage({ row, column, user });
  };
}

const createDriver = () => new GridDriver();

export { GridDriver, createDriver };
