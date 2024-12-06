import React from 'react'
import useGetFeedPosts from '../hooks/useGetFeedPosts'
import FeedPost from './FeedPost';

const FeedPosts = () => {
    const {posts} = useGetFeedPosts();

    return (
        <div>
           {/* { [0, 1, 2].map((_, idx) => (
                <div>
                    contents wrapped
                </div>
            ))} */}

        {posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}   

        {posts.length === 0 && (
            <p>Looks like you don't have any friends</p>
        )} 
    
        </div>
    )
}

export default FeedPosts;
