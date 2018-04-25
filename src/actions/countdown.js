const crypto = require('crypto');

const DEFAULT_COUNTDOWN = {
  pausedDuruation: 0,
  pausedAt: null,
  startedAt: null,
  isDismissed: false,
  isCompleted: false
};

export const addCountdown = (time = []) => {
  return {
    type: 'ADD_COUNTDOWN',
    ...DEFAULT_COUNTDOWN,
    id: getUniqueId(),
    time,
    startedAt: Date.now()
  };
};

export const removeCountdown = id => {
  return {
    type: 'REMOVE_COUNTDOWN',
    id
  };
};

export const resumeCountdown = id => {
  return {
    type: 'RESUME_COUNTDOWN',
    id,
    pausedAt: null
  };
};

export const pauseCountdown = id => {
  return {
    type: 'UPDATE_COUNTDOWN',
    id,
    pausedAt: Date.now()
  };
};

// Reset without restart
export const resetCountdown = id => {
  return {
    type: 'UPDATE_COUNTDOWN',
    id,
    ...DEFAULT_COUNTDOWN
  };
};

// reset and restart
export const restartCountdown = id => {
  return {
    type: 'UPDATE_COUNTDOWN',
    id,
    ...DEFAULT_COUNTDOWN,
    startedAt: Date.now()
  };
};

export const dismissCountdown = id => {
  return {
    type: 'UPDATE_COUNTDOWN',
    id,
    ...DEFAULT_COUNTDOWN,
    isDismissed: true
  };
};

export const setIsCompleted = id => {
  return {
    type: 'UPDATE_COUNTDOWN',
    id,
    isCompleted: true
  };
};

function getUniqueId() {
  return crypto.randomBytes(32).toString('hex');
}
