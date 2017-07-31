import React from 'react';
import PropTypes from 'prop-types';

const Images = ({
  clear,
  load,
  images
}) => (
  <div>
    <div>
      <button type="button" onClick={ () => clear() }>Clear</button>
      <button type="button" onClick={ () => load('mt whitney') }>Load</button>
    </div>
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

Images.propTypes = {
  clear: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired
}

export default Images;