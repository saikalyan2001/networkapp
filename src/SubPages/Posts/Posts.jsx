import React from "react";
import "./Posts.css";

function Posts({posts }) {
  return (
    <>
      <div className="posts-container">
        <h3>Posts</h3>
        {/* {posts.map((post, index) => (
          <li key={index}>
            {post.name}
          </li>
        ))} */}
      </div>
    </>
  );
}

export default Posts;
