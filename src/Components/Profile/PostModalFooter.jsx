import React, { useRef, useState } from "react";
import "./PostModalFooter.css";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { TbLocation } from "react-icons/tb";
import { BsSave, BsSaveFill } from "react-icons/bs";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";

function PostModalFooter({ post, isProfilePage }) {
  const [commentChange, setCommentChange] = useState(false);
  const [saved, setSaved] = useState(true);
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  const handleChangeSave = () => {
    setSaved(!saved);
  };

  const handleCommentChange = (value) => {
    setCommentChange(value.trim() !== "");
  };

  return (
    <>
      <div className="post-footer-container">
        <div className="post-footer">
          <p className="post-footer-content">
            <span className="love-icon" onClick={handleLikePost}>
              {" "}
              {isLiked ? <IoMdHeart className="heart" /> : <IoMdHeartEmpty />}
            </span>
            <span
              className="comment-icon"
              onClick={() => commentRef.current.focus()}
            >
              <FiMessageCircle />
            </span>
            <span className="share-icon">
              <TbLocation />
            </span>
          </p>
          <p className="likes-count">{likes} likes</p>

          {/* {isProfilePage && <p>Posted {timeAgo(post.createdAt)}</p>} */}

          <p>Posted {timeAgo(post.createdAt)}</p>

          {authUser && (
            <div className="comment-container">
              <input
                type="text"
                placeholder="Add a comment..."
                className="post-modal-comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                ref={commentRef}
              />
              <span className="post-button" onClick={handleSubmitComment}>
                {" "}
                Post{" "}
              </span>
            </div>
          )}
        </div>
        <p className="save-modal-icon" onClick={handleChangeSave}>
          {saved ? <BsSave /> : <BsSaveFill />}
        </p>
      </div>
    </>
  );
}

export default PostModalFooter;
