import React from "react";
import { shallow } from "enzyme";

import { Cell } from "./Cell";

class CellDriver {
  subject = null;

  render = props => {
    this.subject = shallow(<Cell {...props} />);
    return this.subject;
  };

  click = () => {
    this.subject.find("div").simulate("click");
  };
}

const createDriver = () => new CellDriver();

export { CellDriver, createDriver };
