import React, { Component } from 'react';
import './App.css';

/*
  TODO:
  - better way to track if end of game
  - CSS
  - code cleanup
  - restart
  - generate new board bases on size, # of mines
*/

class Mine extends Component {
  countNeighboringMines() {
    const { board, rowIndex, cellIndex } = this.props;

    const rowStart = rowIndex === 0 ? rowIndex : rowIndex - 1;
    const rowEnd = rowIndex === board.length - 1 ? rowIndex : rowIndex + 1;
    const cellStart = cellIndex === 0 ? cellIndex : cellIndex - 1;
    const cellEnd = cellIndex === board[0].length - 1 ? cellIndex : cellIndex + 1;

    let counts = 0;
    for (let row = rowStart; row <= rowEnd; row++) {
      for (let cell = cellStart; cell <= cellEnd; cell++) {
        if (board[row][cell] === 1) {
          counts++;
        }
      }
    }

    return counts;
  }

  clickHandler(rowIndex, cellIndex) {
    return this.props.visitCell(rowIndex, cellIndex);
  }

  render() {
    const { rowIndex, cellIndex, board, visited } = this.props;

    const isMine = board[rowIndex][cellIndex] === 1;
    const isVisited = visited[rowIndex][cellIndex] === 1;

    let cell = " "; // empty
    if (isVisited) {
      cell = isMine ? "X" : this.countNeighboringMines();
    }
    return (
      <span
        className="mine"
        onClick={ this.clickHandler.bind(this, rowIndex, cellIndex) }>
        [{ cell }]
      </span>
    );
  }
}

class Board extends Component {
  renderRow(row, rowIndex) {
    return (
      <div className="row" key={ rowIndex }>
        {
          row.map((cell, cellIndex) => {
            return (
              <Mine
                key={ cellIndex }
                rowIndex={ rowIndex }
                cellIndex={ cellIndex }
                {...this.props }
              />
            );
          })
        }
      </div>
    );
  }

  render() {
    const { board } = this.props;
    return(
      <div className="board">
        {
          board.map((row, rowIndex) => {
            return this.renderRow(row, rowIndex);
          })
        }
      </div>
    )
  }
}

const GAME_STATE = {
  IN_PROGRESS: 0,
  LOST: -1,
  WON: 1
}

class App extends Component {
  constructor(props) {
    super(props);
    const { board } = this.props;

    // set up visited
    const visited = [];
    for (let i = 0; i < board.length; i++) {
      visited.push(new Array(board[0].length).fill(0));
    }

    this.state = {
      board,
      visited,
      gameState: GAME_STATE.IN_PROGRESS
    }
  }

  visitCell(rowIndex, cellIndex) {
    const { board, visited, gameState } = this.state;

    if (gameState === GAME_STATE.IN_PROGRESS) {

      // Mark field as visited
      visited[rowIndex][cellIndex] = 1;
      this.setState({ visited });

      // Check if lost
      if (board[rowIndex][cellIndex] === 1) {
        this.setState({ gameState: GAME_STATE.LOST })
      }

      // Check if won: if everyting is visited but the number of mines
      let visitedCount = 0;
      let mineCount = 0;
      const boardSize = board.length * board[0].length;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
          visitedCount += visited[i][j];
          mineCount += board[i][j];
        }
      }

      if (boardSize - mineCount === visitedCount) {
        this.setState({ gameState: GAME_STATE.WON })
      }
    }
  }

  renderMessage() {
    const { gameState } = this.state;

    let panel;
    switch (gameState) {
      case GAME_STATE.WON:
        panel = (
          <strong>
            You won!
          </strong>
        );
        break;

      case GAME_STATE.LOST:
        panel = (
          <strong>
            You lost!
          </strong>
        );
        break;

      default:
        panel = (
          <strong></strong>
        );
    }

    return panel;
  }

  render() {
    return (
      <div className="App">
        <Board
          board={ this.state.board }
          visited={ this.state.visited }
          visitCell={ this.visitCell.bind(this) }
        />
        { this.renderMessage() }
      </div>
    );
  }
}

export default App;
