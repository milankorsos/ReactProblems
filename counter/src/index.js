import './index.css';
import App from './components/App';
import app from './reducers';
import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

const loggerMiddleware = createLogger()

const store = createStore(
  app,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
