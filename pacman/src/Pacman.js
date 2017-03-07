class Pacman {
  constructor(state, props, setState) {
    // this.app = app;
    this.state = state;
    this.setState = setState;
    this.props = props;

    window.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  handleKeyUp(event) {
    switch (event.code) {
      case 'ArrowUp':
        this.startPacman([-1, 0]);
        break;

      case 'ArrowDown':
        this.startPacman([1, 0]);
        break;

      case 'ArrowLeft':
        this.startPacman([0, -1]);
        break;

      case 'ArrowRight':
        this.startPacman([0, 1]);
        break;

      default:
        break;
    }
  }

  isStepValid(x, y) {
    // Move is valid if cell is not a wall & inbounds
    const { board } = this.props;

    const inBounds = x >= 0 && x < board.length && y >= 0 && y < board[0].length;
    if (!inBounds) {
      return false;
    }

    return board[x][y] === 0;
  }

  isCollisionWithGhost(x, y) {
    const { ghosts } = this.props;
    return !!ghosts.find(ghost => {
      return x === ghost[0] && y === ghost[1];
    })
  }

  movePacman(direction) {
    this.setState((prevState, props) => {
      const { pacman } = prevState;

      // new position
      const x = pacman[0] + direction[0];
      const y = pacman[1] + direction[1];

      // Check if step valid and make the move
      if (this.isStepValid(x, y)) {
        // Check if step colloides with a ghost
        if (this.isCollisionWithGhost(x, y)) {
          this.stopPacman();
          return {
            game: 'lost',
            pacman: [x, y]
          };
        } else {
          return {
            pacman: [x, y]
          };
        }
      } else {
        this.stopPacman();
      }
      return {};
    });
  }

  startPacman(direction) {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
    this.interval = window.setInterval(() => {
      this.movePacman(direction);
    }, 200);
  }

  stopPacman() {
    window.clearInterval(this.interval);
  }
}

export default Pacman;