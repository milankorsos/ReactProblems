import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('check if player won', () => {
  const app = new App();

  test('column won', () => {
    const board = [
      [-1, 0, 0],
      [-1, 0, 1],
      [-1, 0, 0]
    ];

    expect(app.checkIfPlayerWon(-1, board)).toEqual(true);
    expect(app.checkIfPlayerWon(1, board)).toEqual(false);
  });

  test('row won', () => {
    const board = [
      [-1, 0, 0],
      [1, 1, 1],
      [-1, 0, 0]
    ];

    expect(app.checkIfPlayerWon(-1, board)).toEqual(false);
    expect(app.checkIfPlayerWon(1, board)).toEqual(true);
  });

  test('diagonal1 won', () => {
    const board = [
      [-1, 0, 0],
      [-1, -1, 1],
      [1, 0, -1]
    ];

    expect(app.checkIfPlayerWon(-1, board)).toEqual(true);
    expect(app.checkIfPlayerWon(1, board)).toEqual(false);
  });

  test('diagonal2 won', () => {
    const board = [
      [-1, 0, 1],
      [-1, 1, 1],
      [1, 0, -1]
    ];

    expect(app.checkIfPlayerWon(-1, board)).toEqual(false);
    expect(app.checkIfPlayerWon(1, board)).toEqual(true);
  });

});