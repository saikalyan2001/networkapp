import React from "react";
import "./SuggestedUser.css";
import useAuthStore from "../store/authStore";
import useFollowUser from "../hooks/useFollowUser";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };
  

  return (
    <div className="suggested-user-container">
      <div className="user-info">
        <Link to={`/${user.username}`}>
          <img
            src={user.profilePicURL}
            alt="profile-pic"
            className="suggested-pic"
          />
        </Link>

        <div className="suggested-name-container">
        <Link to={`/${user.username}`} className="pro-name">
          <div className="pro-name">{user.fullName}</div>
          </Link>

          <div className="suggest-info">Suggested for you</div>
        </div>
      </div>

      {authUser.uid !== user.uid && (
        <button
          className="pro-follow"
          onClick={onFollowUser}
          disabled={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default SuggestedUser;
