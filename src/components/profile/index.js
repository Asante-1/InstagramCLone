import { useReducer, useEffect } from 'react';
import propTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUserId } from '../../services/firebase';

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: propTypes.shape({
    dateCreated: propTypes.number,
    emailAddress: propTypes.string,
    followers: propTypes.array,
    following: propTypes.array,
    fullName: propTypes.string,
    userId: propTypes.string,
    username: propTypes.string
  })
};



// import propTypes from 'prop-types';
// import Header from './header';
// import React, { useEffect } from 'react'
// import { useStateValue } from '../../context/StateProvider';
// import { getUserPhotosByUserId } from '../../services/firebase';
// import Photos from './photos';

// function Profile({ user }) {
    
//     const [{profile, photosCollection, followerCount}, dispatch] = useStateValue()

//     useEffect(() => {
//         async function getProfileInfoAndPhotos()  {
            
//             const photos = await getUserPhotosByUserId(user.username)
           
//             dispatch({
//                 type : 'PROFILE',
//                 item : user
//             })

//             dispatch({
//                 type : 'PHOTOS_COLLECTION',
//                 item : photos
//             })

//             dispatch({
//                 type : 'FOLLOWER_COUNT',
//                 item : user.followers.length
//             })

//         }


//         getProfileInfoAndPhotos()
//     }, [user.username]) 

//     return (
//     <> 
//         {/* <Header  photoCount={photosCollection ? photosCollection.length : 0} profile={profile} followerCount={followerCount} />
//         <Photos 
//             photos={photosCollection}
//         /> */}
//         <p>kwnio</p>
//     </>
//     )
     
// }

// export default Profile

// Profile.propTypes = {
//     user : propTypes.shape({
//         dateCreatded : propTypes.number.isRequired,
//         emailAddress : propTypes.string.isRequired,
//         followers : propTypes.array.isRequired,
//         following : propTypes.array.isRequired,
//         fullName : propTypes.string.isRequired,
//         userId : propTypes.string.isRequired,
//         username : propTypes.string.isRequired
//     }) 
// } 




