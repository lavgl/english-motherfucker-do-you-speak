import { observable, action, computed } from "mobx";

import { Timer } from "../lib/Timer";

class TimerStore {
  @observable mainPlayerStepDuration = 3000;
  @observable subPlayersStepDuration = 5000;
  @observable timeLeft;
  @observable paused = false;
  @observable started = false;

  @action
  setTimeLeft = timeLeft => {
    console.log("set time left", timeLeft);
    this.timeLeft = timeLeft;
  };

  @action
  prepareMainTimer = () => {
    this._timer = new Timer(this.mainPlayerStepDuration)
      .onTick(this.setTimeLeft)
      .onComplete(() => {
        this.destroy();
        this.prepareSubTimer();
      });
  };

  @action
  startMainTimer = () => {
    this.prepareMainTimer();
    this.started = true;
    this._timer.start();
    this.setTimeLeft(this.mainPlayerStepDuration);
  };

  @action
  prepareSubTimer = () => {
    this._timer = new Timer(this.subPlayersStepDuration);
    this._timer.onTick(this.setTimeLeft);
  };

  @action
  startSubTimer = () => {
    this.started = true;
    this._timer.start();
  };

  @action
  pause = () => {
    this._timer.pause();
    this.paused = true;
  };

  @action
  resume = () => {
    this._timer.start();
    this.paused = false;
  };

  @action
  reset = () => {
    this._timer.reset();
    this.paused = false;
    this.started = false;
  };

  @action
  destroy = () => {
    this._timer && this._timer.reset();
    this._timer = null;
    this.timeLeft = null;
    this.paused = false;
    this.started = false;
  };

  @computed
  get isTimerActive() {
    return !!this.started;
  }
}

export { TimerStore };
export default new TimerStore();
