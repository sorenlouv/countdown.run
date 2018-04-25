import { connect } from 'react-redux';
import * as analytics from '../../services/analytics';

// Actions
import {
  removeCountdown,
  pauseCountdown,
  resumeCountdown,
  restartCountdown,
  resetCountdown,
  dismissCountdown,
  setIsCompleted
} from '../../actions/countdown';
import CountdownList from './CountdownList';

const mapStateToProps = state => {
  return {
    countdowns: state.countdowns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClickRemove(id) {
      analytics.removeCountdown();
      dispatch(removeCountdown(id));
    },
    onClickPause(id) {
      analytics.pauseCountdown();
      dispatch(pauseCountdown(id));
    },
    onClickResume(id) {
      analytics.resumeCountdown();
      dispatch(resumeCountdown(id));
    },
    onClickStart(id) {
      analytics.startCountdown();
      dispatch(restartCountdown(id));
    },
    onClickReset(id) {
      analytics.resetCountdown();
      dispatch(resetCountdown(id));
    },
    onClickDismiss(id) {
      analytics.dismissCountdown();
      dispatch(dismissCountdown(id));
    },
    onComplete(id) {
      dispatch(setIsCompleted(id));
    }
  };
};

const CountdownListContainer = connect(mapStateToProps, mapDispatchToProps)(
  CountdownList
);

export default CountdownListContainer;
