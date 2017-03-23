import React, {Component} from 'react';
import { padStart } from 'lodash';
import './Countdown.css';

const notifySound = new Audio("http://soundbible.com/grab.php?id=1599&type=wav");
const playSound = () => notifySound.play();

const ControlButton = ({pausedAt, onClickPause, onClickResume, onClickReset, timeRemaining}) => {
  if (timeRemaining === 0) {
    return <button onClick={onClickReset}>Reset</button>;
  }

  return pausedAt ?
    <button onClick={onClickResume}>Resume</button> :
    <button onClick={onClickPause}>Pause</button>;
};

export default class Countdown extends Component {
  componentDidMount() {
    this.intervalId = setInterval(() => {
      const timeRemaining = getTimeRemaining(this.props);
      if (timeRemaining === 0 && !this.props.didNotify) {
        this.props.onNotify();
        playSound();
      }

      this.forceUpdate();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const timeRemaining = getTimeRemaining(this.props);
    const {hours, minutes, seconds} = msToTimeObject(timeRemaining);
    return <div className="countdown-container">
        <p>
          <span className="value">{hours}</span>
          <span className="unit">h</span>

          <span className="value">{minutes}</span>
          <span className="unit">m</span>

          <span className="value">{seconds}</span>
          <span className="unit">s</span>
        </p>

        <ControlButton {...this.props} timeRemaining={timeRemaining}/>
        <button onClick={this.props.onClickRemove}>Remove</button>
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
    const seconds = parseInt(hour1 + hour2, 10) * 3600 + parseInt(min1 + min2, 10) * 60 + parseInt(sec1 + sec2, 10);
    const ms = seconds * 1000;
    const deadlineAt = props.startedAt + ms;
    const timeRemaining = deadlineAt - (props.pausedAt || Date.now()) + props.pausedDuruation;
    if (timeRemaining < 0) {
      return 0;
    }

    return timeRemaining;
}