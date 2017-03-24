import React from 'react';
import { padStart } from 'lodash';
import classNames from 'classnames';
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

  const onKeyDown = (event) => {
    const { target, key } = event;
    const type = getKeyType(key);
    switch(type) {
      case 'HORISONTAL_ARROW':
        console.log('Allowed arrow', event.key);
        setTimeout(() => {
          const caretIndex = editor.time.length - target.selectionStart;
          onCaretChange(caretIndex);
        }, 0);
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
        console.log('Disallow event', event.key);
        event.preventDefault();
    }
  }

  return (
    <form className="add-countdown" onSubmit={(event) => {
        event.preventDefault();
        addCountdown(editor.time);
        resetEditor();
      }}>
      <input
        tabIndex="0"
        autoFocus
        type="text"
        ref={(elm) => { inputElm = elm; }}
        value={editor.time}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onKeyDown={onKeyDown}
        onChange={(event) => onInputChange(event.target.value)}
      />
      <div className={`editor-container ${classNames({'has-focus': editor.hasFocus})}`} onClick={() => inputElm.focus()}>
        <span className={'value ' + getValueClass(6)}></span>
        <span className={'value ' + getValueClass(5)}>{hour1}</span>
        <span className={'value ' + getValueClass(4)}>{hour2}</span>
        <span className="unit">h</span>

        <span className={'value ' + getValueClass(3)}>{min1}</span>
        <span className={'value ' + getValueClass(2)}>{min2}</span>
        <span className="unit">m</span>

        <span className={'value ' + getValueClass(1)}>{sec1}</span>
        <span className={'value ' + getValueClass(0)}>{sec2}</span>
        <span className="unit">s</span>
      </div>
    </form>
  );
}

function getKeyType (key) {
  switch(key) {
    // Allowed arrows
    case 'ArrowLeft':
    case 'ArrowRight':
      return 'HORISONTAL_ARROW'

    case 'ArrowUp':
    case 'ArrowDown':
      return 'VERTICAL_ARROW'

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
