import React from 'react';
import "./ProfilePosts.css";
import ProfilePost from './ProfilePost';
import useGetUserPosts from '../../hooks/useGetUserPosts';

const ProfilePosts = () => {

  const {posts} = useGetUserPosts()

  const noPostsFound = posts.length === 0;
  if(noPostsFound) return <NoPostsFound />

  return (
    <div className='profile-post-container'>

      {posts.map((post) => (
        <ProfilePost post={post} key={post.id} />
      ))}
    </div>
  )
}

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <div>
      <p>No Posts Found</p>
    </div>
  );
};