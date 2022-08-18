import React, { useState } from 'react';
import propTypes from 'prop-types';
import {formatDistance} from 'date-fns'
import { Link } from 'react-router-dom';
import './header.css'
import AddComment from './add-comment';



function Comments({docId, comments : allComments, posted, commentInput}) {
    const [comments, setComments] = useState(allComments)
    

    return (
      <>
         <div>
            {comments.length >= 3 && (
                <p className='small'>View all comments</p>
            )}

            {comments.slice(0, 3).map((item) => (
                <p key={`${item.comment} - ${item.displayName}`}>
                    <Link to={`/p/${item.displayName}`}>
                      <span className='useraname__'>{item.displayName}</span>
                      <span className='caption__this'>{item.comment}</span>
                    </Link>
                </p>     
            ))} 
            <p className='date__'>{formatDistance(posted, new Date())} ago</p>
         </div>
         <AddComment docId={docId} comments={comments} setComments={setComments} commentInput={commentInput} />
      </>
  );
}

export default Comments;

Comments.propTypes = {
    docId : propTypes.string.isRequired,
    comments : propTypes.array.isRequired,
    posted : propTypes.number.isRequired,
    commentInput : propTypes.object.isRequired

}