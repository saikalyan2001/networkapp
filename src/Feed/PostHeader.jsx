import React from 'react'

const PostHeader = ({ username }) => {
  return (
    <div>
        <div>
        {username}
        <p>. 1w</p>
        </div>
        <p>
            Unfollow
        </p>
    </div>
  )
}

export default PostHeader
