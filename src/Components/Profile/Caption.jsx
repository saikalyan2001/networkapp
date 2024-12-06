import useUserProfileStore from '../../store/userProfileStore';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/timeAgo';

const Caption = ({ post }) => {
    const userProfile = useUserProfileStore(state => state.userProfile)

  return (
    <div className="modal-text-middle">
    <Link to={`/${userProfile.username}`}>
    <img
      src= {userProfile.profilePicURL}
      alt="pro-pic"
      className="pro-pic"
    />
    </Link>
    <div className="middle-text">
    <Link to={`/${userProfile.username}`} className='post-modal-username'>

    <p className="modal-text">
      {userProfile.username}
    </p>
    </Link>
    <p>{post.caption}</p>
    <div className="modal-date">
      {timeAgo(comment.createdAt)}
    </div>
    </div>
  </div>
  )
}

export default Caption;
