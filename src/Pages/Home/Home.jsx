import React from "react";
import "./Home.css";
import Feed from "../../Feed/Feed";
import SuggestedUsers from "../../SuggestedUsers/SuggestedUsers";
import FeedPosts from "../../Feed/FeedPosts";

function Home({ posts }) {
  return (
    <>
      <div className="home-main-container">
        <div className="home-posts-container">
          <FeedPosts posts={posts} />
        </div>
        <div>
          <SuggestedUsers />
        </div>
      </div>
    </>
  );
}

export default Home;
