import React from 'react';
import './timeline.css'
import { Skeleton } from '@mui/material';
import usePhotos from '../hooks/use-photos';
import Post from './post';



function Timeline() {
    const { photos } = usePhotos();
    
    console.log('photos', photos)
  // we need to get logged in user's photos
  // onloading photos we need to use react skeleton
  // if we have photos, render then create  post component
  // if user has no photos, tell them to create some photos

  return (
      <div className='timeline__parent'>
          {!photos ? (
            <>
                <Skeleton variant='rectangular' animation='wave' width={380} height={500} />
                <br/>
                <Skeleton variant='rectangular' animation='wave' width={380} height={500} />
                <br/>
                <Skeleton variant='rectangular' animation='wave' width={380} height={500} />

            </>
          ) : photos.length > 0 ? (
            photos.map((content) => <Post key={content.docId} content={content} ></Post>)
          ) : (
            <p>Follow people to see their  photos</p>
          )}

          {/* <h4>iodh</h4> */}
      </div>
  );
}

export default Timeline;
