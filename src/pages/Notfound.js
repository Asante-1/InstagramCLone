import React, { useEffect } from 'react';
import './sign-up.css'

function Notfound() {
    useEffect(() => {
        document.title = 'Not Found - Instagram'
    }, [])

  return (
      <div className='notfound'>
        <p>Not Found!</p>
  </div>
  );
}

export default Notfound;
