import React from 'react';
import "./PostModalMiddle.css";
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/timeAgo';

const PostModalMiddle = ({ comment }) => {
  const { userProfile } = useGetUserProfileById(comment.createdBy);


  if (!userProfile) {
    // Render a loading or fallback UI when userProfile is null
    return <div>Loading...</div>;
  }

  return (
    <>
              
            <div className="modal-text-middle">
              <Link to={`/${userProfile.username}`}>
              <img
                src= {userProfile.profilePicURL}
                alt="pro-pic"
                className="pro-pic"
              />
              </Link>
              <div className="middle-text">
              <Link to={`/${userProfile.username}`} className='post-modal-username'>

              <p className="modal-text">
                {userProfile.username}
              </p>
              </Link>
              <p>{comment.comment}</p>
              <div className="modal-date">
                {timeAgo(comment.createdAt)}
              </div>
              </div>
            </div>

    </>
  )
}

export default PostModalMiddle;
