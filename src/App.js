import React, { Component } from 'react';
import AddTimer from './components/AddTimer';
import ListTimers from './components/ListTimers';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddTimer />
        <ListTimers/>
      </div>
    );
  }
}

export default App;
