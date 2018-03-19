import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import merge from "lodash/merge";

import Grid from "./components/Grid";

class App extends Component {
  state = {
    activeCell: null,
    isTimerActive: false,
    currentUser: 0,
    usedCells: [],
    isGameFinished: false,
  };

  toggleTimerActivity = () => {
    this.setState({ isTimerActive: !this.state.isTimerActive });
  };

  submitAnswer = () => {
    const usageInfo = merge({}, this.props.grid.activeCell, {
      user: this.state.currentUser,
    });

    this.props.grid.saveCellUsage(usageInfo);

    this.setState({
      isTimerActive: false,
      isGameFinished:
        this.props.grid.activeCell && this.props.grid.activeCell.column === 9,
    });
  };

  render() {
    return (
      <div>
        <Grid />
        <button data-qa="start-timer" onClick={this.toggleTimerActivity}>
          Start
        </button>
        {this.state.isTimerActive ? <div data-qa="timer">0:15</div> : null}
        <button data-qa="submit-answer" onClick={this.submitAnswer}>
          Correct
        </button>
        {this.state.isGameFinished ? (
          <div data-qa="win-label">player 1 win</div>
        ) : null}
      </div>
    );
  }
}

export { App };
export default inject("grid")(observer(App));
