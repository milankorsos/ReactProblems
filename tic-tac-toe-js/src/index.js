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

  this.state = {
    game: STATE.GAME,
    player: PLAYER.X,
    board: board
  }

  const _root = document.getElementById('root');
  this._root = _root;

  this.render(this._root, this.state);
  this._root.addEventListener('click', this.onClickHandler.bind(this), true);
}

TicTacToe.prototype.onClickHandler = function(e) {
  const _el = e.srcElement;
  const x = _el.getAttribute('data-x');
  const y = _el.getAttribute('data-y');
  this.play(x, y, this.state)
  this.render(this._root, this.state);
}

TicTacToe.prototype.renderBoard = function(board) {
  const _board = document.createElement('div');
  _board.className = 'board';

  for (let i = 0; i < board.length; i++) {
    const _row = document.createElement('div');
    _row.className = 'row';

    for (let j = 0; j < board.length; j++) {
      const _cell = document.createElement('span');
      _cell.setAttribute('data-x', i);
      _cell.setAttribute('data-y', j);
      _cell.className = 'cell';

      let text = ' ';
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
  return _board;
}

TicTacToe.prototype.renderStatus = function(game, player) {
  const _status = document.createElement('div');
  _status.className = 'status';

  let text = '';
  const currentPlayer = player === PLAYER.X ? 'X' : 'O';
  switch (game) {
    case STATE.GAME:
      text = `Next: ${currentPlayer}`;
      break;
    case STATE.DRAW:
      text = 'Game over! Draw!';
      break;
    case STATE.WIN:
      text = `Game over! ${currentPlayer} won!`;
      break;
    default:
  }
  const _text = document.createTextNode(text);

  _status.appendChild(_text);
  return _status;
}

TicTacToe.prototype.render = function(_root, state) {
  // Clear _root (Warning: this is not very efficient, use shadow dom!)
  while (_root.firstChild) {
    _root.removeChild(_root.firstChild);
  }
  // Append status & board
  _root.appendChild(this.renderStatus(state.game, state.player));

  console.log(this.renderStatus(state.game, state.player))
  _root.appendChild(this.renderBoard(state.board));
}

TicTacToe.prototype.play = function(x, y, state) {
  const { board, game, player } = state;

  if (board[x][y] === 0 && game === STATE.GAME) {
    // Update board
    board[x][y] = player;

    // Check if game over
    const hasPlayerWon = this.hasPlayerWon(board, player, x, y);
    const isBoardFull = this.isBoardFull(board);
    if (hasPlayerWon) {
      state.game = STATE.WIN;
    } else if (isBoardFull) {
      state.game = STATE.DRAW;
    } else {
      state.player = player === PLAYER.X ? PLAYER.O : PLAYER.X;
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

// Checks if a player won on a board after a move
TicTacToe.prototype.hasPlayerWon = function(board, player, x = 0, y = 0) {
  // Check straights
  let winningRow = true;
  let winningCol = true;

  for (let i = 0; i < board.length; i++) {
    // Check X row
    if (board[x][i] !== player) {
      winningRow = false;
    }

    // Check Y column
    if (board[i][y] !== player) {
      winningCol = false;
    }
  }

  // Check diagonals
  let winningLeftDiagonal = false;
  let winningRightDiagonal = false;

  if (x === y) {
    winningLeftDiagonal = true;
    winningRightDiagonal = true;

    for (let i = 0; i < board.length; i++) {
      // Check left diagonal
      if (board[i][i] !== player) {
        winningLeftDiagonal = false;
      }

      // Check right diagonal
      if (board[i][board.length - i - 1] !== player) {
        winningRightDiagonal = false;
      }
    }
  }

  return winningRow || winningCol || winningLeftDiagonal || winningRightDiagonal;
}

// Init game
const game = new TicTacToe(4);

// Unit test
let board;

board = [
  [0, 0],
  [1, -1]
];
console.log('no winner')
console.log(game.isBoardFull(board) === false);
console.log(game.hasPlayerWon(board, 1, 0, 1) === false);
console.log(game.hasPlayerWon(board, -1, 1, 1) === false);

board = [
  [-1, 1],
  [1, -1]
];
console.log('check diagonals')
console.log(game.isBoardFull(board) === true);
console.log(game.hasPlayerWon(board, 1, 1, 1) === true);
console.log(game.hasPlayerWon(board, -1, 1, 1) === true);

board = [
  [1, -1],
  [1, -1]
];
console.log('check cols')
console.log(game.isBoardFull(board) === true);
console.log(game.hasPlayerWon(board, 1, 0, 0) === true);
console.log(game.hasPlayerWon(board, -1, 1, 1) === true);

board = [
  [-1, -1],
  [1, 1]
];
console.log('no rows')
console.log(game.isBoardFull(board) === true);
console.log(game.hasPlayerWon(board, 1, 1, 0) === true);
console.log(game.hasPlayerWon(board, -1, 0, 0) === true);
