import React from 'react';
import { padStart } from 'lodash';
import classNames from 'classnames';
import keyCodes from './keyCodes.json';
import {initPlay} from '../../services/alarm';
import './AddCountdown.css';

const AddCountdown = ({editor, countdowns, addCountdown, onCaretChange, onInputChange, onFocusChange, resetEditor}) => {
  let inputElm;
  const [hour1, hour2, min1, min2, sec1, sec2] = padStart(editor.time, 6, '0').split('');
  const getValueClass = (index) => {
    return classNames({
      selected: index === editor.caretIndex,
      active: index < editor.time.length
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (parseInt(editor.time, 10) > 0) {
      addCountdown(editor.time);
      resetEditor();
    }
  }

  const onKeyDown = (event) => {
    const hasModifierKey = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
    if (hasModifierKey) {
      event.preventDefault();
      return;
    }

    const { keyCode } = event;
    const type = getKeyType(keyCode);

    switch(type) {
      case 'ArrowLeft':
        if (editor.caretIndex < editor.time.length) {
          onCaretChange((editor.caretIndex + 1));
        }
        break;

      case 'ArrowRight':
        if (editor.caretIndex > 0) {
          onCaretChange((editor.caretIndex - 1));
        }
        break;

      // Hack: A "Tab" key event is send when submitting a numerical input on Android
      case 'Tab':
        submitForm(event);
        break;

      case 'NUMBER':
        if (editor.time.length === 6) {
          event.preventDefault();
        }
        break;

      case 'PASS_THROUGH':
        console.log('Allowed key', event.key);
        break;

      // All other type are not allowed
      default:
        console.log('Disallow event', type, event.key);
        event.preventDefault();
    }
  }

  return (
    <form className="add-countdown" onSubmit={submitForm}>
      <input
        tabIndex="0"
        autoFocus
        type="number"
        ref={(elm) => { inputElm = elm; }}
        value={editor.time}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onKeyDown={onKeyDown}
        onChange={(event) => onInputChange(event.target.value)}
      />

      <div className={`editor-container ${classNames({'has-focus': editor.hasFocus})}`} onClick={() => {
          initPlay();
          inputElm.focus();
        }}>
        <span className={`value ${getValueClass(6)}`}></span>
        <span className={`value ${getValueClass(5)}`}>{hour1}</span>
        <span className={`value ${getValueClass(4)}`}>{hour2}</span>
        <span className="unit">h</span>

        <span className={`value ${getValueClass(3)}`}>{min1}</span>
        <span className={`value ${getValueClass(2)}`}>{min2}</span>
        <span className="unit">m</span>

        <span className={`value ${getValueClass(1)}`}>{sec1}</span>
        <span className={`value ${getValueClass(0)}`}>{sec2}</span>
        <span className="unit">s</span>
      </div>
    </form>
  );
}

function getKeyType (keyCode) {
  const key = keyCodes[keyCode];

  switch(key) {
    // Allowed keys
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'ArrowUp':
    case 'ArrowDown':
    case 'Tab':
      return key

    // Allowed numbers
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
      return 'NUMBER';

    // Allowed stuff
    case 'Backspace':
    case 'Enter':
      return 'PASS_THROUGH';

    default:
      return 'UNKNOWN_TYPE'
  }
}

export default AddCountdown;
