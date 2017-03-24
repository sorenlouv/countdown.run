import React, {Component} from 'react';
import { padStart } from 'lodash';
import './Countdown.css';

const Button = ({onClick, icon, text}) => (
  <a className="waves-effect waves-light btn" onClick={onClick}>
    <i className="material-icons left">{icon}</i>
    {text}
  </a>
)

const StartStopButton = ({pausedAt, startedAt, onClickPause, onClickResume, onClickReset, onClickStart, onClickDismiss, timeRemaining}) => {
  if (timeRemaining === 0) {
    return <Button text="OK" icon="done" onClick={onClickDismiss}/>;
  }

  if(!startedAt) {
    return <Button text="Start" icon="play_arrow" onClick={onClickStart}/>;
  }

  return pausedAt ?
    <Button text="Resume" icon="play_arrow" onClick={onClickResume}/> :
    <Button text="Pause" icon="pause" onClick={onClickPause}/>;
};

export default class Countdown extends Component {
  componentDidMount() {
    this.sound = new Audio("https://soundbible.com/grab.php?id=1599&type=wav");
    this.sound.loop = true;

    this.intervalId = setInterval(() => {
      const timeRemaining = getTimeRemaining(this.props);
      if (timeRemaining === 0 && !this.props.didNotify) {
        this.props.onNotify();
        this.sound.play();
      } else if(this.props.isDismissed) {
        this.sound.pause();
      }

      this.forceUpdate();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.sound.pause();
  }

  render() {
    const timeRemaining = getTimeRemaining(this.props);
    const {hours, minutes, seconds} = msToTimeObject(timeRemaining);
    return <div className="countdown-container">
        <p>
          <i className="material-icons" onClick={this.props.onClickRemove}>delete</i>
          <span className="value">{hours}</span>
          <span className="unit">h</span>

          <span className="value">{minutes}</span>
          <span className="unit">m</span>

          <span className="value">{seconds}</span>
          <span className="unit">s</span>
        </p>

        <StartStopButton {...this.props} onClickDismiss={this.props.onClickDismiss} timeRemaining={timeRemaining}/>
          <Button icon="replay" text="reset" onClick={() => {
            {/*this.sound.pause();*/}
            return this.props.onClickReset();
          }}/>
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