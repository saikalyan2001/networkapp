import React, { useRef, useState } from "react";
import "./PostFooter.css";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { TbLocation } from "react-icons/tb";
import { BsSave, BsSaveFill } from "react-icons/bs";
import useAuthStore from "../../store/authStore";
import usePostComment from "../../hooks/usePostComment";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const [iscommentModal, setIscommentModal] = useState(false);

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
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

          {isProfilePage && <p>Posted {timeAgo(post.createdAt)}</p>}

          {!isProfilePage && (
            <>
              <div>
                {creatorProfile?.username}
                <p>{post.caption}</p>
              </div>
              {post.comments.length > 0 && (
                <p
                  className="view_all_comments"
                  onClick={() => setIscommentModal(!iscommentModal)}
                >
                  View all {post.comments.length} comments
                </p>
              )}
              {iscommentModal ? <CommentsModal iscommentModal={iscommentModal} setIscommentModal={setIscommentModal} post={post} /> : null}
            </>
          )}

          {authUser && (
            <div className="comment-container">
              <input
                type="text"
                placeholder="Add a comment..."
                className="post-comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                ref={commentRef}
              />
              <span className="post-button" onClick={handleSubmitComment}>
                {comment ? "Post" : ""}
              </span>
            </div>
          )}
        </div>
        {/* <p className="save-icon" onClick={handleChangeSave}>
          { saved ? <BsSave /> : <BsSaveFill /> }
        </p> */}
      </div>
    </>
  );
};

export default PostFooter;
