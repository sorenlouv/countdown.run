import { connect } from 'react-redux'

// Actions
import {
  removeCountdown,
  pauseCountdown,
  resumeCountdown,
  restartCountdown,
  resetCountdown,
  dismissCountdown,
  setIsRinging
} from '../../actions/countdown'
import CountdownList from './CountdownList'

const mapStateToProps = (state) => {
  return {
    countdowns: state.countdowns
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickRemove(id) {
      dispatch(removeCountdown(id));
    },
    onClickPause(id) {
      dispatch(pauseCountdown(id));
    },
    onClickResume(id) {
      dispatch(resumeCountdown(id));
    },
    onClickStart(id) {
      dispatch(restartCountdown(id));
    },
    onClickReset(id) {
      dispatch(resetCountdown(id));
    },
    onClickDismiss(id) {
      dispatch(dismissCountdown(id));
    },
    onStartRinging(id) {
      dispatch(setIsRinging(id));
    }
  }
}

const CountdownListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountdownList)

export default CountdownListContainer

