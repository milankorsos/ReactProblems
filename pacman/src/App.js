import React, { Component } from 'react';
import Board from './Board';
import Pacman from './Pacman';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: 'notStarted',
      pacman: null,
      ghosts: []
    }

    window.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  handleKeyUp(e) {
    if (e.code === 'Space') {
      this.startGame();
    }
  }

  startGame() {
    // reset state
    this.setState({
      pacman: this.props.pacman,
      ghosts: this.props.ghosts
    })

    // start game
    this.setState({
      game: 'started'
    })

    const pacman = new Pacman(this.state, this.props, this.setState.bind(this));
  }

  render() {
    let panel;
    switch (this.state.game) {
      case 'started':
        panel = (
          <Board
            {...this.props}
            pacman={ this.state.pacman }
            ghosts={ this.state.ghosts }
          />
        );
        break;

      case 'lost':
        panel = (
          <div>You lost!</div>
        );
        break;

      case 'notStarted':
      default:
        panel = (
          <div>Press SPACE to start</div>
        );
    }

    return (
      <div className="App">
        <div className="header">
          <h2>Pacman</h2>
        </div>
        { panel }
      </div>
    );
  }
}

export default App;
