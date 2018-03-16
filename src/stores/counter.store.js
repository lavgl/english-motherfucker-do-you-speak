import { observable, action } from "mobx";

export class CounterStore {
  @observable counter = 0;

  @action
  inc = () => {
    this.counter++;
  };

  @action
  dec = () => {
    this.counter--;
  };
}

export default new CounterStore();
