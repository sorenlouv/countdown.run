import { connect } from 'react-redux';

// Actions
import { setEditorTime, decrementCaret, incrementCaret, clearInput, setEditorCaret, toggleEditorFocus } from '../../actions/editor';
import FakeInput from './FakeInput';

const mapStateToProps = (state) => {
  return {
    editor: state.editor
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    incrementCaret () {
      dispatch(incrementCaret());
    },
    decrementCaret () {
      dispatch(decrementCaret());
    },
    onInputClick () {
      dispatch(setEditorCaret(props.inputIndex));
    },
    onKeyDown () {
      // dispatch(setEditorCaret(props.inputIndex));
    },
    onBackspace () {
      dispatch(clearInput(props.inputIndex));
    },
    onInputChange (value) {
      dispatch(setEditorTime(props.inputIndex, value));
    },
    onBlur () {
      dispatch(toggleEditorFocus(false));
    },
    onFocus () {
      dispatch(toggleEditorFocus(true));
    }
  };
};

const FakeInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FakeInput);

export default FakeInputContainer;
