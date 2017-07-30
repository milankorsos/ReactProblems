import React, { Component } from 'react';
import Counter from './Counter';
import Images from './Images';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      images: []
    }
  }

  increaseCounter() {
    let { count } = this.state;
    count += 1;
    this.setState({ count });
  }

  decreaseCounter() {
    let { count } = this.state;
    count -= 1;
    this.setState({ count });
  }

  setImages(images = []) {
    this.setState({ images });
  }

  render() {
    return (
      <div className="App">
        <Counter
          count={ this.state.count }
          increase={ this.increaseCounter.bind(this) }
          decrease={ this.decreaseCounter.bind(this) }
        />
        <hr />
        <Images
          images={ this.state.images }
          setImages={ this.setImages.bind(this) }
        />
      </div>
    );
  }
}

export default App;
