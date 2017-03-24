import React, {Component} from 'react';
import { msToTimeObject, getTimeRemaining, countdownIsRinging } from '../../services/time';
import classNames from 'classnames';
import './Countdown.css';

const Button = ({onClick, icon, text, style, className = ''}) => (
  <a className={`waves-effect btn-small waves-light btn ${className}`} style={style} onClick={onClick}>
    <i className="material-icons left">{icon}</i>
    {text}
  </a>
)

const StartStopButton = ({pausedAt, startedAt, onClickPause, onClickResume, onClickStart, onClickDismiss, timeRemaining}) => {
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
      if (countdownIsRinging(this.props) && !this.props.isRinging) {
        this.props.onStartRinging();
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
    return <div className={`countdown-container ${classNames({ringing: timeRemaining === 0})}`}>
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
