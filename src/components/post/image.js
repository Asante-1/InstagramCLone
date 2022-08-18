import React from 'react';
import propTypes from 'prop-types'
import './image.css'


function Image({ src, caption }) {
  return <img className='post__img' src={src} alt={caption} />;
}

export default Image;

Image.propTypes  = {
    src : propTypes.string.isRequired,
    caption : propTypes.string.isRequired
}