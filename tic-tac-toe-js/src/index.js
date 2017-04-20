import './index.css';

/*
  Tic Tac Toe

  Design a game of Tic-Tac-Toe.

  Only instead of 3x3, this is a game on n x n board.
  Two manual players play the game.

  A player wins if there are all "X" or all "O" in either of n rows, n columns or 2 diagonals.

*/

const STATE = {
  GAME: 'GAME',
  WIN: 'WIN',
  DRAW: 'DRAW'
}

const PLAYER = {
  X: -1,
  O: 1
}

function TicTacToe(boardSize, id) {

  // Setup empty board
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    board.push(new Array(boardSize).fill(0));
  }

  this.state = STATE.GAME;
  this.player = PLAYER.X;
  this.board = board;
  this.id = id;

  this.render(this.id, this.board);
  const _board = document.getElementById(id);
  _board.addEventListener('click', this.onClickHandler.bind(this), true);
}

TicTacToe.prototype.onClickHandler = function(e) {
  const _el = e.srcElement;
  const x = _el.getAttribute('data-x');
  const y = _el.getAttribute('data-y');
  this.play(x, y)
  this.render(this.id, this.board);
}

TicTacToe.prototype.render = function(id, board) {
  const _board = document.getElementById(id);
  while (_board.firstChild) {
    _board.removeChild(_board.firstChild);
  }

  // Render board
  for (let i = 0; i < board.length; i++) {
    const _row = document.createElement('div');
    _row.className = 'row';

    for (let j = 0; j < board.length; j++) {
      const _cell = document.createElement('span');
      _cell.setAttribute('data-x', i);
      _cell.setAttribute('data-y', j);
      _cell.className = 'cell';

      let text = '';
      if (board[i][j] === -1) {
        text = 'X';
      } else if (board[i][j] === 1) {
        text = 'O';
      }

      const _cellText = document.createTextNode(text);
      _cell.appendChild(_cellText);
      _row.appendChild(_cell);
    }
    _board.appendChild(_row);
  }

  // Render messages
  const _messages = document.createElement('div');
  _messages.className = 'messages';

  let text = '';
  if (this.state === STATE.DRAW) {
    text = 'Game Over! Its a draw!';
  } else if (this.state === STATE.WIN && this.player === PLAYER.X) {
    text = 'Game Over! X won!';
  } else if (this.state === STATE.WIN && this.player === PLAYER.Y) {
    text = 'Game Over! O won!';
  }
  const _text = document.createTextNode(text);

  console.log('text', text);
  _messages.appendChild(_text);
  _board.appendChild(_messages);

}

TicTacToe.prototype.play = function(x, y) {
  if (this.board[x][y] === 0 && this.state === STATE.GAME) {
    // Update board
    this.board[x][y] = this.player;

    // Check if game over
    const hasPlayerWon = this.hasPlayerWon(this.board, this.player);
    const isBoardFull = this.isBoardFull(this.board);
    if (hasPlayerWon) {
      this.state = STATE.WIN;
      console.log('Game Over!', this.state, 'Winner:', this.player)
    } else if (isBoardFull) {
      this.state = STATE.DRAW;
      console.log('Game Over!', this.state)
    } else {
      this.player = this.player === PLAYER.X ? PLAYER.O : PLAYER.X;
    }
  }
}


TicTacToe.prototype.isBoardFull = function(board) {
  const boardSize = board.length;

  // iterate through board to check if there is any 0 left
  let isFull = true;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 0) {
        isFull = false;
      }
    }
  }
  return isFull;
}

TicTacToe.prototype.hasPlayerWon = function(board, player) {
  const boardSize = board.length;

  let won = false;

  // Check rows
  for (let i = 0; i < boardSize; i++) {
    let rowWinning = true;
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] !== player) {
        rowWinning = false;
      }
    }
    won = won || rowWinning;
  }

  // Check cols
  for (let i = 0; i < boardSize; i++) {
    let colWinning = true;
    for (let j = 0; j < boardSize; j++) {
      if (board[j][i] !== player) {
        colWinning = false;
      }
    }
    won = won || colWinning;
  }

  // Check diagonals
  let leftDiagonalWinning = true;
  let rightDiagonalWinning = true;
  for (let i = 0; i < boardSize; i++) {
    // Check left diagonal
    if (board[i][i] !== player) {
      leftDiagonalWinning = false;
    }
    // Check right diagonal
    if (board[i][boardSize - i - 1] !== player) {
      rightDiagonalWinning = false;
    }
  }
  won = won || leftDiagonalWinning || rightDiagonalWinning;

  return won;
}

// Init game
const game = new TicTacToe(3, 'board');

// Unit test
// let board;

// board = [
//   [0, 0],
//   [1, -1]
// ];
// console.log('no winner')
// console.log(game.isBoardFull(board) === false);
// console.log(game.hasPlayerWon(board, 1) === false);
// console.log(game.hasPlayerWon(board, -1) === false);

// board = [
//   [-1, 1],
//   [1, -1]
// ];
// console.log('check diagonals')
// console.log(game.isBoardFull(board) === true);
// console.log(game.hasPlayerWon(board, 1) === true);
// console.log(game.hasPlayerWon(board, -1) === true);

// board = [
//   [1, -1],
//   [1, -1]
// ];
// console.log('check cols')
// console.log(game.isBoardFull(board) === true);
// console.log(game.hasPlayerWon(board, 1) === true);
// console.log(game.hasPlayerWon(board, -1) === true);

// board = [
//   [-1, -1],
//   [1, 1]
// ];
// console.log('no rows')
// console.log(game.isBoardFull(board) === true);
// console.log(game.hasPlayerWon(board, 1) === true);
// console.log(game.hasPlayerWon(board, -1) === true);
