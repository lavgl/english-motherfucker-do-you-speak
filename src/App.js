import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./App.css";

@inject("counterStore")
@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <div>counter: {this.props.counterStore.counter}</div>
        <button onClick={this.props.counterStore.inc}>inc</button>
        <button onClick={this.props.counterStore.dec}>dec</button>
      </div>
    );
  }
}

export default App;
