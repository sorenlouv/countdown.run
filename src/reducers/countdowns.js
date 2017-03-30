import omit from 'lodash.omit';

const countdown = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COUNTDOWN':
    case 'UPDATE_COUNTDOWN':
      return {
        ...state,
        ...omit(action, 'type')
      };

    case 'RESUME_COUNTDOWN':
      return {
        ...state,
        ...omit(action, 'type'),
        pausedDuruation: state.pausedDuruation + (Date.now() - state.pausedAt)
      };

    default:
      return state;
  }
};

const countdowns = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COUNTDOWN':
      return [countdown({}, action), ...state];

    case 'RESUME_COUNTDOWN':
    case 'UPDATE_COUNTDOWN':
      return state.map((item) => {
        if (action.id !== item.id) {
          return item;
        }
        return countdown(item, action);
      });

    case 'REMOVE_COUNTDOWN':
      return state.filter(countdown => countdown.id !== action.id);

    default:
      return state;
  }
};

export default countdowns;
