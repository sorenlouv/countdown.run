import React, { Component } from 'react';
import AddCountdown from './components/AddCountdown';
import CountdownList from './components/CountdownList';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <AddCountdown />
        <CountdownList/>
      </div>
    );
  }
}

export default App;
