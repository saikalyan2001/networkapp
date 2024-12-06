import React from "react";
import "./PostHeader.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { FaUserCircle } from "react-icons/fa";
import { timeAgo } from "../../utils/timeAgo";

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
    post.createdBy
  );

  return (
    <>
      <div className="post-header-container">
        <div className="post-left-header">

{creatorProfile ? (
    <Link to={`/${creatorProfile.username}`}>
        {creatorProfile.profilePicURL ? (
            <img
                src={creatorProfile.profilePicURL}
                alt="user profile pic"
                className="post-pic"
            />
        ) : (
            <FaUserCircle
                className="default-icon" // You can style this class in CSS
                size={40} // Adjust size as needed
                style={{ color: "#ccc" }} // Optional: Customize the icon color
            />
        )}
    </Link>
) : (
    "h"
)}


          <div className="post-header-content">
            {creatorProfile ? (
              <Link to={`/${creatorProfile.username}`} className="profile-name">
                <span>
                  {" "}
                  {creatorProfile.username} <br />{" "}
                </span>
              </Link>
            ) : (
              "q"
            )}
            <span className="post-date">. 
              {timeAgo(post.createdAt)}
            </span>
          </div>
        </div>

        <div>
          <button className="follow" onClick={handleFollowUser}>{isFollowing ? "Unfollow" : "Follow"}</button>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
