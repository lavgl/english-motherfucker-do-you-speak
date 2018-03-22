import { createDriver } from "./Grid.driver";

describe("Grid", () => {
  let driver;

  beforeEach(() => {
    driver = createDriver();
    driver.render();
  });

  describe("after start", () => {
    beforeEach(() => {
      driver = createDriver();
      driver.render();
    });

    it("should allow to click on first-column cells", () => {
      expect(driver.isCellActive(0, 0)).toBe(false);
      driver.clickCellAt(0, 0);
      expect(driver.isCellActive(0, 0)).toBe(true);
    });

    it("should disallow to click on non first-column cells", () => {
      expect(driver.isCellActive(0, 1)).toBe(false);
      driver.clickCellAt(0, 1);
      expect(driver.isCellActive(0, 1)).toBe(false);
    });
  });

  describe("after some time game in progress", () => {
    beforeEach(() => {
      driver = createDriver();
      driver.render();
      driver.clickCellAt(0, 0);
      driver.submitAnswer(0, 0, 0);
    });

    it("should allow to click on nearest cell", () => {
      expect(driver.isCellActive(0, 1)).toBe(false);
      driver.clickCellAt(0, 1);
      expect(driver.isCellActive(0, 1)).toBe(true);
    });

    it("should disallow to click on distant cells", () => {
      expect(driver.isCellActive(0, 2)).toBe(false);
      driver.clickCellAt(0, 2);
      expect(driver.isCellActive(0, 2)).toBe(false);
    });
  });
});
