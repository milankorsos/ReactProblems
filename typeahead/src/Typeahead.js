import React, { Component } from 'react';
import './Typeahead.css';

class ResultItem extends Component {
  onClick(screen_name) {
    window.open(`https://twitter.com/${screen_name}`);
  }

  render() {
    const {
      item: {
        screen_name,
        name,
        description
      },
      index,
      selectedIndex,
      q
    } = this.props;

    const qIndex = screen_name.toLowerCase().indexOf(q.toLowerCase());
    const head = screen_name.slice(0, qIndex);
    const tail = screen_name.slice(qIndex + q.length);

    const className = selectedIndex === index ? 'selected' : '';
    return (
        <li
          onClick={ this.onClick.bind(this, screen_name) }
          className={ className }
        >
          <div>
            <span className="name">{ name }</span>
            <span>@{ head }<strong>{ q }</strong>{ tail }</span>
          </div>
          <div>{ description }</div>
        </li>
    );
  }
}

class ResultsList extends Component {

  render() {
    const { filteredResults } = this.props;
    return (
      <ul>
      {
        filteredResults.map((item, index) => {
          return <ResultItem
            item={ item }
            index={ index }
            key={ item.id }
            {...this.props}
          />
        })
      }
      </ul>
    );
  }
}

class SearchBar extends Component {
  render() {
    return (
      <input
        type="input"
        placeholder="Search for twitter users"
        onChange={ this.props.onChange }
      />
    );
  }
}

class Typeahead extends Component {

  constructor(props) {
    super(props);

    this.state = {
      q: '',
      filteredResults: [],
      selectedIndex: -1
    };

    window.addEventListener('keyup', this.handleKeyUp.bind(this), false);

  }

  onChange(event) {
    const q = event.target.value;
    const { results } = this.props;
    let filteredResults;

    if (q.length) {
      filteredResults = results.filter(item => {
        const screenName = item.screen_name.toLowerCase();
        return screenName.indexOf(q.toLowerCase()) !== -1;
      });
    } else {
      filteredResults = [];
    }

    this.setState({
      q,
      filteredResults,
      selectedIndex: -1
    });
  }

  handleKeyUp(event) {
    const { filteredResults } = this.state;
    let { selectedIndex } = this.state;

    switch (event.code) {
      case 'ArrowUp':
        if (selectedIndex > -1) {
          selectedIndex--;
        }
        break;
      case 'ArrowDown':
        if (selectedIndex < filteredResults.length - 1) {
          selectedIndex++;
        }
        break;
      case 'Enter':
        if (selectedIndex !== -1) {
          const screenName = filteredResults[selectedIndex].screen_name;
          window.open(`https://twitter.com/${screenName}`);
        }
        break;
      default:
    }
    this.setState({ selectedIndex });
  }


  render() {
    const { filteredResults, q, selectedIndex } = this.state;
    return (
      <div id="typeahead">
        <SearchBar onChange={ this.onChange.bind(this) } />
        <ResultsList
          q={ q }
          selectedIndex={ selectedIndex }
          filteredResults={ filteredResults }
          {...this.props}
        />
      </div>
    );
  }
}

export default Typeahead;
