import { Timer } from "./Timer";

jest.useFakeTimers();

describe("Timer", () => {
  let timer;
  let spyOnTick;
  let spyOnComplete;

  beforeEach(() => {
    spyOnTick = jest.fn();
    spyOnComplete = jest.fn();
    timer = new Timer(5000).onTick(spyOnTick).onComplete(spyOnComplete);
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it("should initialize and be hold after creation", () => {
    expect(timer.left).toBe(5000);
  });

  it("should move internal counter down after start", () => {
    timer.start();
    jest.advanceTimersByTime(3000);
    expect(timer.left).toBe(2000);
  });

  it("should pause moving internal counter down after pause called", () => {
    timer.start();
    jest.advanceTimersByTime(1000);

    timer.pause();
    jest.advanceTimersByTime(3000);
    expect(timer.left).toBe(4000);
  });

  it("should stop and reset timer", () => {
    timer.start();
    jest.advanceTimersByTime(2000);

    timer.reset();
    jest.advanceTimersByTime(2000);
    expect(timer.left).toBe(5000);
  });

  it("should call callback after each timer tick", () => {
    timer.start();
    jest.advanceTimersByTime(3000);
    expect(spyOnTick).toHaveBeenCalledTimes(3);
  });

  it("should call onComplete after done", () => {
    timer.start();
    jest.advanceTimersByTime(5000);
    expect(spyOnComplete).toHaveBeenCalledTimes(1);
  });
});
