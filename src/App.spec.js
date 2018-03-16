import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";

it("renders without crashing", () => {
  const subject = shallow(<App counter={{ counter: 2 }} />);
  expect(subject).toHaveLength(1);
});
