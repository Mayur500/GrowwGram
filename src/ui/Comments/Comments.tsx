
import React, { useState, useRef } from 'react';
import './Comments.css'
import {FeedHeader,FeedFooter} from 'common/ListView/Feed/index';
import {PostsType} from 'types/post';
import {useAppSelector} from "store/hooks";interface IfirstChildProps {
  post: PostsType
}

const Comments: React.FC<IfirstChildProps> = ({ post }) => {

  const {
    posts,

  } = useAppSelector(state => state.feedsData);

  const [islike, setLike] = useState(false);
  const [commentList, setComments] = useState<Array<String>>([]);
  const inputEl = useRef<HTMLTextAreaElement>(null);


  const commentsLayer = () => {

    const updatedComments = [...commentList];
    let newComment;
    if (inputEl.current !== null) {
      newComment = inputEl.current.value;
      inputEl.current.value = ""
      updatedComments.push(newComment);
      setComments(updatedComments);
    }

  }

  return (
    <div className='cm21Container flex'>

      <div className='cm21Left'>
        <img src={post.urls.regular} alt="CommmentsImage" />
      </div>

      <div className='cm21Right'>

        <div>
          <FeedHeader post={post}/>
        </div>

        <div className='cm21Middle'>


          {
            commentList.map((comment, index) => (
              <div className='fh21Container hd21Comments'>
                 <img src={`${posts[2].user.profile_image.large}`} className="hd21UserImage"/>
                 <h6>{posts[2].user.username}</h6>
              <p key={index}>
                {comment}
              </p>
              </div>
            ))
          }

        </div>

        <div>
          <div className='cm21comments'>
            <textarea placeholder='Add comments....' ref={inputEl} />
            <button className="cm21post" onClick={commentsLayer}>POST</button>
          </div>

          <div className='cm21bottom'>
          <FeedFooter post={post} setBackDrop={_ => undefined} setPostId={_ => undefined} islike={islike} setLike={setLike}
          />
            </div>
        </div>

      </div>

    </div>
  )
}

export default Comments;
