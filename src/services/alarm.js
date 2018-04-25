import once from 'lodash.once';

// Hack: Mobile devices will only allows sounds to be played as part of a user action.
// This will create a global Audio element, which will be started on the users first interaction with a volume of 0
const alarmSound = new Audio('alarm.wav');
alarmSound.loop = true;

export const startOrStopAlarm = store => {
  const { countdowns } = store.getState();
  const shouldRing = countdowns.some(
    countdown => countdown.isCompleted && !countdown.isDismissed
  );
  if (shouldRing && alarmSound.paused) {
    alarmSound.play();
  } else if (!shouldRing) {
    alarmSound.pause();
  }
};

export const initPlay = once(() => {
  if (alarmSound.paused) {
    alarmSound.play().catch(e => {
      console.log('Could not play alarm', e);
    });
  }

  setTimeout(() => alarmSound.pause(), 100);
});
