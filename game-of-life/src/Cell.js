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
      <span
        className={ cellClass }
        onClick={ this.props.clickHandler.bind(this, rowIndex, cellIndex) }
      ></span>
    );
  }
}

export default Cell;
