export const setEditorTime = (time) => {
  return {
    type: 'SET_EDITOR_TIME',
    time
  };
};

export const setEditorCaret = (caretIndex) => {
  return {
    type: 'SET_EDITOR_CARET',
    caretIndex
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
