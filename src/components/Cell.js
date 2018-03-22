import React from "react";
import { inject, observer } from "mobx-react";
import classnames from "classnames/bind";
import noop from "lodash/noop";

const cx = classnames.bind({});

const Cell = props => {
  const className = cx({
    active: props.isActive,
    used: props.used,
    [props.userClass]: props.used,
  });

  const handleClick =
    props.used || props.available === false ? noop : props.selectCell;

  return (
    <td
      data-qa={`grid-cell-${props.rowIndex}-${props.columnIndex}`}
      data-user={props.user}
      className={className}
    >
      <div onClick={handleClick}>A</div>
    </td>
  );
};

const injector = ({ grid }, props) => {
  const cell = {
    row: props.rowIndex,
    column: props.columnIndex,
  };

  const isActive = grid.isCellActive(cell);
  const usage = grid.getUsage(cell);
  const available = grid.isCellSelectable(cell, 0);

  const used = !!usage;
  const userClass = used ? `user_${usage.user}` : null;

  return {
    char: grid.letters[props.rowIndex][props.columnIndex],
    isActive,
    selectCell: () => grid.selectCell(props.rowIndex, props.columnIndex),
    used,
    userClass,
    available,
    user: usage && usage.user,
  };
};

export { Cell };
export default inject(injector)(observer(Cell));
