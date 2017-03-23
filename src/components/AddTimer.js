import React, { Component } from 'react';
import { padStart } from 'lodash';
import './AddTimer.css';

class AddTimer extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onTimeboxClick = this.onTimeboxClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      inputTime: '',
      cursorIndex: 0
    };
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        if (this.state.cursorIndex < this.state.inputTime.length) {
          const nextPosition = this.state.cursorIndex + 1;
          this.setState({ cursorIndex: nextPosition });
        }
        break;
      case 'ArrowRight':
        if (this.state.cursorIndex > 0) {
          const nextPosition = this.state.cursorIndex - 1;
          this.setState({ cursorIndex: nextPosition });
        }
        break;
      default:
        return;
    }
  }

  // TODO: max length: 6
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
    const getSelectedClass = (index) => {
      const isSelected = index === this.state.cursorIndex;
      return isSelected ? 'selected' : 'a';
    };

    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          type="number"
          ref={(input) => { this.input = input; }}
          value={this.state.inputTime}
          onKeyDown={this.onKeyDown}
          onChange={this.onInputChange}
          onBlur={this.onBlur}
        />
        <p className="timer-container" onClick={this.onTimeboxClick}>
          <span className={'value ' + getSelectedClass(5)}>{hour1}</span>
          <span className={'value ' + getSelectedClass(4)}>{hour2}</span>
          <span className="unit">h</span>

          <span className={'value ' + getSelectedClass(3)}>{min1}</span>
          <span className={'value ' + getSelectedClass(2)}>{min2}</span>
          <span className="unit">m</span>

          <span className={'value ' + getSelectedClass(1)}>{sec1}</span>
          <span className={'value ' + getSelectedClass(0)}>{sec2}</span>
          <span className="unit">s</span>
        </p>
        <button type="submit">Add timer</button>
      </form>
    );
  }
}

export default AddTimer;
