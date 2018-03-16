import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styles from "./App.module.scss";

class App extends Component {
  render() {
    return (
      <div>
        <div>counter: {this.props.counter.counter}</div>
        <button className={styles.red} onClick={this.props.counter.inc}>
          inc
        </button>
        <button className={styles.blue} onClick={this.props.counter.dec}>
          dec
        </button>
      </div>
    );
  }
}

export { App };
export default inject("counter")(observer(App));
