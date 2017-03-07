import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const PACMAN = [0, 0];

const GHOSTS = [
  [3, 4],
  [4, 6]
];

ReactDOM.render(
  <App
    board={ BOARD }
    pacman={ PACMAN }
    ghosts={ GHOSTS }
  />,
  document.getElementById('root')
);
