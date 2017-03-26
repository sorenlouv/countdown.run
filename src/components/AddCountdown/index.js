import { connect } from 'react-redux';

// Actions
import { addCountdown } from '../../actions/countdown';
import { setEditorCaret, setEditorTime, toggleEditorFocus, resetEditor } from '../../actions/editor';
import * as analytics from '../../services/analytics';
import AddCountdown from './AddCountdown';

const mapStateToProps = (state) => {
  return {
    editor: state.editor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCountdown: (time) => {
      analytics.addCountdown(time);
      dispatch(addCountdown(time));
    },
    onCaretChange: (index) => {
      dispatch(setEditorCaret(index));
    },
    onInputChange: (value) => {
      dispatch(setEditorTime(value));
    },
    onFocusChange: (hasFocus) => {
      dispatch(toggleEditorFocus(hasFocus));
    },
    resetEditor: () => {
      dispatch(resetEditor());
    }
  };
};

const AddCountdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCountdown);

export default AddCountdownContainer;
