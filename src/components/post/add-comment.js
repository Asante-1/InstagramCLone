import { useState, useContext } from 'react'
import propTypes from 'prop-types';
import { useStateValue } from '../../context/StateProvider';
import './comment.css'
import { FieldValue, firebaseapp } from '../../lib/firebase';

function AddComment({docId, comments, setComments, commentInput }) {
  const [{User}, dispatch] = useStateValue()
  const [comment, setComment] = useState('')

  const displayName = User.displayName
  
  const handleSubmitComment = (event) => {
    event.preventDefault()

    setComments([...comments , { displayName, comment }])
    setComment('')

    return firebaseapp
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments : FieldValue.arrayUnion({ displayName, comment})
      })
  }

  return (
    <div className='add__comment__parent'>
      <form method='POST' onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault() }>
        <input aria-label='Add a comment' 
          autoComplete='off'
          name='add-comment' 
          placeholder='Add a comment...'
          value={comment}
          onChange={e => setComment(e.target.value)}
          ref={commentInput}
        /> 
        <button className={`comment__button ${!comment && 'disabled__comment'} `} type='button' disabled={comment.length < 1} onClick={handleSubmitComment} >Post</button>
      </form>
    </div>
  ) ;
}

export default AddComment;

AddComment.propTypes = {
  docId : propTypes.string.isRequired,
  comments : propTypes.array.isRequired,
  setComments : propTypes.func.isRequired,
  commentInput : propTypes.object
}
