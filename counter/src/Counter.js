import React, { Component } from 'react';

class Counter extends Component {
  render() {
    const { count, increase, decrease } = this.props;
    return (
      <div>
        <h1>{ count }</h1>
        <button type="button" onClick={ decrease.bind(this) }>-</button>
        <button type="button" onClick={ increase.bind(this) }>+</button>
      </div>
    );
  }
}

export default Counter;