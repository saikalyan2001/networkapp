import React, { useState } from "react";
import "./ProfileHeader.css";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import { FaUserCircle } from "react-icons/fa";

function ProfileHeader() {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile.username;

  const hadleProfileEdit = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-header-container">
      <div>
        {userProfile.profilePicURL ? (
          <img
            className="profile"
            src={userProfile.profilePicURL}
            alt="profile-pic"
          />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}{" "}
        {/* <img className="profile" src="/images/profile.jpg" alt="profile-pic" /> */}
      </div>

      <div className="content-header">
        <div className="name-section">
          <p>{userProfile.username}</p>

          {visitingOwnProfileAndAuth && (
            <div>
              <button className="pro-edit-btn" onClick={hadleProfileEdit}>
                Edit profile
              </button>
            </div>
          )}

          {visitingAnotherProfileAndAuth && (
            <div>
              <button className="pro-edit-btn" onClick={handleFollowUser}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}
        </div>

        <div className="pro-info">
          <p>
            <span className="number">{userProfile.posts.length}</span>
            posts
          </p>
          <p>
            <span className="number">{userProfile.followers.length}</span>
            followers
          </p>
          <p>
            <span className="number">{userProfile.following.length}</span>
            following
          </p>
        </div>
        <div>
          <p className="name">{userProfile.fullName}</p>
        </div>
        <p className="pro-desc">{userProfile.bio}</p>
      </div>
      {isOpen && <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default ProfileHeader;
