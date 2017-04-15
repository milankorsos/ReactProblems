import React, { Component } from 'react';
import './App.css';

const GAME = {
  STARTED: 0,
  LOST: -1,
  WON: 1
}

const MINE = "X";

class Cell extends Component {
  render() {
    const { rowIndex, cellIndex, board, visited, onClick } = this.props;
    const isVisited = visited[rowIndex][cellIndex];
    const cell = isVisited ? board[rowIndex][cellIndex] : '';
    const className = !isVisited ? 'new' : '';
    return (
      <td
        className={ className }
        onClick={ onClick.bind(this, rowIndex, cellIndex) }
      >
        { cell }
      </td>
    );
  }
}

class Board extends Component {
  render() {
    const { board } = this.props;
    return (
      <div className="board">
        <table>
          <tbody>
            {
              board.map((row, rowIndex) => {
                return (
                  <tr key={ rowIndex }>
                    {
                      row.map((cell, cellIndex) => {
                        return (
                          <Cell
                            key={ cellIndex }
                            rowIndex={ rowIndex }
                            cellIndex={ cellIndex }
                            {...this.props}
                          />
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class Message extends Component {
  render() {
    const { game,  restart } = this.props;

    const restartLink = (
      <div>
        <a href="#" onClick={ restart.bind(this) }>Restart</a>
      </div>
    );

    let message;
    if (game === GAME.LOST) {
      message = "You lost!";
    } else if (game === GAME.WON) {
      message = "You won!";
    }

    let panel;
    if (message) {
      panel = (
        <div>
          <strong>{ message }</strong>
          { restartLink }
        </div>
      );
    }

    return (
      <div className="message">
        { panel }
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.getStartState();
  }

  restart() {
    this.setState(this.getStartState());
  }

  getStartState() {
    return {
      board: this.getNewBoard(),
      game: GAME.STARTED,
      visited: this.getNewVisited(),
      visitedCount: 0
    };
  }

  getNewBoard() {
    const board = [
      [MINE, 2, 1],
      [2, MINE, 2],
      [1, 2, MINE],
    ];
    return board;
  }

  getNewVisited() {
    const visited = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    return visited;
  }

  cellClick(rowIndex, cellIndex) {
    const { visited, board, game, visitedCount } = this.state;
    const { SIZE } = this.props;

    let newGame = game;
    let newVisitedCount = visitedCount;

    if (!visited[rowIndex][cellIndex] && game === GAME.STARTED) {
      // Mark cell as visited
      visited[rowIndex][cellIndex] = 1;
      newVisitedCount++;

      // Check if lost
      const lost = board[rowIndex][cellIndex] === MINE;
      if (lost) {
        newGame = GAME.LOST;
      }

      // Check if won
      const cellCount = SIZE * SIZE;
      const minesCount = SIZE;
      const won = newVisitedCount === cellCount - minesCount;
      if (won) {
        newGame = GAME.WON;
      }

      // Save state
      this.setState({
        visited,
        game: newGame,
        visitedCount: newVisitedCount
      });
    }
  }

  render() {
    return (
      <div>
        <Message
          game={ this.state.game }
          restart={ this.restart.bind(this) }
        />
        <Board
          board={ this.state.board }
          visited={ this.state.visited }
          onClick={ this.cellClick.bind(this) }
        />
      </div>
    );
  }
}

export default App;
