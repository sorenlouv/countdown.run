import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers';
import App from './App';
import { startOrStopAlarm } from './services/alarm';
import initServiceWorker from './services/serviceWorker';
import * as cache from './services/localStorage';

const reduxMiddleware =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
  mainReducer,
  cache.getPersistedState(),
  reduxMiddleware
);

store.subscribe(() => startOrStopAlarm(store));
initServiceWorker(store);
cache.init(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
