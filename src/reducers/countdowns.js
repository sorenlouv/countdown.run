const DEFAULT_COUNTDOWN = {
  pausedDuruation: 0,
  pausedAt: null,
  didNotify: false
};

const countdown = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_COUNTDOWN':
      return {
        id: action.id,
        time: action.time,
        startedAt: Date.now(),
        ...DEFAULT_COUNTDOWN
      }

    case 'PAUSE_COUNTDOWN':
      if(action.id !== state.id) {
        return state;
      }

      return {
        ...state,
        pausedAt: Date.now()
      };

    case 'RESUME_COUNTDOWN':
      if(action.id !== state.id) {
        return state;
      }

      return {
        ...state,
        pausedAt: null,
        pausedDuruation: state.pausedDuruation + (Date.now() - state.pausedAt)
      }

    case 'RESET_COUNTDOWN':
      if(action.id !== state.id) {
        return state;
      }

      return {
        ...state,
        startedAt: Date.now(),
        ...DEFAULT_COUNTDOWN
      }

    case 'TOGGLE_DID_NOTIFY':
      if(action.id !== state.id) {
        return state;
      }

      return {
        ...state,
        didNotify: true
      };

    default:
      return state
  }
}

const countdowns = (state = [], action) => {
  switch (action.type) {

    case 'ADD_COUNTDOWN':
      return [...state, countdown({}, action)]

    case 'PAUSE_COUNTDOWN':
    case 'RESUME_COUNTDOWN':
    case 'RESET_COUNTDOWN':
    case 'TOGGLE_DID_NOTIFY':
      return state.map((item) => countdown(item, action));

    case 'REMOVE_COUNTDOWN':
      return state.filter(countdown => countdown.id !== action.id);

    default:
      return state
  }
}

export default countdowns
