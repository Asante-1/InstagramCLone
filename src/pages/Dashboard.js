import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import './dashboard.css'
import { useStateValue } from  '../context/StateProvider'
import { firebaseapp, storage } from '../lib/firebase';
import firebase from 'firebase/compat/app'



function Dashboard() {

    const [open, setOpen] = useState(false)
    const [{set_open, modal_open, User} , dispatch] = useStateValue()
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0);

    const handleClose = () => {
      setOpen(false)
    } 

    const handleChange = (event) => {
      if (event.target.files[0]) {
        setImage(event.target.files[0]);
    }
    }


    const handleUpload = (event) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
            // progress function
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
        },
        (error) => {
            // Error fxn
            console.log(error.message)
        },

        () => {
          //complete fxn

          storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                  firebaseapp
                  .firestore()
                  .collection("photos").add({
                      dateCreated : Date.now(),
                      caption : caption,
                      imageSrc : url,
                      likes : [],
                      comments : [],
                      userId : User?.uid
                  });
                  setProgress(0);
                  setCaption("");
                  setImage(null);
                  setOpen(false)

              });

           }
      );
    };

    useEffect(() =>{
      document.title = 'Instagram'
      dispatch({
        type : "SET_OPEN",
        item : setOpen
      })

      dispatch({
        type : "OPEN",
        item : open
      })



     

  }, [open])

  return (
      <div className='dashboad__parent'>
          <Header />   
          {open && 
          <div className='modal'> 
                  
            <div className='modal_content'>
              <p>Uplaod an Image</p>
                <progress className="imageupload__progress w-100" value={progress} max="100"></progress>
                <input  onChange={handleChange} type='file'></input>
                <input type='text' placeholder='Enter your caption...' value={caption} onChange={(e) => setCaption(e.target.value)} />
                <button onClick={() => handleClose()}>Close</button>
                <button type='submit' onClick={handleUpload}  className='upload'>Upload</button>
              </div>        
            </div>
          
          }  
          <div className='dashboard__sub'>
            
            <Timeline />
            <Sidebar />
          </div>
         
        
      </div>
  );
}

export default Dashboard;


























// import React, { useEffect, useState } from 'react';
// import Header from '../components/header';
// import Sidebar from '../components/sidebar';
// import Timeline from '../components/timeline';
// import './dashboard.css'
// import { useStateValue } from  '../context/StateProvider'



// function Dashboard() {

//     const [open, setOpen] = useState(false)
//     const [{set_open, modal_open, Setsubmit} , dispatch] = useStateValue()
//     const [image, setImage] = useState(null)
//     const [caption, setCaption] = useState('')

//     const handleClose = () => {
//       setOpen(false)
//     } 



//     const handleUpload = (event) => {
//       Setsubmit()
//       setCaption('')
//       setOpen(false)
//     }

//     const handleChange = (event) => {
//         if (event.target.files[0]) {
//           setImage(event.target.files[0])

        
//     }

//     useEffect(() =>{
//         document.title = 'Instagram'
//         dispatch({
//           type : "SET_OPEN",
//           item : setOpen
//         })

//         dispatch({
//           type : "OPEN",
//           item : open
//         })

  

       

//     }, [open])

//   return (
//       <div className='dashboad__parent'>
//           <Header />   
//           {open && 
//           <div className='modal'> 
                  
//             <div className='modal_content'>
//             <p>Uplaod an Image</p>
//               <input  onChange={handleChange} type='file'></input>
//               <input type='text' placeholder='Enter your caption...' value={caption} onChange={(e) => setCaption(e.target.value)} />
//               <button onClick={() => handleClose()}>Close</button>
//               <button type='submit' onClick={handleUpload}  className='upload'>Upload</button>
//             </div>        
//           </div>
          
//           }  
//           <div className='dashboard__sub'>
            
//             <Timeline />
//             <Sidebar />
//           </div>
         
        
//       </div>
//   );
// }

// export default Dashboard;
