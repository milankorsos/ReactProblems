import { combineReducers } from 'redux'
import { INCREASE_COUNTER } from './actionTypes';
import { DECREASE_COUNTER } from './actionTypes';
import { CLEAR_IMAGES } from './actionTypes';
import { FETCH_IMAGES_SUCCESS } from './actionTypes';

function counter(state = 0, action) {
  switch (action.type) {
    case INCREASE_COUNTER:
      return state + 1;

    case DECREASE_COUNTER:
      return state - 1;

    default:
      return state;
  }
}

function images(state = [], action) {
  switch (action.type) {
    case FETCH_IMAGES_SUCCESS:
      return action.payload;

    case CLEAR_IMAGES:
      return [];

    default:
      return state;
  }
}

const app = combineReducers({
  counter,
  images
});

export default app;
