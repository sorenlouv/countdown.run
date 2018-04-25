import React, { Component } from 'react';
import AddCountdown from './components/AddCountdown';
import CountdownList from './components/CountdownList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="App">
          <AddCountdown />
          <CountdownList />
        </div>
        <div className="footer">
          Created by <a href="https://twitter.com/sqrendk">Søren Louv-Jansen</a>.
          Open-sourced on{' '}
          <a href="https://github.com/sqren/countdown.run">Github</a>
        </div>
      </div>
    );
  }
}

export default App;
