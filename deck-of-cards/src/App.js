import React, { Component } from 'react';
import './App.css';


class Card extends Component {

  renderHearts() {
    return (
      <span>&hearts;</span>
    )
  }

  renderSpades() {
    return (
      <span>&spades;</span>
    )
  }

  renderDiamonds() {
    return (
      <span>&diams;</span>
    )
  }

  renderClubs() {
    return (
      <span>&clubs;</span>
    )
  }

  render() {
    const { card: { suit, value } } = this.props;

    let suitIcon;
    let color = 'black';
    switch (suit) {
      case 'Spades':
        suitIcon = this.renderSpades();
        break;
      case 'Hearts':
        suitIcon = this.renderHearts();
        color = 'red';
        break;
      case 'Diamonds':
        suitIcon = this.renderDiamonds();
        color = 'red';
        break;
      case 'Clubs':
        suitIcon = this.renderClubs();
        break;
      default:
        break
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

  // Clear the hand & generate the deck of cards
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

    // Clear the hand & reset deck
    this.setState({
      deck,
      hand: []
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getCardFromDeck() {
    // Pick a card randomly from deck, remove it from deck & return it
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

  dealHand() {
    const { HAND_SIZE } = this.props;
    const { deck } = this.state;
    // Get 5 random cards from deck & replace hand with new hand

    const hand = [];
    const handSize = Math.min(HAND_SIZE, deck.length);
    for (let i = 0; i < handSize; i++) {
      const card = this.getCardFromDeck();
      if (card) {
        hand.push(card);
      }
    }

    this.setState({ hand });
  }

  render() {
    const deckSize = this.state.deck.length;
    return (
      <div>
        <button onClick={ this.dealHand.bind(this) }>
          Deal a new hand
        </button>
        <div>Deck size: { deckSize }</div>
        <Hand hand={ this.state.hand } />
      </div>
    );
  }
}

export default App;
