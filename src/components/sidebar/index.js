import React from 'react';
import useUser from '../../hooks/use-user';
import Suggestion from './suggestion';
import User from './user';
import './sidebar.css'


function Sidebar() {
  // const {
  //   User : { fullName, username, userId}
  
  // } = useUser();
  const {
    User : { docId, fullName, username, userId, following}
  
  } = useUser()




  

  return (
    <div className='sidebar'>
      <User username={username} fullName={fullName} />
      <Suggestion userId={userId} following={following} loggedInUserDocId={docId} />

    </div>
  )
  
}

export default Sidebar;