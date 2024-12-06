import React, { useRef, useState } from 'react';
import "./PostCreation.css";
import { MdClose, MdPermMedia } from "react-icons/md";
import usePreviewImg from "../../hooks/usePreviewimg";
import useAuthStore from '../../store/authStore';
import usePostStore from '../../store/PostStore';
import useUserProfileStore from '../../store/userProfileStore';
import { useLocation } from 'react-router-dom';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, firestore, storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const PostCreation = ({isCreating,setIsCreating}) => {

  const imageRef = useRef(null);
  const {handleImageChange,selectedFile,setSelectedFile} = usePreviewImg();
  const {handleCreatePost} = useCreatePost();
  const { pathname } = useLocation();

  const handlePostCreation = async () => {
    setIsCreating(false);
    try {
      await handleCreatePost(selectedFile);
      setSelectedFile(null);
    } catch (error) {
      alert(error.message);
    }
  };

  
  return (
    <div className='post-creation-container'>
      <div className={isCreating ? "active" : "post-creation"}>
        <h3 className="post-head">Create New Post</h3>
        <input type="file" hidden ref={imageRef} onChange={handleImageChange}/>
        <MdPermMedia className='post-media' onClick={() => imageRef.current.click()} />
          {selectedFile && (
            <div> 
            <img src={selectedFile} alt="Selected img" className='pre-image' />
            
            <MdClose onClick={() => {setSelectedFile(null);
              imageRef.current.value = '';
            }} className='pre-img-close' />
              </div>
          )}

        <button className="post-btn" onClick={handlePostCreation} >
          Create Post
        </button>
      </div>

    </div>
  )
}

export default PostCreation;

function useCreatePost() {
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore(state => state.createPost)
  const addPost = useUserProfileStore(state => state.addPost)
  const userProfile = useUserProfileStore(state => state.userProfile)
  const {pathname} = useLocation()

  const handleCreatePost = async ( selectedFile,caption) => {
    if(!selectedFile) throw new Error('Please select an image');
    const newPost = {
      likes:[],
      comments:[],
      createdAt:Date.now(),
      createdBy:authUser.uid,
    }

    try {
      const postDocRef = await addDoc(collection(firestore,"posts"),newPost);
      const userDocRef = doc(firestore,"users",authUser.uid);
      const imageRef = ref(storage,`posts/${postDocRef.id}`)
      await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)});
      await uploadString(imageRef,selectedFile,"data_url")
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(postDocRef,{imageURL:downloadURL});

      newPost.imageURL = downloadURL;

      if(userProfile.uid === authUser.uid) createPost({...newPost,id:postDocRef.id});

      if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({...newPost,id:postDocRef.id});

      alert("Post created successfully");
      
    } catch (error) {
      alert( error.message);
    }
  }

  return {handleCreatePost}

}