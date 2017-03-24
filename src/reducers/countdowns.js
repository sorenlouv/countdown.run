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
    case 'UPDATE_COUNTDOWN':
      return updatedStated(state, action)

    case 'RESUME_COUNTDOWN':
      return {
        ...updatedStated(state, action),
        pausedDuruation: state.pausedDuruation + (Date.now() - state.pausedAt)
      }

    default:
      return state
  }
}

const countdowns = (state = [], action) => {
  switch (action.type) {

    case 'ADD_COUNTDOWN':
      return [...state, countdown({}, action)]

    case 'UPDATE_COUNTDOWN':
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
