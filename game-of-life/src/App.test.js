import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App seeds={ [[]] }/>, div);
});

test('calculating number of neighbors correctly', () => {
  const app = new App({ seeds: [[]] });

  const board = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  expect(app.getNeighboursCount(board, 0, 0)).toEqual(1);
  expect(app.getNeighboursCount(board, 0, 1)).toEqual(2);
  expect(app.getNeighboursCount(board, 0, 2)).toEqual(2);
  expect(app.getNeighboursCount(board, 0, 3)).toEqual(1);

  expect(app.getNeighboursCount(board, 1, 0)).toEqual(2);
  expect(app.getNeighboursCount(board, 1, 1)).toEqual(3);
  expect(app.getNeighboursCount(board, 1, 2)).toEqual(3);
  expect(app.getNeighboursCount(board, 1, 3)).toEqual(2);

  expect(app.getNeighboursCount(board, 2, 0)).toEqual(2);
  expect(app.getNeighboursCount(board, 2, 1)).toEqual(3);
  expect(app.getNeighboursCount(board, 2, 2)).toEqual(3);
  expect(app.getNeighboursCount(board, 2, 3)).toEqual(2);

  expect(app.getNeighboursCount(board, 3, 0)).toEqual(1);
  expect(app.getNeighboursCount(board, 3, 1)).toEqual(2);
  expect(app.getNeighboursCount(board, 3, 2)).toEqual(2);
  expect(app.getNeighboursCount(board, 3, 3)).toEqual(1);
});

test('getting next state correctly', () => {
  const app = new App({ seeds: [[]] });

  const block = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  expect(app.getNextStep(block)).toEqual(block);

  const blinker = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  const blinker2 = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  expect(app.getNextStep(blinker)).toEqual(blinker2);
});