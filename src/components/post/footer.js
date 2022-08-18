import React from 'react';
import propTypes from 'prop-types';
import './footer.css'

function Footer({caption, username }) {
  return (
      <div className='footer__parent'>
          <span className='useraname__'>{username}</span>
          <span className='caption__this'>{caption}</span>
      </div>
  );
}

export default Footer;

Footer.propTypes ={
    caption : propTypes.string.isRequired,
    username : propTypes.string.isRequired,
}