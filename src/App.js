import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import merge from "lodash/merge";

import Grid from "./components/Grid";
import Panel from "./components/Panel";

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
        <Panel
          toggleTimerActivity={this.toggleTimerActivity}
          isTimerActive={this.state.isTimerActive}
          submitAnswer={this.submitAnswer}
          isGameFinished={this.state.isGameFinished}
        />
      </div>
    );
  }
}

export { App };
export default inject("grid")(observer(App));
