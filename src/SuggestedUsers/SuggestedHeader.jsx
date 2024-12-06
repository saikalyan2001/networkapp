import React from "react";
import "./SuggestedHeader.css";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function SuggestedHeader() {
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <div className="suggested-header-container">
      <div className="suggested-header">
        <Link to={`${authUser.username}`}>
          {authUser.profilePicURL ? (
            <img
              src={authUser.profilePicURL}
              alt="profile-pic"
              className="pro-pic"
            />
          ) : (
            <FaUserCircle className="pro-pic-icon" />
          )}{" "}
        </Link>
        {/* <img src={authUser.profilePicURL} alt="profile-pic" className='pro-pic' /> */}

        <Link to={`${authUser.username}`} className="pro-name">
          <p>{authUser.username}</p>
        </Link>
      </div>

      <a href="" className="switch-link">
        Switch
      </a>
    </div>
  );
}

export default SuggestedHeader;
