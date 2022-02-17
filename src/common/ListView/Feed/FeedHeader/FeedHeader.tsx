import './FeedHeader.css';

import { Link } from 'react-router-dom';
import './FeedHeader.css'
import { PostsType } from 'types/post';
import {useAppDispatch} from 'store/hooks'
import { hidePosts } from 'store/actions/feeds';

interface IfirstChildProps {
 post : PostsType,
}

const FeedHeader: React.FC<IfirstChildProps> = ({post}) => {


  const dispatch = useAppDispatch();

  const handleClick = ()=>{
    dispatch(hidePosts(post.id));
  }

  return (

    <div className='fh21Container flex'>
      <div className='fh21Left flex'>
        <div>
          <Link to={`/profile/${post.user.username}`} ><img src={post.user.profile_image.large} className='fh21LeftImg' alt="feed image" /></Link>
        </div>
        <div className="fh21Name">
        <Link to={`/profile/${post.user.username}`} > <h5>{post.user.username}</h5></Link>
        </div>
      </div>
      <div>
        <div onClick={handleClick}>
          <i className="fa fa-ellipsis-h fa-2x threedots" aria-hidden="true"></i>
        </div>
      </div>

    </div>

  );
}

export default FeedHeader;
