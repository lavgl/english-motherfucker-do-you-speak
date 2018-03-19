import React from "react";
import { inject, observer } from "mobx-react";
import range from "lodash/range";

import Row from "./Row";

const Grid = props => {
  return (
    <div data-qa="grid-wrapper">
      <table>
        <tbody>
          {range(props.rows).map((row, i) => <Row key={i} rowIndex={i} />)}
        </tbody>
      </table>
    </div>
  );
};

const injector = ({ grid }) => {
  return {
    rows: grid.rows,
  };
};

export { Grid };
export default inject(injector)(observer(Grid));
