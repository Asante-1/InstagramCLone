import { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import { DEFAULT_IMAGE_PATH } from '../../constants/path';
import { useStateValue } from '../../context/StateProvider';

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername
  }
}) {

  const [{User}, dispatch] = useStateValue()
  const { user } = useUser();

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = User?.displayName && User?.displayName !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, User.uid, profileDocId, profileUserId, User.uid);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(User.displayName, profileUserId);
      setIsFollowingProfile(!!isFollowing);
    };

    if (User?.displayName && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [User?.displayName, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mt-2 mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${fullName} profile piture`}
            src={`/images/users/avatars/${profileUsername}.jpg`}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        ) : (
          <Skeleton  variant='circular' animation='wave' width={200} height={200}  />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && isFollowingProfile === null ? (
            <Skeleton  variant='circular' animation='wave' width={30} height={20}  />
          ) : (
            activeBtnFollow && (
              <button
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow()
                  }
                }}
              >
                {isFollowingProfile ? 'Unfollow' : 'Follow'}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton  variant='circular' animation='wave' width={627} height={24}  />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!fullName ? <Skeleton  variant='circular' animation='wave'  height={10}  /> : fullName}</p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: propTypes.number.isRequired,
  followerCount: propTypes.number.isRequired,
  setFollowerCount: propTypes.func.isRequired,
  profile: propTypes.shape({
    docId: propTypes.string,
    userId: propTypes.string,
    fullName: propTypes.string,
    username: propTypes.string,
    followers: propTypes.array,
    following: propTypes.array
  }).isRequired
};


// import React from 'react'
// import { useState, useEffect } from 'react'
// import propTypes from 'prop-types';
// import Skeleton from 'react-loading-skeleton';
// import useUser from '../../hooks/use-user';
// import { isUserFollowingProfile, isLoggedInUserFollowingProfile } from '../../services/firebase';


// function Header({ 
//     photosCount, 
//     followerCount,
//     profile : {
//     docId : profileDocId, 
//     userId : profileUserId,
//     username : profileUsername, 
//     fullName, 
//     following,
//     followers,
//     },  

//     }) {
//     const [isFollowingProfile, setIsFollowingProfile] = useState(false)
//     const { user } = useUser()

//     useEffect(() => {
//         const isLoggedInUserFollowingProfile = async () => {
//             const isFollowing = await isUserFollowingProfile(user.username, profileUserId)
//             setIsFollowingProfile(isFollowing)
//         } 

//         if (user?.username && profileUserId) {
//             isLoggedInUserFollowingProfile()
//         }

//     },[user?.username, profileUserId])

//     return (
//             <div>   
//                 <img src={`/images/users/avatars/${profileUsername}.jpg`} />    
//             </div>
//     )
    
// }

// export default Header

// Header.propTypes ={
//     photosCount : propTypes.number.isRequired,
//     followerCount : propTypes.number.isRequired,
//     profile : propTypes.shape({
//         docId : propTypes.string,
//         userId : propTypes.string,
//         fullName : propTypes.string,
//         following : propTypes.array
//     }).isRequired
// }