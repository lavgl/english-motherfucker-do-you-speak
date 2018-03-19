import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import range from "lodash/range";
import merge from "lodash/merge";
import classnames from "classnames/bind";

import styles from "./App.module.scss";

const cx = classnames.bind(styles);

const isCellActive = (activeCell, cellToCheck) => {
  if (!activeCell) return false;

  return (
    activeCell.row === cellToCheck.row &&
    activeCell.column === cellToCheck.column
  );
};

class App extends Component {
  state = {
    activeCell: null,
    isTimerActive: false,
    currentUser: 0,
    usedCells: [],
    isGameFinished: false,
  };

  selectCell = (row, column) => {
    this.setState({
      activeCell: { row, column, user: this.state.currentUser },
    });
  };

  toggleTimerActivity = () => {
    this.setState({ isTimerActive: !this.state.isTimerActive });
  };

  submitAnswer = () => {
    const usageInfo = merge({}, this.state.activeCell, {
      user: this.state.currentUser,
    });

    this.setState({
      usedCells: [...this.state.usedCells, usageInfo],
      isTimerActive: false,
      isGameFinished: this.state.activeCell.column === 9,
    });
  };

  render() {
    return (
      <div data-qa="grid-wrapper">
        <table>
          <tbody>
            {range(10).map((row, i) => {
              return (
                <tr key={i}>
                  {range(10).map((column, i) => {
                    const isActive = isCellActive(this.state.activeCell, {
                      row,
                      column,
                    });

                    const cellUsage = this.state.usedCells.find(cell => {
                      return cell.row === row && cell.column === column;
                    });

                    const used = !!cellUsage;

                    const userClass = used ? `user_${cellUsage.user}` : null;

                    const className = cx({
                      active: isActive,
                      used,
                      [userClass]: used,
                    });

                    return (
                      <td key={i} data-qa="grid-cell" className={className}>
                        <div onClick={() => this.selectCell(row, column)}>
                          A
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
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
export default inject("counter")(observer(App));
