import React, { useState } from "react";
import "./ProfilePost.css";
import { FaHeart } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PostFooter from "../PostFooter/PostFooter";
import PostModalFooter from "./PostModalFooter";
import { MdClose, MdDelete } from "react-icons/md";
import PostModalMiddle from "./PostModalMiddle";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import { deleteObject, ref } from "firebase/storage";
import { auth, firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/PostStore";
import Caption from "./Caption";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const  ProfilePost = ({ post }) => {
  const [promodal, setPromodal] = useState(false);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore(state => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    if(!window.confirm("Are you sure you want to delete this post?")) return;
    if(isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef)
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore,"posts" , post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id)
      })

      deletePost(post.id);
      decrementPostsCount(post.id);
      alert("Post deleted successfully");
    } catch (error) {
      alert(error.message)
    } finally{
      setIsDeleting(false);
    }
  }
  

  const toggleChangeProModal = () => {
    setPromodal(!promodal);
  };

  const toggleCloseProModal = () => {
    setPromodal(!promodal);
  };

  return (
    <>
      <div className="pro-post-container" onClick={toggleChangeProModal}>
        <div className="post-overlay">
          <div className="overlay-icon">
            <FaHeart />
            <p>{post.likes.length}</p>
          </div>

          <div className="overlay-icon">
            <BiSolidMessageRounded />
            <p>{post.comments.length}</p>
          </div>
        </div>

        <img src={post.imageURL} alt="post" className="post-image" />
      </div>

      <div
        className={
          promodal ? "profile-modal-overlay-active" : "profile-modal-overlay"
        }
        onClick={toggleCloseProModal}
      >
        <div className="profile-posts-modal" onClick={(e) => e.stopPropagation()}>
          <img
            src={post.imageURL}
            alt="pro-pic"
            className="modal-pic"
          />

          <div className="modal-left-container">
            <div className="modal-text-header">
              <div className="modal-profile-name">
              <Link>
          {authUser.profilePicURL ? (
            <img
              src={authUser.profilePicURL}
              alt="profile-pic"
              className="pro-pic"
            />
          ) : (
            <FaUserCircle className="pro-pic-icon" />
          )}{" "}
        </Link>
                <p className="modal-text">{userProfile.username}</p>
              </div>
              {authUser?.uid === userProfile.uid && (
                <MdDelete className="modal-delte-btn" onClick={handleDeletePost} />
              )}
              <HiOutlineDotsHorizontal className="modal-profile-opt" />
            </div>


            <div className="main-middle">
              {post.caption && <Caption post={post} />}

            {/* <PostModalMiddle /> */}
            {post.comments.map((comment, index) => (
              <PostModalMiddle key={comment.id || index} comment={comment} />
            ))}
  
            </div>    


            <PostModalFooter className="post-footer" post={post} />


          </div>
        </div>

        <div className="post-modal-close">
          <MdClose />
        </div>
      </div>
    </>
  );
}

export default ProfilePost;
