import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const CARD_SUITS = [
  "Spades",
  "Hearts",
  "Diamonds",
  "Clubs"
];

const CARD_VALUES = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"
];

// deal 5 random cards

ReactDOM.render(
  <App
    CARD_SUITS={ CARD_SUITS }
    CARD_VALUES={ CARD_VALUES }
    HAND_SIZE={ 5 }
  />,
  document.getElementById('root')
);
