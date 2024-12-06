import React, { useEffect } from 'react'
import usePostStore from '../store/PostStore';
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

const useGetFeedPosts = () => {
    const {posts,setPosts} = usePostStore();
    const authUser= useAuthStore((state) => state.user);
    const {setUserProfile} = useUserProfileStore();

    useEffect(() => {
        const getFeedPosts = async () => {
            if(authUser.following.length === 0) {
                setPosts([])
                return
            }
            const q = query(collection(firestore,"posts"),where("createdBy","in",authUser.following))
            try {
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

                querySnapshot.forEach((doc) => {
                    feedPosts.push({ id: doc.id, ...doc.data() });
                });

                feedPosts.sort((a,b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);
            } catch (error) {
                alert(error.message)
            }
        };

        if (authUser) getFeedPosts();
    },[authUser, setPosts, setUserProfile]);

    return {posts};

};

export default useGetFeedPosts;
