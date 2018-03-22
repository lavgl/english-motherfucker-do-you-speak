const port = parseInt(process.env.PORT, 10);

export const CELLS_COUNT = 100;
const CHAR_REGEX = /[a-zA-Z]/;

const getCellSelector = (row, column) => {
  return `[data-qa=grid-cell-${row}-${column}]`;
};

const click = elem => elem.click();

class AppDriver {
  open = () => {
    return page.goto(`http://localhost:${port}`);
  };

  isGridVisible = () => {
    return page.$("[data-qa=grid-wrapper]");
  };

  getCellsCount = () => {
    return page.$$eval("[data-qa*=grid-cell]", cells => cells.length);
  };

  areAllCellsFilledWithCharacters = async () => {
    const fn = (cells, regex, cellsCount) => {
      return (
        cells.filter(cell => cell.innerHTML.search(regex)).length === cellsCount
      );
    };

    return page.$$eval("[data-qa*=grid-cell]", fn, CHAR_REGEX, CELLS_COUNT);
  };

  clickCellAt = ([row, column]) => {
    const selector = `${getCellSelector(row, column)} div`;
    return page.$eval(selector, click);
  };

  getCellAt = ([row, column]) => {
    return page.$(getCellSelector(row, column));
  };

  isCellActive = ([row, column]) => {
    const selector = `${getCellSelector(row, column)}.active`;

    return page.$(selector);
  };

  isTimerVisible = async () => {
    return page.$("[data-qa=timer]");
  };

  submitAnswer = async () => {
    return page.$eval("[data-qa=submit-answer]", click);
  };

  startTimer = () => {
    return page.$eval("[data-qa=start-timer]", click);
  };

  doesCellBelongToUser = (user, [row, column]) => {
    const selector = getCellSelector(row, column);

    return page.$eval(
      selector,
      async (element, user) => {
        return parseInt(element.getAttribute("data-user"), 10) === user;
      },
      user,
    );
  };

  isWinLabelVisible = () => {
    return page.$("[data-qa=win-label]");
  };
}

export default new AppDriver();
