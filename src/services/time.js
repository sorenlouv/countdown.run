import { padStart } from 'lodash';

export function msToTimeObject(duration) {
  const seconds = padStart(parseInt((duration/1000)%60, 10), 2, '0');
  const minutes = padStart(parseInt((duration/(1000*60))%60, 10), 2, '0')
  const hours = padStart(parseInt((duration/(1000*60*60))%24, 10), 2, '0')

  return {seconds, minutes, hours};
}

export function getTimeRemaining(countdown) {
    const [hour1, hour2, min1, min2, sec1, sec2] = padStart(countdown.time, 6, '0').split('');
    const countdownDuration = (parseInt(hour1 + hour2, 10) * 3600 + parseInt(min1 + min2, 10) * 60 + parseInt(sec1 + sec2, 10)) * 1000;
    const isStarted = !!countdown.startedAt;

    // if the timer was not started, the remaining time is the countdown duration
    if(!isStarted) {
      return countdownDuration;
    }

    const deadlineAt = countdown.startedAt + countdownDuration;
    const timeRemaining = deadlineAt - (countdown.pausedAt || Date.now()) + countdown.pausedDuruation;
    if (timeRemaining < 0) {
      return 0;
    }

    return timeRemaining;
}

export function countdownIsRinging(countdown) {
  const isStarted = countdown.startedAt > 0;
  return isStarted && !countdown.isDismissed && getTimeRemaining(countdown) === 0;
}
