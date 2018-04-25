import React from 'react';
import Countdown from './Countdown';
import './CountdownList.css';

const CountdownList = ({
  countdowns,
  onClickRemove,
  onClickPause,
  onClickResume,
  onClickStart,
  onClickReset,
  onClickDismiss,
  onComplete
}) => {
  if (countdowns.length === 0) {
    return (
      <div className="countdown-list empty">
        <div className="content">
          <i className="material-icons">alarm_on</i>
          <div className="header">No countdowns</div>
          <div className="sub-header">Click above to create one :)</div>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-list">
      {countdowns.map(countdown => (
        <Countdown
          key={countdown.id}
          {...countdown}
          onComplete={() => onComplete(countdown.id)}
          onClickRemove={() => onClickRemove(countdown.id)}
          onClickPause={() => onClickPause(countdown.id)}
          onClickResume={() => onClickResume(countdown.id)}
          onClickStart={() => onClickStart(countdown.id)}
          onClickReset={() => onClickReset(countdown.id)}
          onClickDismiss={() => onClickDismiss(countdown.id)}
        />
      ))}
    </div>
  );
};

export default CountdownList;
