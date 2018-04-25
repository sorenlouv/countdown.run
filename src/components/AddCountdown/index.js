import { connect } from 'react-redux';

// Actions
import { addCountdown } from '../../actions/countdown';
import { resetEditor } from '../../actions/editor';
import * as analytics from '../../services/analytics';
import AddCountdown from './AddCountdown';

const mapStateToProps = state => {
  return {
    editor: state.editor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCountdown: time => {
      analytics.addCountdown(time);
      dispatch(addCountdown(time));
    },
    resetEditor: () => {
      dispatch(resetEditor());
    }
  };
};

const AddCountdownContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddCountdown
);

export default AddCountdownContainer;
