import React, {Component} from 'react';
import { padStart } from 'lodash';
import classNames from 'classnames';
import './Countdown.css';

const Button = ({onClick, icon, text, style, className = ''}) => (
  <a className={`waves-effect btn-small waves-light btn ${className}`} style={style} onClick={onClick}>
    <i className="material-icons left">{icon}</i>
    {text}
  </a>
)

const StartStopButton = ({pausedAt, startedAt, onClickPause, onClickResume, onClickReset, onClickStart, onClickDismiss, timeRemaining}) => {
  if (timeRemaining === 0) {
    return <Button className="green" text="OK" icon="done" onClick={onClickDismiss}/>;
  }

  if(!startedAt) {
    return <Button className="green" text="Start" icon="play_arrow" onClick={onClickStart}/>;
  }

  return pausedAt ?
    <Button className="blue" text="Resume" icon="play_arrow" onClick={onClickResume}/> :
    <Button className="blue"  text="Pause" icon="pause" onClick={onClickPause}/>;
};

export default class Countdown extends Component {
  componentDidMount() {
    this.intervalId = setInterval(() => {
      const timeRemaining = getTimeRemaining(this.props);
      if (timeRemaining === 0 && !this.props.didNotify) {
        this.props.onNotify();
        window.alarmSound.volume = 1;
      } else if (timeRemaining > 0 && window.alarmSound.volume > 0) {
        window.alarmSound.volume = 0;
      }

      this.forceUpdate();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    window.alarmSound.pause();
  }

  render() {
    const timeRemaining = getTimeRemaining(this.props);
    const {hours, minutes, seconds} = msToTimeObject(timeRemaining);
    return <div className={`countdown-container ${classNames({notify: timeRemaining === 0})}`}>
        <div>
          <i className="material-icons delete-button" onClick={this.props.onClickRemove}>delete</i>
          <span className="value">{hours}</span>
          <span className="unit">h</span>

          <span className="value">{minutes}</span>
          <span className="unit">m</span>

          <span className="value">{seconds}</span>
          <span className="unit">s</span>
        </div>

        <div className="controls">
          <StartStopButton
            {...this.props}
            onClickDismiss={this.props.onClickDismiss}
            timeRemaining={timeRemaining}/>

          <Button className="grey" icon="replay" text="reset" onClick={this.props.onClickReset}/>
        </div>
      </div>
  }
};

function msToTimeObject(duration) {
  const seconds = padStart(parseInt((duration/1000)%60, 10), 2, '0');
  const minutes = padStart(parseInt((duration/(1000*60))%60, 10), 2, '0')
  const hours = padStart(parseInt((duration/(1000*60*60))%24, 10), 2, '0')

  return {seconds, minutes, hours};
}

function getTimeRemaining(props) {
    const [hour1, hour2, min1, min2, sec1, sec2] = padStart(props.time, 6, '0').split('');
    const countdownDuration = (parseInt(hour1 + hour2, 10) * 3600 + parseInt(min1 + min2, 10) * 60 + parseInt(sec1 + sec2, 10)) * 1000;
    const isStarted = !!props.startedAt;

    // if the timer was not started, the remaining time is the countdown duration
    if(!isStarted) {
      return countdownDuration;
    }

    const deadlineAt = props.startedAt + countdownDuration;
    const timeRemaining = deadlineAt - (props.pausedAt || Date.now()) + props.pausedDuruation;
    if (timeRemaining < 0) {
      return 0;
    }

    return timeRemaining;
}