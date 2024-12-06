import { useState } from 'react'
import useAuthStore from '../store/authStore'
import usePostStore from '../store/PostStore'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const usePostComment = () => {
    const [isCommenting,setIsCommenting] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const addComment = usePostStore(state => state.addComment)

    const handlePostComment = async (postId,comment) => {
        if(isCommenting) return 
        if(!authUser) return alert("You must be logged in to comment")
        setIsCommenting(true)
        const newComment = {
            comment,
            createdAt:Date.now(),
            createdBy:authUser.uid,
            postId
        }
        try {
            await updateDoc(doc(firestore,"posts",postId), {
                comments: arrayUnion(newComment)
            })
            addComment(postId,newComment)

        } catch (error) {
            alert(error.message)
        }
    }

    return {isCommenting,handlePostComment}
}

export default usePostComment;
