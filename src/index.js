import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers';
import App from './App';
import debounce from 'lodash.debounce';
import { startOrStopAlarm } from './services/alarm'

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
const reduxMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(mainReducer, persistedState, reduxMiddleware);

const persistState = debounce(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
}, 100);

store.subscribe(persistState);
store.subscribe(() => startOrStopAlarm(store));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
