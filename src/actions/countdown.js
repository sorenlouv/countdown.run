const crypto = require('crypto');

const DEFAULT_COUNTDOWN = {
  pausedDuruation: 0,
  pausedAt: null,
  didNotify: false,
  startedAt: null,
  isDismissed: false
};

export const addCountdown = (time) => {
  return {
    type: 'ADD_COUNTDOWN',
    ...DEFAULT_COUNTDOWN,
    id: getUniqueId(),
    time,
    startedAt: Date.now()
  }
}

export const removeCountdown = (id) => {
  return {
    type: 'REMOVE_COUNTDOWN',
    id
  }
}

export const pauseCountdown = (id) => {
  return {
    type: 'PAUSE_COUNTDOWN',
    id,
    pausedAt: Date.now()
  }
}

export const resumeCountdown = (id) => {
  return {
    type: 'RESUME_COUNTDOWN',
    id,
    pausedAt: null
  }
}

// Reset without restart
export const resetCountdown = (id) => {
  return {
    type: 'RESET_COUNTDOWN',
    id,
    ...DEFAULT_COUNTDOWN
  }
}

// reset and restart
export const restartCountdown = (id) => {
  return {
    type: 'RESTART_COUNTDOWN',
    id,
    ...DEFAULT_COUNTDOWN,
    startedAt: Date.now()
  }
}


export const dismissCountdown = (id) => {
  return {
    type: 'DISMISS_COUNTDOWN',
    id,
    ...DEFAULT_COUNTDOWN,
    isDismissed: true
  }
}

export const toggleDidNotify = (id) => {
  return {
    type: 'TOGGLE_DID_NOTIFY',
    id,
    didNotify: true
  }
}

function getUniqueId() {
	return crypto.randomBytes(32).toString('hex');
}
