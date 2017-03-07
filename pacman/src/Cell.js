import React, { Component } from 'react';

class Cell extends Component {
  render() {
    const {
      cellIndex,
      rowIndex,
      board,
      ghosts,
      pacman
    } = this.props;

    const isWall = board[rowIndex][cellIndex] === 1;
    const isPacman = pacman && rowIndex === pacman[0] && cellIndex === pacman[1];
    const isGhost = !!ghosts.find(ghost => {
      return rowIndex === ghost[0] && cellIndex === ghost[1];
    });

    let cellClass = 'cell';
    if (isWall) {
      cellClass = 'cell wall';
    } else if (isPacman) {
      cellClass = 'cell pacman';
    } else if (isGhost) {
      cellClass = 'cell ghost';
    }

    return (
      <span className={ cellClass }></span>
    );
  }
}

export default Cell;
