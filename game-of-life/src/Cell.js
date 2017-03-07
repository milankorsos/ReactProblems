import React, { Component } from 'react';

class Cell extends Component {
  render() {
    const {
      cellIndex,
      rowIndex,
      seeds
    } = this.props;

    const cellClass = seeds[rowIndex][cellIndex] === 1 ? 'cell live' : 'cell dead';

    return (
      <span className={ cellClass }></span>
    );
  }
}

export default Cell;
