import React, { Component } from 'react';

class Images extends Component {
  fetch() {
    const { setImages } = this.props;

    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
    url += '&api_key=4e258a4396bf5ba0448b2e2fe574034e';
    url += '&text=alpineglow';
    url += '&per_page=24';
    url += '&format=json&nojsoncallback=?';

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const images = data.photos.photo.map(item => {
          return {
            farm: item.farm,
            server: item.server,
            id: item.id,
            secret: item.secret,
            title: item.title
          };
        });

        setImages(images);
      });
  }

  clear() {
    const { setImages } = this.props;
    setImages([]);
  }

  render() {
    const { images } = this.props;
    return (
      <div>
        <button type="button" onClick={ this.clear.bind(this) }>Clear</button>
        <button type="button" onClick={ this.fetch.bind(this) }>Load</button>
        <div>
          {
            images.map(result => {
              const { farm, server, id, secret, title } = result;
              const src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`;
              return (
                <img src={ src } alt={ title } key={ id } />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Images;