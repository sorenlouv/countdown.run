import React from 'react';
import Countdown from './Countdown';

const CountdownList = ({countdowns, onClickRemove, onClickPause, onClickResume, onClickStart, onClickReset, onClickDismiss, onComplete}) => {
  return (
    <div>
      {countdowns.map((countdown) =>
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
      )}
    </div>
  );
};

export default CountdownList;
