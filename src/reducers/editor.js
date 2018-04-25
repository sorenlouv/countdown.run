const DEFAULT_EDITOR_STATE = {
  caretIndex: 0,
  time: ['', '', '', '', '', ''],
  hasFocus: false
};

const editor = (state = DEFAULT_EDITOR_STATE, action) => {
  switch (action.type) {
    case 'SET_EDITOR_TIME': {
      const emptyIndex = state.time
        .slice(action.index)
        .findIndex(i => i === '');

      return {
        ...state,
        time: [
          ...state.time.slice(0, action.index),
          action.value,
          ...state.time.slice(action.index).filter((t, i) => i !== emptyIndex)
        ].slice(0, 6)
      };
    }

    case 'INCREMENT_CARET': {
      const nextCaret = state.caretIndex + 1;
      if (state.time.length < nextCaret || nextCaret > 5) {
        return state;
      }

      return {
        ...state,
        caretIndex: nextCaret
      };
    }

    case 'DECREMENT_CARET': {
      const nextCaret = state.caretIndex - 1;
      if (nextCaret < 0) {
        return state;
      }

      return {
        ...state,
        caretIndex: nextCaret
      };
    }

    case 'SET_EDITOR_CARET':
      return {
        ...state,
        caretIndex: action.caretIndex
      };

    case 'CLEAR_INPUT':
      return {
        ...state,
        time: [
          ...state.time.filter((value, index) => index !== action.index),
          ''
        ]
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
