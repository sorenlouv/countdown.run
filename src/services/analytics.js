export const trackEvent = ({ category, action, label }) => {
  return window.ga('send', {
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: label
  });
};

export const addCountdown = time => {
  return trackEvent({
    category: 'countdown',
    action: 'add',
    label: time
  });
};

export const pauseCountdown = () => {
  return trackEvent({
    category: 'countdown',
    action: 'pause'
  });
};

export const resetCountdown = () => {
  return trackEvent({
    category: 'countdown',
    action: 'reset'
  });
};

export const startCountdown = () => {
  return trackEvent({
    category: 'countdown',
    action: 'start'
  });
};

export const resumeCountdown = () => {
  return trackEvent({
    category: 'countdown',
    action: 'resume'
  });
};

export const removeCountdown = () => {
  return trackEvent({
    category: 'countdown',
    action: 'remove'
  });
};

export const dismissCountdown = () => {
  return trackEvent({
    category: 'countdown',
    action: 'dismiss'
  });
};
