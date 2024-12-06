import { useEffect } from 'react'
import usePostStore from '../store/PostStore'
import useUserProfileStore from '../store/userProfileStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetUserPosts = () => {
    const {posts,setPosts} = usePostStore()
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if(!userProfile) return
            setPosts([])
            try {
                const q = query(collection(firestore,"posts"),where("createdBy","==",userProfile.uid))
                const querySnapshot = await getDocs(q)

                const posts = []
                querySnapshot.forEach(doc => {
                    posts.push({...doc.data(), id:doc.id})
                })

                posts.sort((a,b) => b.createdAt - a.createdAt)
                setPosts(posts)

            } catch (error) {
                alert(error.message);
                setPosts([]);
            }
        }
        getPosts()
    },[setPosts,userProfile])

    return {posts}
}

export default useGetUserPosts;
