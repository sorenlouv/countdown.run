import {omit} from 'lodash';

function updatedStated(state, action) {
  return {
    ...state,
    ...omit(action, 'type')
  };
}

const countdown = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_COUNTDOWN':
      return updatedStated(state, action)

    case 'PAUSE_COUNTDOWN':
      return updatedStated(state, action)

    case 'RESUME_COUNTDOWN':
      return {
        ...updatedStated(state, action),
        pausedDuruation: state.pausedDuruation + (Date.now() - state.pausedAt)
      }

    case 'RESET_COUNTDOWN':
      return updatedStated(state, action)

    case 'RESTART_COUNTDOWN':
      return updatedStated(state, action)

    case 'DISMISS_COUNTDOWN':
      return updatedStated(state, action)

    case 'TOGGLE_DID_NOTIFY':
      return updatedStated(state, action)

    default:
      return state
  }
}

const countdowns = (state = [], action) => {
  switch (action.type) {

    case 'ADD_COUNTDOWN':
      return [...state, countdown({}, action)]

    case 'DISMISS_COUNTDOWN':
    case 'RESTART_COUNTDOWN':
    case 'PAUSE_COUNTDOWN':
    case 'RESUME_COUNTDOWN':
    case 'RESET_COUNTDOWN':
    case 'TOGGLE_DID_NOTIFY':
      return state.map((item) => {
        if(action.id !== item.id) {
          return item;
        }
        return countdown(item, action)
      });

    case 'REMOVE_COUNTDOWN':
      return state.filter(countdown => countdown.id !== action.id);

    default:
      return state
  }
}

export default countdowns
