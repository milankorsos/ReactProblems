import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({
  counter,
  decrease,
  increase
}) => (
  <div>
    <h1>{ counter }</h1>
    <div>
      <button type="button" onClick={ () => decrease() }>-</button>
      <button type="button" onClick={ () => increase() }>+</button>
    </div>
  </div>
);

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  decrease: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired
}

export default Counter;