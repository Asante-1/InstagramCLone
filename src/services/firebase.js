import {firebaseapp, FieldValue, storage} from '../lib/firebase' 


export async function doesUsernameExist(username) {
    const result = await firebaseapp
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get()

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
    const result = await firebaseapp
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get()

    return result.docs.map((item) => ({
        ...item.data(),
        docId : item.id
    }))


}
export async function getUserObjectByUserId(userId) {
      const result = await firebaseapp
      .firestore()
      .collection('users')
      .where('userId', '==', userId)
      .get()

      const user = result.docs.map((item) => ({
          ...item.data(),
          docId: item.id
      }))

      return user;

}


export async function getSuggestedProfiles(userId, following) {
    const result = await firebaseapp.firestore().collection('users').limit(10).get()

    return result.docs
        .map((user) => ({ ...user.data(), docId : user.id}))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId))

    // return result.docs
    //     .map((user) => ({ ...user.data(), docId : user.id }))
    //     .filter((profile) => profile.userId !== userId  && !following.includes(profile.userId));

   

    // let query = firebaseapp.firestore().collection('users');

    // if(following.length > 0) {
    //     query = query.where('userId', 'not-in', [...following, userId])
    // }
    // else {
    //     query = query.where('userId', '!=', userId)
    // }

    // const result = await query.limit(10).get();

    // const profiles = result.docs.map((user) =>({
    //     ...user.data(),
    //     docId : user.id
    // }))
    
    // return profiles;    
}


export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id 
    profileId, // the user I request to follow id
    isFollowingProfile // (am i currently following this person? True or false)
    ) {
    return firebaseapp
        .firestore()
        .collection('users') 
        .doc(loggedInUserDocId)
        .update({
            following : isFollowingProfile ?
                FieldValue.arrayRemove(profileId) :
                FieldValue.arrayUnion(profileId)
        })
}

export async function updateFollowedUserFollowers(
    spDocId, 
    loggedInUserDocId,
    isFollowingProfile
    ) {
    return firebaseapp
        .firestore()
        .collection('users') 
        .doc(spDocId)
        .update({
            followers : isFollowingProfile ?
                FieldValue.arrayRemove(loggedInUserDocId) :
                FieldValue.arrayUnion(loggedInUserDocId)
        })
}


export async function getPhotos(userId, following) {
    const result = await firebaseapp
        .firestore()
        .collection('photos')
        .where('userId', 'in', [...following , userId] )
        .get()

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId : photo.id
    }))
    
    // console.log('userFollowedPhotos', userFollowedPhotos);

    const photoWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }

            const user = await getUserObjectByUserId(photo.userId);

            const { username } =  user[0];
            return { username, ...photo, userLikedPhoto };
        })
    )

    return photoWithUserDetails;

}

// export async function getUserPhotosByUsername(username) {
//     const [user] = await getUserByUsername(username)
//     const  result = firebaseapp.firestore().collection('photos').where('userId', '==', user.userId)
//     .get()

//     return result.docs.map((item) => ({
//       ...item.data(),
//       docId : item.id  
//     }))

// }


export async function getUserPhotosByUserId(userId) {
    const result = await firebaseapp
      .firestore()
      .collection('photos')
      .where('userId', '==', userId)
      .get();
  
    const photos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
    return photos;
  }
  
  export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebaseapp
      .firestore()
      .collection('users')
      .where('username', '==', loggedInUserUsername) // Festus (active logged in user)
      .where('following', 'array-contains', profileUserId)
      .get();
  
    const [response = {}] = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));
   
    return response.userId;
  }
  
  export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
  ) {
    // 1st param: karl's doc id
    // 2nd param: raphael's user id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
  }


  // export async function UpLoadUserPhotoAndCaptionToStorage({userId, image, caption}){

  //   const upload = await storage.ref(`images/${image.name}`).put(image)

    
  //   const upload = await firebaseapp
  //       .firestore()
  //       .collection('photos')
  //       .add({
  //           caption : caption,
  //           comments : [],
  //           dateCreated : firebase.firestore.FieldValue.serverTimestamp(),
  //           imageSrc : image,
  //           likes : [],
  //           userId : userId
  //       })
        
  // }