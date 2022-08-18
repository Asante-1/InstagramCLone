import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { getPhotos, getUserObjectByUserId } from '../services/firebase';


function usePhotos() {
    const [{User}, dispatch] = useStateValue()

    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following }] = await getUserObjectByUserId(User.uid)
 


            if (following.length > 0){
               const followedUserPhotos = await getPhotos(User.uid, following)
               
               // re-arrange array to be the newest photos first by dateCreated
                followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos)

            }

        }
   
        
        getTimelinePhotos()

    }, [User?.uid])

    return { photos }
}
export default usePhotos;
