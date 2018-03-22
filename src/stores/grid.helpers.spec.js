import * as helpers from "./grid.helpers";

const GRID_SIZE = { rows: 3, columns: 3 };

describe("grid helpers", () => {
  describe("findAvailableCellsForNonFirstTurn", () => {
    it("should determine nearest free cells", () => {
      const usedCells = [{ user: 0, row: 0, column: 0 }];
      const expected = [
        { row: 1, column: 1 },
        { row: 0, column: 1 },
        { row: 1, column: 0 },
      ];

      expect(
        helpers.findAvailableCellsForNonFirstTurn(usedCells, GRID_SIZE, 0),
      ).toEqual(expect.arrayContaining(expected));
    });

    it("should not include cells used by another player", () => {
      const usedCells = [
        { user: 0, row: 0, column: 0 },
        { user: 1, row: 1, column: 0 },
      ];

      const expected = [{ row: 0, column: 1 }, { row: 1, column: 1 }];

      expect(
        helpers.findAvailableCellsForNonFirstTurn(usedCells, GRID_SIZE, 0),
      ).toEqual(expect.arrayContaining(expected));
    });

    describe("for the first user step", () => {
      it("should allow to select all first-column cells for the first user", () => {
        const usedCells = [];
        const expected = [
          { row: 0, column: 0 },
          { row: 1, column: 0 },
          { row: 2, column: 0 },
        ];

        expect(
          helpers.findAvailableCellsForFirstTurn(usedCells, GRID_SIZE, 0),
        ).toEqual(expect.arrayContaining(expected));
      });

      it("should allow to select all free first-column cells", () => {
        const usedCells = [{ row: 0, column: 0, user: 0 }];
        const expected = [{ row: 1, column: 0 }, { row: 2, column: 0 }];

        expect(
          helpers.findAvailableCellsForFirstTurn(usedCells, GRID_SIZE, 1),
        ).toEqual(expect.arrayContaining(expected));
      });
    });
  });

  describe("isCellSelectable", () => {
    describe("should be selectable", () => {
      it("because at first step first column is allowed", () => {
        const usedCells = [];
        const cell = { row: 0, column: 0 };
        const user = 0;

        expect(
          helpers.isCellSelectable({
            usedCells,
            cell,
            gridSize: GRID_SIZE,
            user,
          }),
        ).toBe(true);
      });

      it("because at second+ steps nearest cells are allowed", () => {
        const usedCells = [{ row: 0, column: 0, user: 0 }];
        const cell = { row: 1, column: 1 };
        const user = 0;

        expect(
          helpers.isCellSelectable({
            usedCells,
            cell,
            gridSize: GRID_SIZE,
            user,
          }),
        ).toBe(true);
      });
    });

    describe("should be non-selectable", () => {
      it("because at first step only first column is allowed", () => {
        const usedCells = [];
        const cell = { row: 1, column: 1 };
        const user = 0;

        expect(
          helpers.isCellSelectable({
            usedCells,
            cell,
            gridSize: GRID_SIZE,
            user,
          }),
        ).toBe(false);
      });

      it("because after first step only nearest items are allowed", () => {
        const usedCells = [{ row: 0, column: 0, user: 0 }];
        const cell = { row: 0, column: 2 };
        const user = 0;

        expect(
          helpers.isCellSelectable({
            usedCells,
            cell,
            gridSize: GRID_SIZE,
            user,
          }),
        );
      });
    });
  });
});
