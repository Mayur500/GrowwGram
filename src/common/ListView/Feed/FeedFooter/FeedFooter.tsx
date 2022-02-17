import './FeedFooter.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import moment from 'moment';
import { PostsType } from 'types/post';

toast.configure();
interface IfirstChildProps {
  post : PostsType
  setBackDrop: React.Dispatch<React.SetStateAction<boolean>>
  setPostId: React.Dispatch<React.SetStateAction<string>>
  islike: boolean,
  setLike: Function,
}

const FeedFooter: React.FC<IfirstChildProps> = ({ post,setBackDrop, setPostId, islike, setLike }) => {

  const [isBookmark, setBookMark] = useState(false);
  const ClickDelegation = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const elements = target.classList[0];

    switch (elements) {
      case 'heart':
        setLike(!islike);
        break;

      case 'comment':
        setBackDrop(true);
        setPostId(post.id);
        break;

      case 'link':
        navigator.clipboard.writeText(post.urls.regular);
        toast("Copied to ClipBoard ",
          { position: toast.POSITION.BOTTOM_LEFT, autoClose: 1000 }
        );
        break;
    }
  }

  return (

    <div className='ft21Container'>
      <footer className="ft21Top flex">
        <div className='ft21Left flex' onClick={ClickDelegation}>
          <div className='ft21Img'>
            {islike ? <i className='heart fa fa-heart fa-2x' style={{ color: "red" }}></i> : <i className='heart fa fa-heart-o fa-2x'></i>}
          </div>

          <div className='img2 ft21Img' >
            <i className='comment fa fa-comment-o fa-2x'></i>
          </div>

          <div className='ft21Img'>
            <i className='link fa fa-link fa-2x '></i>
          </div>

        </div>

        <div className='footer_right'>
          <div className='ft21Img'>
            {isBookmark ? <i className='fa fa-bookmark fa-2x' onClick={() => setBookMark(!isBookmark)}></i> : <i className='fa fa-bookmark-o fa-2x' onClick={() => setBookMark(!isBookmark)}></i>}
          </div>

        </div>
      </footer>
      <div className='ft21Bottom'>
        <h6 className="ft21BottomText">{islike ? post.likes + 1 : post.likes} likes</h6>
        <div className='ft21BottomSection'>
          <span className="ft21TextBottom">{post.user.name} </span>

          <div className="ft21TextBottomDesc">{post.description}</div>
        </div>
        <span className='ft21TextBottom ft21TextBottomTime'> {moment(post.updated_at).fromNow()}</span>
      </div>
    </div>

  );
}

export default FeedFooter;
