import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'
import './header.css'
import Image from './image'
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';



function Header({content}) {

  const commentInput = useRef(null)
  
  const handleFocus = () => commentInput.current.focus()


  return (
      <div className='post__header'>
          <div className='post__header_sub'>
             <Link className='prof__link' to={`/p/${content.username}`}>
                <img className='post_prof' src={`/images/users/avatars/${content.username}.jpg`} alt='could not show pic' />
                <p className='post__text'>{content.username}</p>
             </Link>
          </div>
          <div>
              <Image src={content.imageSrc} caption={content.caption} />
          </div>
          <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} />

          <Footer caption={content.caption} username={content.username} />

          <Comments docId={content.docId}  comments = {content.comments} posted={content.dateCreated} commentInput={commentInput} />
      </div>
  )
}

export default Header;

Header.propTypes = {
    content : propTypes.shape({
        username : propTypes.string.isRequired,
        imageSrc : propTypes.string.isRequired,
        caption : propTypes.string.isRequired,
        docId : propTypes.string.isRequired,
        userLikedPhoto : propTypes.bool.isRequired,
        likes : propTypes.array.isRequired,
        dateCreatded : propTypes.number.isRequired,
        comments : propTypes.array.isRequired

    })
}
