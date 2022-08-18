import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import { UpLoadUserPhotoAndCaptionToStorage } from '../services/firebase'

function Upload__photo() {
    const [submit, setSubmit] = useState(false)

    const [{ User, imageUrl, Caption}, dispatch] = useStateValue()

    
    useEffect(() => {

        dispatch({
            type : "SUBMIT",
            item : setSubmit
        })

        async function upLoadLoggedInUser() {
           const response = await UpLoadUserPhotoAndCaptionToStorage( User.uid, imageUrl, Caption )
           

        }

        if (User.uid) {
            dispatch({
            type : "SUBMIT",
            item : setSubmit
        })
        }
    },[User.uid])


  return (
    <div>upload__photo</div>
  )
}

export default Upload__photo