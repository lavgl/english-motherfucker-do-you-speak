import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
  const subject = shallow(<App />);
  expect(subject).toHaveLength(1);
});
