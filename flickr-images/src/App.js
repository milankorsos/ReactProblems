import React, { Component } from 'react';
import './App.css';

class Search extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const { fetchImages } = this.props;
    const q = this.refs.q.value;
    fetchImages(q);
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div id="header">
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input
            type="text"
            ref="q"
            disabled={ isFetching }
          />
        </form>
      </div>
    )
  }
}

class Image extends Component {
  render() {
    const { src, title } = this.props;
    return(
      <div className="pic">
        <img src={ src } alt={ title }/>
        <span>{ title }</span>
      </div>
    );
  }
}

class Images extends Component {
  render() {
    const { results } = this.props;
    return (
      <div id="results">
        {
          results.map(result => {
            const { farm, server, id, secret, title } = result;
            const src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`;
            return (
              <Image
                key={ id }
                src={ src }
                title={ title }
              />
            );
          })
        }
      </div>
    )
  }
}

// https://farm5.staticflickr.com/4184/34053531100_68f8a85d7e_q.jpg
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4e258a4396bf5ba0448b2e2fe574034e&text=Tahoe&per_page=12&format=json&nojsoncallback=?

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      q: '',
      isFetching: false,
      results: []
    };
  }

  fetchImages(q) {
    this.setState({
      isFetching: true,
      q
    });

    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
    url += '&api_key=4e258a4396bf5ba0448b2e2fe574034e';
    url += `&text=${q}`;
    url += '&per_page=24';
    url += '&format=json&nojsoncallback=?';

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const results = data.photos.photo.map(item => {
          return {
            farm: item.farm,
            server: item.server,
            id: item.id,
            secret: item.secret,
            title: item.title
          };
        })

        console.log('results', results)
        this.setState({
          isFetching: false,
          results
        })
      });
  }

  render() {
    return (
      <div>
        <Search
          fetchImages={ this.fetchImages.bind(this) }
          isFetching={ this.state.isFetching }
        />
        <Images
          results={ this.state.results }
        />
      </div>
    );
  }
}
export default App;
