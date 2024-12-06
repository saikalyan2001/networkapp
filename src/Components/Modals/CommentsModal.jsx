import React, { useEffect, useRef } from "react";
import "./CommentsModal.css";
import { MdClose } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostModalMiddle from "../Profile/PostModalMiddle";
import usePostComment from "../../hooks/usePostComment";

const CommentsModal = ({ iscommentModal, setIscommentModal, post }) => {
    const {handlePostComment, isCommenting} = usePostComment()
    const commentRef = useRef(null);
    const commentsContainerRef = useRef(null);
    const handleSubmitComment = async (e) => {
        e.preventDefault()
        await handlePostComment(post.id, commentRef.current.value)
        commentRef.current.value = ''
    }

    useEffect(() => {
        const scrollToBottom = () => {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        };
        if (iscommentModal) {
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    }, [iscommentModal, post.comments.length]);

  return (
    <div>
      <div className="comments-modal-overlay">
        <div className="modal-comments-content">
          <h4 className="modal-comments-title">Comments</h4>
          <MdClose
            className="comments-modal-close"
            onClick={() => setIscommentModal(!iscommentModal)}
          />
          <div>
            <div className="modal-comments" 
            ref={commentsContainerRef}
            >
              {post.comments.map((comment, idx) => (
                <PostModalMiddle key={idx} comment={comment} />
              ))}
            </div>
          </div>

          <form className="form-container" onSubmit={handleSubmitComment}>
            <input type="text" placeholder="Comment" ref={commentRef} />
            <div>
              <button className="modal-comment-post-btn">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
