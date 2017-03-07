import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h2>Conway's Game of Life</h2>
        </div>
        <Board {...this.props} />
      </div>
    );
  }
}

export default App;
