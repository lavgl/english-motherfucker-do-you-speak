import noop from "lodash/noop";

export class Timer {
  constructor(duration, step = 1000, interval = 1000) {
    if (interval === 0) {
      throw new Error("Interval should be positive");
    }
    this.duration = duration;
    this.timerId = null;
    this.isDone = false;
    this.left = duration;
    this.step = step;
    this.interval = interval;
    this.onTickFn = noop;
    this.onCompleteFn = noop;
  }

  start() {
    this.timerId = setInterval(this.tick.bind(this), this.interval);
  }

  tick() {
    this.left = this.left - this.step;
    if (this.left <= 0) {
      this.isDone = true;
      this.onCompleteFn();
      this.reset();
    } else {
      this.onTickFn(this.left);
    }
  }

  pause() {
    clearInterval(this.timerId);
  }

  reset() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.left = this.duration;
  }

  onTick(cb) {
    this.onTickFn = cb;
    return this;
  }

  onComplete(cb) {
    this.onCompleteFn = cb;
    return this;
  }
}
