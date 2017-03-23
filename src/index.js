import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers';
import App from './App';
import {debounce} from 'lodash';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(mainReducer, persistedState);

const persistState = debounce(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
}, 100);

store.subscribe(persistState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
