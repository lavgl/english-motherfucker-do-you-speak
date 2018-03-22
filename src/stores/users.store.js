import { observable, computed } from "mobx";

class UsersStore {
  @observable users = [];
  @observable currentIndex = 0;

  @computed
  current = () => {
    return this.users[this.currentIndex];
  };
}

export { UsersStore };
export default new UsersStore();
