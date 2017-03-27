export const setEditorTime = (index, value) => {
  return {
    type: 'SET_EDITOR_TIME',
    index,
    value
  };
};

export const incrementCaret = () => {
  return {
    type: 'INCREMENT_CARET'
  };
};

export const decrementCaret = () => {
  return {
    type: 'DECREMENT_CARET'
  };
};

export const setEditorCaret = (caretIndex) => {
  return {
    type: 'SET_EDITOR_CARET',
    caretIndex
  };
};

export const clearInput = (index) => {
  return {
    type: 'CLEAR_INPUT',
    index
  };
};

export const toggleEditorFocus = (hasFocus) => {
  return {
    type: 'TOGGLE_EDITOR_FOCUS',
    hasFocus
  };
};

export const resetEditor = () => {
  return {
    type: 'RESET_EDITOR'
  };
};
