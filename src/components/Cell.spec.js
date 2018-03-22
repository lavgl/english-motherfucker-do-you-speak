import { createDriver } from "./Cell.driver";

describe("Cell", () => {
  let spy;
  let driver;

  beforeEach(() => {
    spy = jest.fn();
    driver = createDriver();
  });

  afterEach(() => {});

  it("should be selectable if was not used in the past", () => {
    driver.render({ selectCell: spy, used: false, available: true });
    driver.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("should not be selectable if already used in past", () => {
    driver.render({ selectCell: spy, used: true, available: true });
    driver.click();
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
