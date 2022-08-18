import React, { memo } from 'react';
import './user.css'
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
// import Skeleton from 'react-loading-skeleton';


function User({ username, fullName}) {
  return !username || !fullName ? (
      <Skeleton className='skeleton' animation='wave' variant='circular' width={100} height={40} /> 
  ) : (
      <Link to={`/p/${username}`}>
          <div className='user__profile'>
            <div className='profile'>
              <img className='user__image' src={`/images/users/avatars/${username}.jpg`} />
            </div>         
            <div className='user__name'>
              <p className='username'>{username}</p>
              <p className='fullname'>{fullName}</p>
            </div>
          </div>
      </Link>
  )
}

export default User;

User.propTypes = {
    username : propTypes.string.isRequired,
    fullName : propTypes.string.isRequired
}






