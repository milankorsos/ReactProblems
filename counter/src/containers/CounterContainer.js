import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increaseCounter } from '../actions';
import { decreaseCounter } from '../actions';

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    increase: () => dispatch(increaseCounter()),
    decrease: () => dispatch(decreaseCounter())
  }
};

const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

export default CounterContainer;
