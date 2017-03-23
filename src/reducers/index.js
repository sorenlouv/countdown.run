import { combineReducers } from 'redux'
import timers from './timers'
import editor from './editor'

const combinedReducers = combineReducers({
  timers,
  editor
})

export default combinedReducers
