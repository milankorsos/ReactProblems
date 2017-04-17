import React, { Component } from 'react';
import './App.css';

/*
  Write tic tac toe application that can handle 2 players on a 3 by 3 board size

  Considerations
  - 2D array with values -1: player 1, 0: empty, 1: player 2
  - game state 'stopped', 'player1 next', 'player 2 next', 'player 1 won', 'player 2 won'
  - end of game? after every click will check neighborings -> cheange game state

*/

const GAME_STATE = {
  PLAYER1: 'PLAYER1',
  PLAYER2: 'PLAYER2',
  PLAYER1_WON: 'PLAYER1_WON',
  PLAYER2_WON: 'PLAYER2_WON',
  DRAW: 'DRAW'
};

class Cell extends Component {
  render() {
    const { value, rowIndex, colIndex, clickHandler } = this.props;
    let cell;
    switch (value) {
      case -1:
        cell = 'X';
        break;
      case 1:
        cell = 'O';
        break;
      default:
        cell = '';
    }
    return(
      <td onClick={ clickHandler.bind(this, rowIndex, colIndex) }>
        { cell }
      </td>
    );
  }
}

class Board extends Component {
  render() {
    const { board, clickHandler } = this.props;
    return(
      <div className="board">
        <table>
          <tbody>
            {
              board.map((row, rowIndex) => {
                return (
                  <tr key={ rowIndex }>
                    {
                      row.map((value, colIndex) => {
                        return (
                          <Cell
                            key={ colIndex }
                            value={ value }
                            rowIndex={ rowIndex }
                            colIndex={ colIndex }
                            clickHandler={ clickHandler.bind(this) }
                          />
                        )
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class Messages extends Component {
  render() {
    const { gameState, restart } = this.props;

    let message;
    let button;
    let restartBtn = (
      <button type="button" onClick={ restart.bind(this) } >Restart</button>
    );

    switch (gameState) {
      case GAME_STATE.PLAYER1:
        message = 'Next: X';
        break;

      case GAME_STATE.PLAYER2:
        message = 'Next: O';
        break;

      case GAME_STATE.PLAYER1_WON:
        message = 'X won!';
        button = restartBtn;
        break;

      case GAME_STATE.PLAYER2_WON:
        message = 'O won!';
        button = restartBtn;
        break;

      case GAME_STATE.DRAW:
        message = 'Draw!';
        button = restartBtn;
        break;

      default:
        message = '';
    }

    return(
      <div className="messages">
        <div>{ message }</div>
        <div>{ button }</div>
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
      board: this.getEmptyBoard(),
      gameState: GAME_STATE.PLAYER1
    };
  }

  getEmptyBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
      board.push(new Array(3).fill(0));
    }
    return board;
  }

  checkIfPlayerWon(value, board) {
    // Check rows & columns
    for (let i = 0; i < 3; i++) {
      // Row
      if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] === value) {
        return true;
      }
      // Col
      if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] === value) {
        return true;
      }
    }

    // Check diagonals
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === value) {
      return true;
    }

    if (board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[2][0] === value) {
      return true;
    }

    return false;
  }

  checkIfBoardIsFull(board) {
    let full = true;
    board.forEach(row => {
      row.forEach(cell => {
        if (cell === 0) {
          full = false;
        }
      })
    })
    return full;
  }

  clickHandler(rowIndex, colIndex) {
    const { board, gameState } = this.state;

    const isEmptyCell = board[rowIndex][colIndex] === 0;
    const isGameInProgress = gameState === GAME_STATE.PLAYER1 || gameState === GAME_STATE.PLAYER2;

    if (isEmptyCell && isGameInProgress) {
      const value = gameState === GAME_STATE.PLAYER1 ? -1 : 1;

      // Update board
      board[rowIndex][colIndex] = value;

      // Set next game state
      let nextGameState;

      // Game ended if current player won or board is full
      const nextPlayer = gameState === GAME_STATE.PLAYER1 ? GAME_STATE.PLAYER2 : GAME_STATE.PLAYER1;
      const currentPlayerWon = this.checkIfPlayerWon(value, board);
      const player1Won = currentPlayerWon && gameState === GAME_STATE.PLAYER1;
      const player2Won = currentPlayerWon && gameState === GAME_STATE.PLAYER2;
      const isBoardFull = this.checkIfBoardIsFull(board);

      if (player1Won) {
        nextGameState = GAME_STATE.PLAYER1_WON;
      } else if (player2Won) {
        nextGameState = GAME_STATE.PLAYER2_WON;
      } else if (isBoardFull) {
        nextGameState = GAME_STATE.DRAW;
      } else {
        nextGameState = nextPlayer;
      }

      this.setState({
        board,
        gameState: nextGameState
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Messages
          gameState={ this.state.gameState }
          restart={ this.restart.bind(this) }
        />
        <Board
          board={ this.state.board }
          clickHandler={ this.clickHandler.bind(this) }
        />
      </div>
    );
  }
}

export default App;
