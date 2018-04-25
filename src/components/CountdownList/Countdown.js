import React, { Component } from 'react';
import { msToTimeObject, getTimeRemaining } from '../../services/time';
import classNames from 'classnames';
import './Countdown.css';

const Button = ({ onClick, icon, text, style, className = '' }) => (
  <a
    className={`waves-effect btn-small waves-light btn ${className}`}
    style={style}
    onClick={onClick}
  >
    <i className={`material-icons ${text ? 'left' : ''}`}>{icon}</i>
    {text}
  </a>
);

const StartStopButton = ({
  pausedAt,
  startedAt,
  onClickPause,
  onClickResume,
  onClickStart,
  onClickDismiss,
  timeRemaining
}) => {
  if (timeRemaining === 0) {
    return (
      <Button
        className="green"
        text="OK"
        icon="done"
        onClick={onClickDismiss}
      />
    );
  }

  if (!startedAt) {
    return (
      <Button className="green" icon="play_arrow" onClick={onClickStart} />
    );
  }

  return pausedAt ? (
    <Button className="green" icon="play_arrow" onClick={onClickResume} />
  ) : (
    <Button className="blue" icon="pause" onClick={onClickPause} />
  );
};

export default class Countdown extends Component {
  componentDidMount() {
    this.intervalId = setInterval(() => {
      // If the countdown has completed, this should be updated in the state
      const isCompleted = getTimeRemaining(this.props) === 0;
      if (isCompleted && !this.props.isCompleted) {
        this.props.onComplete();
      }
      this.forceUpdate();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const timeRemaining = getTimeRemaining(this.props);
    const { hours, minutes, seconds } = msToTimeObject(timeRemaining);

    const TimePartial = ({ value, unit }) => {
      if (
        value === '00' &&
        (unit === 'h' || (unit === 'm' && timeRemaining < 3600 * 1000))
      ) {
        return null;
      }

      return (
        <span>
          <span className="value">{value}</span>
          <span className="unit">{unit}</span>
        </span>
      );
    };

    return (
      <div
        className={`countdown-container ${classNames({
          ringing: timeRemaining === 0
        })}`}
      >
        <div>
          <i
            className="material-icons delete-button"
            onClick={this.props.onClickRemove}
          >
            delete
          </i>
          <TimePartial value={hours} unit="h" />
          <TimePartial value={minutes} unit="m" />
          <TimePartial value={seconds} unit="s" />
        </div>

        <div className="controls">
          <StartStopButton
            {...this.props}
            onClickDismiss={this.props.onClickDismiss}
            timeRemaining={timeRemaining}
          />

          <Button
            className="grey"
            text="reset"
            icon="replay"
            onClick={this.props.onClickReset}
          />
        </div>
      </div>
    );
  }
}
