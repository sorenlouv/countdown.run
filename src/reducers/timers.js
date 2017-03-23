const timer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        id: action.id,
        createdAt: action.createdAt,
        endAt: action.endAt
      }
    default:
      return state
  }
}

const timers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      return [
        ...state,
        timer(undefined, action)
      ]
    default:
      return state
  }
}

export default timers
