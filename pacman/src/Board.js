import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
  render() {
    const { board } = this.props;

    return (
      <div className="board">
        {
          board.map((row, rowIndex) => {
            return (
              <div
                className="row"
                key={ rowIndex }
              >
                {
                  row.map((cell, cellIndex) => {
                    return (
                      <Cell
                        rowIndex={ rowIndex }
                        cellIndex={ cellIndex }
                        key={ cellIndex }
                        {...this.props}
                      />
                    );
                  })
                 }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Board;
