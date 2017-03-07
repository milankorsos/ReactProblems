import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.props.seeds
    };

  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState((prevState, props) => ({ board: this.getNextStep(prevState.board) }));
    }, 1000);
  }

  getNeighboursCount(rowIndex, cellIndex) {
    const { board } = this.state;
    let count = 0;

    // Check N
    if (rowIndex > 0) {
      count += board[rowIndex - 1][cellIndex];
    }

    // Check NW
    if (rowIndex > 0 && cellIndex > 0) {
      count += board[rowIndex - 1][cellIndex - 1];
    }

    // Check W
    if (cellIndex > 0) {
      count += board[rowIndex][cellIndex - 1];
    }

    // Check SW
    if (rowIndex < board.length - 1 && cellIndex > 0) {
      count += board[rowIndex + 1][cellIndex - 1];
    }

    // Check S
    if (rowIndex < board.length - 1) {
      count += board[rowIndex + 1][cellIndex];
    }

    // Check SE
    if (rowIndex < board.length - 1 && cellIndex < board[0].length - 1) {
      count += board[rowIndex + 1][cellIndex + 1];
    }

    // Check E
    if (cellIndex < board[0].length - 1) {
      count += board[rowIndex][cellIndex + 1];
    }

    // Check NE
    if (rowIndex > 0 && cellIndex < board[0].length - 1) {
      count += board[rowIndex - 1][cellIndex + 1];
    }

    return count;
  }

  getNextStep(currentState) {
    // Crete nextState with 0 values
    const nextState = [];
    currentState.forEach(row => {
      nextState.push(new Array(row.length).fill(0));
    });

    // Iterate through board and apply all the rules to the cells. Reflect new changes in nextState
    currentState.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const neighboursCount = this.getNeighboursCount(rowIndex, cellIndex);
        // Alive
        if (cell === 1) {
          if (neighboursCount === 2 || neighboursCount === 3) {
            nextState[rowIndex][cellIndex] = 1; // lives
          } else {
            nextState[rowIndex][cellIndex] = 0; // dies
          }
        // Dead
        } else {
          if (neighboursCount === 3) {
            nextState[rowIndex][cellIndex] = 1; // lives
          } else {
            nextState[rowIndex][cellIndex] = currentState[rowIndex][cellIndex]; // stays the same
          }
        }
      });
    });

    return nextState;
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h2>Conway's Game of Life</h2>
        </div>
        <Board
          {...this.props}
          board={ this.state.board }
        />
      </div>
    );
  }
}

export default App;
