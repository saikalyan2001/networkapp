import React, { useRef, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { TbLocation } from "react-icons/tb";
import { BsSave, BsSaveFill } from "react-icons/bs";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";

const Comment = () => {

    const [commentChange, setCommentChange] = useState(false);
    const { isCommenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState("");
    const authUser = useAuthStore((state) => state.user);
    const commentRef = useRef(null);

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment("");
      };

      const handleCommentChange = (value) => {
        setCommentChange(value.trim() !== "");
      };


  return (
    <div>
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
  )
}

export default Comment
