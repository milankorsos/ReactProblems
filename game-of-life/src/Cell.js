import React, { Component } from 'react';

class Cell extends Component {
  render() {
    const {
      cellIndex,
      rowIndex,
      board
    } = this.props;

    const cellClass = board[rowIndex][cellIndex] === 1 ? 'cell live' : 'cell dead';

    return (
      <span className={ cellClass }></span>
    );
  }
}

export default Cell;
