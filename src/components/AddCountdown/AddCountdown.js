import React from 'react';
import classNames from 'classnames';
import FakeInput from '../FakeInput';
import './AddCountdown.css';

const AddCountdown = ({ editor, addCountdown, resetEditor }) => {
  const timeString = parseInt(
    editor.time
      .slice()
      .reverse()
      .map(t => t || 0)
      .join(''),
    10
  );

  const submitForm = () => {
    if (timeString > 0) {
      addCountdown(timeString);
      resetEditor();
    }
  };

  const onSubmitForm = event => {
    event.preventDefault();
    submitForm();
  };

  function getUnit(i) {
    switch (i) {
      case 0:
        return 's';
      case 2:
        return 'm';
      case 4:
        return 'h';
      default:
        return null;
    }
  }

  const hasInput = !!timeString;

  return (
    <form className="add-countdown" onSubmit={onSubmitForm}>
      <div
        className={`editor-container ${classNames({
          'has-focus': editor.hasFocus
        })}`}
      >
        {[5, 4, 3, 2, 1, 0].map(i => {
          const firstActive =
            6 -
            editor.time
              .slice()
              .reverse()
              .findIndex(t => t !== '');
          return (
            <span key={i}>
              <FakeInput
                inputIndex={i}
                isActive={firstActive < 7 && firstActive >= i + 1}
                isSelected={i === editor.caretIndex}
                submitForm={submitForm}
                value={editor.time[i]}
              />

              {getUnit(i) ? <span className="unit">{getUnit(i)}</span> : null}
            </span>
          );
        })}

        <a
          disabled={!hasInput}
          onClick={submitForm}
          className={`waves-effect btn-small waves-light btn green add-countdown-button`}
        >
          <i className="material-icons">add_alert</i>
        </a>
      </div>
    </form>
  );
};

export default AddCountdown;
