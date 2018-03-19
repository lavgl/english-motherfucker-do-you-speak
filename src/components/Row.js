import React from "react";
import { inject, observer } from "mobx-react";
import range from "lodash/range";

import Cell from "./Cell";

const Row = props => {
  return (
    <tr>
      {range(props.columns).map((column, i) => (
        <Cell key={i} columnIndex={i} rowIndex={props.rowIndex} />
      ))}
    </tr>
  );
};

const injector = ({ grid }, props) => {
  return {
    columns: grid.columns,
  };
};

export { Row };
export default inject(injector)(observer(Row));
