import React from 'react';
import "./Feed.css";
import Top from '../Pages/Explore/Top';
import Bottom from '../Pages/Bottom/Bottom';


function Feed({posts}) {
  return (
    <>
    <div className='container-post'>
    {posts.map((post, index) => (
            <li key={index} className="p">
              <Top />
              {post.media && <img src={post.media} alt="media" className="media" />}
              <Bottom />
            </li>
          ))}
    </div>
    </>
  );
}

export default Feed;
