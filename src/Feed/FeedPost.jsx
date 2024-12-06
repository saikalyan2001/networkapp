import React from 'react'
import useGetUserProfileById from '../hooks/useGetUserProfileById'
import PostHeader from '../Components/PostHeader/PostHeader';
import PostFooter from '../Components/PostFooter/PostFooter';

const FeedPost = ({ post }) => {
    const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <>
    <div style={{marginTop: "80px"}}>

    <PostHeader post={post} creatorProfile={userProfile} />
    <div>
        <img src={post.imageURL} alt={"Feed image"} style={{width: '400px'}}/>
    </div>
    <PostFooter post={post} creatorProfile={userProfile} />
    </div>

    </>
  )
}

export default FeedPost
