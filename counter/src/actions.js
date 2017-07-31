import { INCREASE_COUNTER } from './actionTypes';
import { DECREASE_COUNTER } from './actionTypes';
import { CLEAR_IMAGES } from './actionTypes';
import { FETCH_IMAGES_REQUEST } from './actionTypes';
import { FETCH_IMAGES_SUCCESS } from './actionTypes';
import { FETCH_IMAGES_FAILURE } from './actionTypes';

import { createAction } from 'redux-actions';

export const increaseCounter = createAction(INCREASE_COUNTER);
export const decreaseCounter = createAction(DECREASE_COUNTER);

export const clearImages = createAction(CLEAR_IMAGES);

const fetchImagesRequest = createAction(FETCH_IMAGES_REQUEST);
const fetchImagesSuccess = createAction(FETCH_IMAGES_SUCCESS);
const fetchImagesFailure = createAction(FETCH_IMAGES_FAILURE);


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
