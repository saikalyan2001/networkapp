import { useState } from 'react'
import useAuthStore from '../store/authStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useLikePost = (post) => {
    const [isUpdating, setIsupdating] = useState(false);
    const authUser = useAuthStore((state) => state.user)
    const [likes,setLikes] = useState(post.likes.length)
    const [isLiked,setIsliked] = useState(post.likes.includes(authUser?.uid))
    
    const handleLikePost = async () => {
        if(isUpdating) return;
        if(!authUser) return alert("You must be logged in to like a post")
        setIsupdating(true)

        try {
            const postRef = doc(firestore,'posts',post.id)
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            setIsliked(!isLiked)
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1)

        } catch (error) {
            alert(error.message)
        } finally {
            setIsupdating(false)
        }
    }

    return {isLiked,likes,handleLikePost,isUpdating}
}

export default useLikePost;
