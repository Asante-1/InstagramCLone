import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import './suggestedprof.css'
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase';

function SuggestedProfile({spDocId, username, profileId, userId, loggedInUserDocId}) {
  const [followed, setFollowed] = useState(false)

  async function handleFollowUser() {
    setFollowed(true);

    
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
    await updateFollowedUserFollowers(spDocId, userId, false)



  }

  return !followed ? (
    <div className='sugg_profiles'>
      <div className='sugg__prof__name'>
        <img className='prof__image' alt='an_image'  src={`/images/users/avatars/${username}.jpg`} />
        <Link to={`/p/${username}`}> 
          <p className='suggested__username'>{username}</p>
        </Link>
      </div>
      <div className='follow__button'>
        <button className='follow' type='button' onClick={handleFollowUser} >
          Follow
        </button>
      </div>
    </div>
  ) : null

  
}

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  spDocId : propTypes.string.isRequired,
  username : propTypes.string.isRequired,
  profileId : propTypes.string.isRequired,
  userId : propTypes.string.isRequired,
  loggedInUserDocId : propTypes.string.isRequired
} 

