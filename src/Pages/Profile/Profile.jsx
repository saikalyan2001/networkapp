import React, { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Posts from "../../SubPages/Posts/Posts";
import Likes from "../../SubPages/Likes/Likes";
import Saved from "../../SubPages/Saved/Saved";

function Profile() {
  const [activeSection, setActiveSection] = useState("posts");

  const renderSection = () => {
    switch (activeSection) {
      case "posts":
        return <Posts />;
      case "likes":
        return <Likes />;
      case "saved":
        return <Saved />;
      default:
        return <Posts />;
    }
  };

  return (
    <>
      <div className="main">
        <div className="home-container">
          <div className="profile-pic">
            <img
              className="profile"
              src="/images/profile.jpg"
              alt="profile-pic"
            />
          </div>

          <div className="network">
            <h1>Home</h1>

            <div className="network-info">
              <div className="info">
                <h4>12 M followers</h4>
                <h4>3 M following</h4>
              </div>

              <div className="info">
                <h4> 4.5 M likes</h4>
                <h4>1.2 M posts</h4>
              </div>
            </div>
            <p className="about">hello, follow for more content</p>
          </div>
        </div>

        <div className="logo">
          <h1>Samskrithi Network</h1>
        </div>
      </div>

      <div className="content">
        <h4 onClick={() => setActiveSection("posts")}>Posts</h4>
        <h4 onClick={() => setActiveSection("likes")}>Likes</h4>
        <h4 onClick={() => setActiveSection("saved")}>Saved</h4>
      </div>

      <div className="section-content">
        {renderSection()}
      </div>

    </>
  );
}

export default Profile;
