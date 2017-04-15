import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const BOARD = [
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1]
];

ReactDOM.render(
  <App board={ BOARD } />,
  document.getElementById('root')
);
