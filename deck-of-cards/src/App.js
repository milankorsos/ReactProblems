import React, { Component } from 'react';
import './App.css';

class Card extends Component {
  render() {
    const { card: { suit, value } } = this.props;

    let suitIcon;
    let color = 'black';

    switch (suit) {
      case 'Spades':
        suitIcon = (
          <span>&spades;</span>
        );
        break;

      case 'Hearts':
        suitIcon = (
          <span>&hearts;</span>
        );
        color = 'red';
        break;

      case 'Diamonds':
        suitIcon = (
          <span>&diams;</span>
        );
        color = 'red';
        break;

      case 'Clubs':
      default:
        suitIcon = (
          <span>&clubs;</span>
        );
    }

    return (
      <div className={ `card ${color}`}>
        <span className="suit">{ suitIcon }</span>
        <span className="value">{ value }</span>
      </div>
    );
  }
}

class Hand extends Component {
  render() {
    const { hand } = this.props;
    return (
      <div className="hand">
        {
          hand.map((card, index) => {
            return (
              <Card key={ index } card={ card } />
            );
          })
        }
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const { deck, dealHand, prepDeck } = this.props;
    let button;

    if (deck.length) {
      button = (
        <button onClick={ dealHand.bind(this) }>
          Deal a new hand
        </button>
      );
    } else {
      button = (
        <button onClick={ prepDeck.bind(this) }>
          Restart
        </button>
      );
    }

    return (
      <div className="button">
        { button }
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: [],
      hand: []
    };
  }

  componentDidMount() {
    this.prepDeck();
  }

  // Generate the deck of cards & clear hand
  prepDeck() {
    const { CARD_SUITS, CARD_VALUES } = this.props;

    const deck = [];
    CARD_SUITS.forEach(suit => {
      CARD_VALUES.forEach(value => {
        const card = {
          suit,
          value
        };
        deck.push(card);
      });
    });

    this.setState({
      deck,
      hand: []
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Pick a card randomly from deck, remove it & return it
  getCardFromDeck() {
    const { deck } = this.state;
    if (!deck.length) {
      return null;
    }

    const cardIndex = this.getRandomInt(0, deck.length - 1);
    const card = deck[cardIndex];

    // Remove from deck
    deck.splice(cardIndex, 1);
    this.setState({ deck });

    return card;
  }

  // Get 5 random cards from deck & replace hand with new hand
  dealHand() {
    const { HAND_SIZE } = this.props;
    const { deck } = this.state;

    const hand = [];
    const handSize = Math.min(HAND_SIZE, deck.length);
    for (let i = 0; i < handSize; i++) {
      hand.push(this.getCardFromDeck());
    }

    this.setState({ hand });
  }

  render() {
    return (
      <div>
        <Button
          dealHand={ this.dealHand.bind(this) }
          prepDeck={ this.prepDeck.bind(this) }
          deck={ this.state.deck }
        />
        <Hand hand={ this.state.hand } />
      </div>
    );
  }
}

export default App;
