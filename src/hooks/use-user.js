import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { getUserObjectByUserId } from '../services/firebase';



function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const [{ User }, dispatch] = useStateValue() 

    useEffect(() => {
        async function getUserObjectByUserid() {
        // a function that gets user data from the firebase service  based on the userId
        
        const [response] = await getUserObjectByUserId(User.uid)
        
        // console.log('response', response)
        setActiveUser(response);
        }
        if (User?.uid) {
            getUserObjectByUserid()
        }
        
        
    }, [User])

    return {User : activeUser};

}

export default useUser;