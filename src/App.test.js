import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import mainReducer from './reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(mainReducer);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
