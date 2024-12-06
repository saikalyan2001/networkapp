import React from 'react';
import "./ProfilePage.css";
import ProfileTabs from '../../Components/Profile/ProfileTabs';
import ProfileHeader from '../../Components/Profile/ProfileHeader';
import ProfilePosts from '../../Components/Profile/ProfilePosts';
import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername';
import { Link, Link as RouterLink, useParams } from 'react-router-dom';

function ProfilePage() {

  const {username} = useParams()
  const {userProfile} = useGetUserProfileByUsername(username)
  
  const userNotFound = !userProfile

  
  if(userNotFound) return <UserNotFound />
  return (
    <div className='profile-page-container'>
        <div className='profile-header'>
           { userProfile && <ProfileHeader /> }
        </div>
        <div className='profile-posts'>
            <ProfileTabs />
            <ProfilePosts />
        </div>
    </div>
  )
}

export default ProfilePage;


const UserNotFound = () => {
  return (
    <div>
      <p>User Not Found</p>
      <Link as={RouterLink} to={"/"}>
       GO home
      </Link>
    </div>
  )
}