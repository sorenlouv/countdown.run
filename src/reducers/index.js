import { combineReducers } from 'redux'
import countdowns from './countdowns'
import editor from './editor'

const combinedReducers = combineReducers({
  countdowns,
  editor
})

export default combinedReducers
