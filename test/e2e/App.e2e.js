import driver from "./App.driver";

describe("App", () => {
  beforeAll(async () => {
    await driver.open();
  });

  it('should display "google" text on page', async () => {
    await expect(page).toMatch("counter");
  });
});
