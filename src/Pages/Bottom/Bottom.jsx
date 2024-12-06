import React, { useState } from "react";
import "./Bottom.css";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { TbLocation } from "react-icons/tb";
import { BsSave, BsSaveFill } from "react-icons/bs";

function Bottom() {
  const [liked, setLiked] = useState(true);
  const [likes, setLikes] = useState(900);
  const [commentChange, setCommentChange] = useState(false);
  const [saved, setSaved] = useState(true);

  const handleChangeSave = () => {
    setSaved(!saved);
  };

  const handleCommentChange = (value) => {
    setCommentChange(value.trim() !== "");
  };

  const handleChangeLike = () => {
    setLiked(!liked);

    if (liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };

  return (
    <>
          <div className="footer-content">
            <div className="love-icon" onClick={handleChangeLike}>
              {liked ? <IoMdHeartEmpty /> : <IoMdHeart className="heart" />}
            </div>
            <div className="comment-icon">
              <FiMessageCircle />
            </div>
            <div className="share-icon">
              <TbLocation />
            </div>
            <div className="save-icon" onClick={handleChangeSave}>
          { saved ? <BsSave /> : <BsSaveFill /> }
        </div> 
          </div>
          <p className="likes-count">{likes} likes</p>
          <p>
            Saikalyan_
            <span>Feeling good</span>
          </p>
          <p className="comments">View all 1,000 comments</p>

          <div className="com-container">
          <input
            type="text"
            placeholder="Add a comment..."
            className="input-comment"
            onChange={(e) => handleCommentChange(e.target.value)}
          />
          <span className="post-button">{commentChange ? "Post" : ''}</span>
          </div> 
    </>
  );
}

export default Bottom;



{
  /* <p className="save-icon" onClick={handleChangeSave}>
          { saved ? <BsSave /> : <BsSaveFill /> }
        </p> */
}
