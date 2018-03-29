import React from "react";
import { inject, observer } from "mobx-react";

const Panel = props => {
  const submitAnswer = () => {
    props.submitAnswer();
    props.destroyTimer();
  };

  console.log("props", props);

  return (
    <div>
      <button data-qa="start-timer" onClick={props.toggleTimer}>
        {props.isTimerActive ? "Pause" : "Start"}
      </button>
      {props.isTimerActive ? <div data-qa="timer">{props.timeLeft}</div> : null}
      <button data-qa="submit-answer" onClick={submitAnswer}>
        Correct
      </button>
      {props.isGameFinished ? (
        <div data-qa="win-label">player 1 win</div>
      ) : null}
    </div>
  );
};

const switcher = timer => {
  if (!timer.started) return "start";
  if (timer.started && !timer.paused) return "pause";
  if (timer.started && timer.paused) return "resume";
};

const injector = ({ timer }) => {
  return {
    toggleTimer: () => {
      const sw = switcher(timer);
      console.log(sw);
      switch (switcher(timer)) {
        case "start": {
          timer.startMainTimer();
          break;
        }
        case "pause": {
          timer.pause();
          break;
        }
        case "resume": {
          timer.resume();
          break;
        }
        default:
      }
    },
    isTimerActive: timer.isTimerActive,
    destroyTimer: () => timer.destroy(),
    timeLeft: timer.timeLeft,
  };
};

export { Panel };
export default inject(injector)(observer(Panel));
