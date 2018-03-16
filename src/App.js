import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>counter: {this.props.counter.counter}</div>
        <button onClick={this.props.counter.inc}>inc</button>
        <button onClick={this.props.counter.dec}>dec</button>
      </div>
    );
  }
}

export { App };
export default inject("counter")(observer(App));
