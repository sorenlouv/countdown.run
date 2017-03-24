const crypto = require('crypto');

export const addCountdown = (time) => {
  return {
    type: 'ADD_COUNTDOWN',
    id: getUniqueId(),
    time,
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
    id
  }
}

export const resumeCountdown = (id) => {
  return {
    type: 'RESUME_COUNTDOWN',
    id
  }
}

export const resetCountdown = (id) => {
  return {
    type: 'RESET_COUNTDOWN',
    id
  }
}

export const toggleDidNotify = (id) => {
  return {
    type: 'TOGGLE_DID_NOTIFY',
    id
  }
}

function getUniqueId() {
	return crypto.randomBytes(32).toString('hex');
}
