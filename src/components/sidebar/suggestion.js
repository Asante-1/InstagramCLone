import React, { useEffect, useState } from 'react';
import './suggestion.css'
import propTypes from 'prop-types'
import { Skeleton } from '@mui/material';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profiles';


function Suggestion({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null) 

  // go ahead and get the suggested profiles 
  useEffect(() => {
    async function suggestedProfiless() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response)
    }
    
    if (userId) {
      suggestedProfiless();
    }

  },[userId])

  // hint : use firebase service (call using the userId)
  // getSuggestedProfiles
  // call the async function  ***  within useEffect
  // store it in state
  // go ahead and render (wait on the profiles as 'skeleton')

  return !profiles ? (
    <Skeleton className='skeleton_suggestion' variant='rectangular' animation='wave' width={300} height={300} />
  ) : profiles.length > 0 ? (
    <div className='suggestion__parent'>
      <div className='for_you_header'>
       <p className='suggestions_for_you'>Suggestions for you</p>
       <div>
         {profiles.map((profile) => (
           <SuggestedProfile
              key={profile.docId}
              spDocId = {profile.docId}
              username = {profile.username}
              profileId = {profile.userId}
              userId = {userId}
              loggedInUserDocId = {loggedInUserDocId}
           />
         ))}
         
       </div>
      </div>
      
    </div>
  ) : null;

}

export default Suggestion;

Suggestion.propTypes = {
    userId : propTypes.string,
    following : propTypes.array,
    loggedInUserDocId : propTypes.string
}
