import { INCREASE_COUNTER } from './actionTypes';
import { DECREASE_COUNTER } from './actionTypes';
import { CLEAR_IMAGES } from './actionTypes';
import { FETCH_IMAGES_REQUEST } from './actionTypes';
import { FETCH_IMAGES_SUCCESS } from './actionTypes';
import { FETCH_IMAGES_FAILURE } from './actionTypes';

export function increaseCounter() {
  return {
    type: INCREASE_COUNTER
  }
}

export function decreaseCounter() {
  return {
    type: DECREASE_COUNTER
  }
}

export function clearImages() {
  return {
    type: CLEAR_IMAGES
  }
}

function fetchImagesRequest(query) {
  return {
    type: FETCH_IMAGES_REQUEST,
    query
  }
}

function fetchImagesSuccess(images) {
  return {
    type: FETCH_IMAGES_SUCCESS,
    images
  }
}

function fetchImagesFailure(error) {
  return {
    type: FETCH_IMAGES_FAILURE,
    error
  }
}

export function fetchImages(query) {
  return (dispatch) => {
    dispatch(fetchImagesRequest(query));

    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
    url += '&api_key=4e258a4396bf5ba0448b2e2fe574034e';
    url += `&text=${query}`;
    url += '&per_page=12';
    url += '&sort=interestingness-desc';
    url += '&format=json&nojsoncallback=?';

    return fetch(url)
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
        dispatch(fetchImagesSuccess(images));
      })
      .catch(error => {
        dispatch(fetchImagesFailure(error));
      });
  }
}
