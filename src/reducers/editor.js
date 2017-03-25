const DEFAULT_EDITOR_STATE = {
  caretIndex: 0,
  time: '',
  hasFocus: false
};

const editor = (state = DEFAULT_EDITOR_STATE, action) => {
  switch (action.type) {
    case 'SET_EDITOR_TIME':
      return {
        ...state,
        time: action.time
      };
    case 'SET_EDITOR_CARET':
      return {
        ...state,
        caretIndex: action.caretIndex
      };
    case 'TOGGLE_EDITOR_FOCUS':
      return {
        ...state,
        hasFocus: action.hasFocus
      };
    case 'RESET_EDITOR':
      return DEFAULT_EDITOR_STATE;
    default:
      return state;
  }
};

export default editor;
