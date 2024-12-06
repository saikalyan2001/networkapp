import React from "react";
import "./Top.css";
import { MdOutlineAccountCircle } from "react-icons/md";

function Top() {
  return (
    <>
      <div className="container">
        <div className="header-container">
          <img src="/images/profile.jpg" alt="profile" className="pro-pic" />
          <div className="name-container">
            Saikalyan
            <div className="date">. 1w .</div>
            <div className="follow-text">Follow</div>
          </div>
        </div>
        <div className="option">...</div>
      </div>
    </>
  );
};

export default Top;
