import React from 'react';
import "./ProfileTabs.css";
import { BsGrid3X3 } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { LiaUserTagSolid } from "react-icons/lia";

function ProfileTabs() {
  return (
    <div className='profile-tab-container'>
      <div className='tabs post-tab'>
        <BsGrid3X3 className='tab-icon' />
        <p>POSTS</p>
      </div>
      <div className='tabs'>
        <BsSave className='tab-icon'  />
        <p>SAVED</p>
      </div>
      <div className='tabs'>
        <LiaUserTagSolid className='tab-icon'  />
        <p>TAGGED</p>
      </div>
    </div>
  )
}

export default ProfileTabs;
