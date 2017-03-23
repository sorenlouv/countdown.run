import React, { Component } from 'react';
import { padStart } from 'lodash';
import classNames from 'classnames';
import './AddTimer.css';

class AddTimer extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onTimeboxClick = this.onTimeboxClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.handleArrowUp = this.handleArrowUp.bind(this);

    this.state = {
      inputTime: '',
      caretIndex: 0
    };
  }

  getCaretUnit() {

  }

  incrementHour() {

  }

  incrementMinute() {

  }

  incrementSecond() {

  }

  decrementHour() {

  }

  decrementMinute() {

  }

  decrementSecond() {

  }

  handleArrowUp() {
    const caretUnit = this.getCaretUnit();
    switch(caretUnit) {
      case 'hour':
        return this.incrementHour();
      case 'minute':
        return this.incrementMinute();
      case 'second':
        return this.incrementSecond();
    }
  }

  handleArrowDown() {
    const caretUnit = this.getCaretUnit();
    switch(caretUnit) {
      case 'hour':
        return this.decrementHour();
      case 'minute':
        return this.decrementMinute();
      case 'second':
        return this.decrementSecond();
    }
  }

  onKeyDown(event) {
    const target = event.target;

    switch(event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        setTimeout(() => {
          const caretIndex = this.state.inputTime.length - target.selectionStart;
          this.setState({ caretIndex });
        }, 0);
        break;
      case 'ArrowUp':
        this.handleArrowUp();
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.handleArrowDown();
        event.preventDefault();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case 'Backspace':
        console.log('do nothin');
        break;
      default:
        console.log(event.key);
        event.preventDefault();
    }
  }

  onInputChange(event) {
    const inputTime = event.target.value;
    const isNegative = parseInt(inputTime, 10) < 0;
    if (isNegative || inputTime.length > 6) {
      return;
    }

    this.setState({
      inputTime: event.target.value
    });
  }

  onSubmitForm(event) {
    event.preventDefault();
  }

  onBlur(event) {
  }

  onTimeboxClick() {
    this.input.focus();
  }

  getFormattedTime(time = '') {
    return padStart(time, 6, '0').split('');
  }

  render() {
    const [hour1, hour2, min1, min2, sec1, sec2] = this.getFormattedTime(this.state.inputTime);
    const getTimerValueClass = (index) => {
      return classNames({
        selected: index === this.state.caretIndex,
        active: index < this.state.inputTime.length
      });
    };

    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          type="text"
          ref={(input) => { this.input = input; }}
          value={this.state.inputTime}
          onKeyDown={this.onKeyDown}
          onChange={this.onInputChange}
          onBlur={this.onBlur}
        />
        <p className="timer-container" onClick={this.onTimeboxClick}>
          <span className={'value ' + getTimerValueClass(6)}></span>
          <span className={'value ' + getTimerValueClass(5)}>{hour1}</span>
          <span className={'value ' + getTimerValueClass(4)}>{hour2}</span>
          <span className="unit">h</span>

          <span className={'value ' + getTimerValueClass(3)}>{min1}</span>
          <span className={'value ' + getTimerValueClass(2)}>{min2}</span>
          <span className="unit">m</span>

          <span className={'value ' + getTimerValueClass(1)}>{sec1}</span>
          <span className={'value ' + getTimerValueClass(0)}>{sec2}</span>
          <span className="unit">s</span>
        </p>
        <button type="submit">Add timer</button>
      </form>
    );
  }
}

export default AddTimer;
