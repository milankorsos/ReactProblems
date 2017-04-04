import React, { Component } from 'react';
import './Typeahead.css';

class ResultItem extends Component {
  onClick(item) {
    window.open(`https://twitter.com/${item.screen_name}`);
  }

  render() {
    const { item } = this.props;
    return (
        <li onClick={ this.onClick.bind(this, item) }>
          <div>
            <span className="name">{ item.name }</span>
            <span>@{ item.screen_name }</span>
          </div>
          <div>{ item.description }</div>
        </li>
    );
  }
}

class ResultsList extends Component {
  render() {
    const { filteredResults } = this.props;
    console.log('filteredResults', filteredResults)
    return (
      <ul>
      {
        filteredResults.map(item => {
          return <ResultItem
            item={ item }
            key={ item.id }
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
      filteredResults: []
    };
  }

  onChange(event) {
    const q = event.target.value;
    const { results } = this.props;
    let filteredResults;

    if (q.length) {
      filteredResults = results.filter(item => {
        const screenName = item.screen_name.toLowerCase();
        const name = item.name.toLowerCase();
        return screenName.indexOf(q) !== -1 || name.indexOf(q) !== -1;
      });
    } else {
      filteredResults = [];
    }

    // this.setState({ q });
    this.setState({ filteredResults });
  }

  render() {
    const { filteredResults } = this.state;
    return (
      <div id="typeahead">
        <SearchBar onChange={ this.onChange.bind(this) } />
        <ResultsList
          filteredResults={ filteredResults }
          {...this.props}
        />
      </div>
    );
  }
}

export default Typeahead;
