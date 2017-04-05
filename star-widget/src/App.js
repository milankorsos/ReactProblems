import React, { Component } from 'react';
import './App.css';

class Stars extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rating: 0
    };
  }

  clickHandler(rating) {
    this.setState({ rating }); // set internal rating
    this.props.changeRating(rating); // set rating for app
  }

  render() {
    const isSelected = (value) => value <= this.state.rating;

    return (
      <ul>
        <li onClick={ this.clickHandler.bind(this, 1) } className={ isSelected(1) ? 'selected' : '' }>&#9733;</li>
        <li onClick={ this.clickHandler.bind(this, 2) } className={ isSelected(2) ? 'selected' : '' }>&#9733;</li>
        <li onClick={ this.clickHandler.bind(this, 3) } className={ isSelected(3) ? 'selected' : '' }>&#9733;</li>
        <li onClick={ this.clickHandler.bind(this, 4) } className={ isSelected(4) ? 'selected' : '' }>&#9733;</li>
        <li onClick={ this.clickHandler.bind(this, 5) } className={ isSelected(5) ? 'selected' : '' }>&#9733;</li>
      </ul>
    );
  }
}

Stars.propTypes = {
  changeRating: React.PropTypes.func,
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rating: 0
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`handleSubmit name: ${this.state.name} rating: ${this.state.rating}`);
  }

  changeName(e) {
    this.setState({ name: e.target.value });
  }

  changeRating(rating) {
    this.setState({ rating });
  }

  render() {
    return (
      <form id="form" onSubmit={ this.handleSubmit.bind(this) }>
        <div>
          <label>Name:</label>
          <input name="name" type="text" onChange={ this.changeName.bind(this) } />
        </div>
        <div>
          <label>Ratings:</label>
          <input name="rating" type="hidden" value={ this.state.rating } />
          <Stars changeRating={ this.changeRating.bind(this) } />
        </div>
        <div>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default App;
