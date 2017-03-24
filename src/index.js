import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers';
import App from './App';
import {debounce} from 'lodash';
import { countdownIsRinging } from './services/time'

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
const reduxMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(mainReducer, persistedState, reduxMiddleware);

const persistState = debounce(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
}, 100);

store.subscribe(persistState);


// Hack: Chrome will only allows sounds to be played as part of a user action.
// This will create a global Audio element, which will be started on the users first interaction with a volume of 0
window.alarmSound = new Audio("https://soundbible.com/grab.php?id=1599&type=wav");
window.alarmSound.loop = true;
window.alarmSound.volume = 0;
window.alarmSound.play();

store.subscribe(() => {
  const {countdowns} = store.getState();
  const isRinging = countdowns.some(countdownIsRinging);
  window.alarmSound.volume = isRinging ? 1 : 0;
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
