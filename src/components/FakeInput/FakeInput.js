import React from 'react';
import PropTypes from 'prop-types';
import {initPlay} from '../../services/alarm';
import classNames from 'classnames';
import keyCodes from './keyCodes.json';
import './FakeInput.css';

const FakeInput = ({isSelected, isActive, value, submitForm, onInputChange, onBackspace, onBlur, onFocus, onInputClick, incrementCaret, decrementCaret}) => {
  const getCSSClass = () => {
    return classNames({
      selected: isSelected,
      active: isActive
    });
  };

  function onKeyDown (event) {
    const hasModifierKey = event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.metaKey;

    if (hasModifierKey) {
      return;
    }

    const { keyCode } = event;
    const key = keyCodes[keyCode];
    const type = getKeyType(key);

    switch (type) {
      case 'ArrowLeft':
        incrementCaret();
        break;

      case 'ArrowRight':
        decrementCaret();
        break;

      // Hack: A "Tab" key event is send when submitting a numerical input on iOS
      case 'Tab':
        submitForm();
        break;

      case 'Enter':
        submitForm();
        break;

      case 'Backspace':
        onBackspace();
        break;

      case 'NUMBER':
        onInputChange(key);
        break;

      // All other type are not allowed
      default:
        console.log('Unknown event', event.key);
    }
    event.preventDefault();
  }

  return (
    <span onClick={() => {
      initPlay();
      onInputClick();
    }} className="fake-input">

      <input
        type="number"
        pattern="\d*"
        ref={(elm) => {
          if (elm && isSelected) {
            elm.focus();
          }
        }}
        value={value}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={(event) => { value = event.target.value; }}
      />
      <span className={`value ${getCSSClass()}`}>{value || '0'}</span>
    </span>
  );
};

FakeInput.propTypes = {
  index:  PropTypes.number
};

export default FakeInput;

function getKeyType (key) {
  switch (key) {
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

    default:
      return key;
  }
}
