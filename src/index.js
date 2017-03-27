import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers';
import App from './App';
import debounce from 'lodash.debounce';
import { startOrStopAlarm } from './services/alarm';

const LOCALE_STORAGE_NAME = 'reduxState-v1';
const persistedState = getValidPersistedState(LOCALE_STORAGE_NAME);
const reduxMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(mainReducer, persistedState, reduxMiddleware);

const persistState = debounce(() => {
  localStorage.setItem(LOCALE_STORAGE_NAME, JSON.stringify(store.getState()));
}, 100);

store.subscribe(persistState);
store.subscribe(() => startOrStopAlarm(store));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

function getValidPersistedState (name) {
  const stateRaw = localStorage.getItem(name);
  const state = stateRaw ? JSON.parse(stateRaw) : {};
  return state;
}
