import driver, { CELLS_COUNT } from "./App.driver";

describe("App", () => {
  beforeAll(async () => {
    await driver.open();
  });

  // first-iteration flow
  it("should render grid", async () => {
    expect(await driver.isGridVisible()).toBeTruthy();
  });

  it("should render grid with cells", async () => {
    expect(await driver.getCellsCount()).toBe(CELLS_COUNT);
  });

  it("should render grid with filled characters", async () => {
    expect(await driver.areAllCellsFilledWithCharacters()).toBe(true);
  });

  it("cell should not belongs to user", async () => {
    expect(await driver.doesCellBelongToUser(0, [0, 0])).toBeFalsy();
  });

  it("should allow user to select cell", async () => {
    expect(await driver.isCellActive([0, 0])).toBeFalsy();
    await driver.clickCellAt([0, 0]);
    expect(await driver.isCellActive([0, 0])).toBeTruthy();
  });

  it("should allow user to start timer", async () => {
    expect(await driver.isTimerVisible()).toBeFalsy();
    await driver.startTimer();
    expect(await driver.isTimerVisible()).toBeTruthy();
  });

  it("should allow user to submit the anwser", async () => {
    await driver.submitAnswer();
    expect(await driver.isTimerVisible()).toBeFalsy();
  });

  it("previosly selected cell should be assigned to user", async () => {
    expect(await driver.doesCellBelongToUser(0, [0, 0])).toBeTruthy();
  });

  it("user should win the game", async () => {
    expect(await driver.isWinLabelVisible()).toBeFalsy();

    const step = column => {
      return driver
        .clickCellAt([0, column + 1])
        .then(() => driver.submitAnswer());
    };

    let promise = step(-1);
    for (let i = 0; i < 9; i++) {
      promise = promise.then(() => step(i));
    }

    await promise;

    expect(await driver.isWinLabelVisible()).toBeTruthy();
  });

  // second-iteration flow
  // it("should open app and move to settings");
  // it("should select two players");
  // it("should setup game via settings");
  // it("should start game");
  // it("player 1 should win");
  // it("should start new game");
});
