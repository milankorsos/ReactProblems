import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
  render() {
    const { seeds } = this.props;

    return (
      <div className="game">
        {
          seeds.map((row, rowIndex) => {
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
                    )
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
