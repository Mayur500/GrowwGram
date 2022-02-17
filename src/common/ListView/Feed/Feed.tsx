import React, { useState } from "react";
import {FeedFooter,FeedImage,FeedHeader} from "./index";
import './Feed.css'

import { PostsType } from 'types/post';
import PostUndo from "ui/PostUndo/PostUndo";
import { hidePosts } from "store/actions/feeds";
import {useAppDispatch,useAppSelector} from 'store/hooks'


interface IfirstChildProps {
  setBackDrop: React.Dispatch<React.SetStateAction<boolean>>
  post: PostsType
  setPostId: React.Dispatch<React.SetStateAction<string>>
}

const Feed: React.FC<IfirstChildProps> = ({ setBackDrop, post, setPostId }) => {

  const {
    hidePosts
  } = useAppSelector(state => state.feedsData);

  const [islike, setLike] = useState(false);
  const dispatch = useAppDispatch();

    

  return (

    <div className="fd21Feed">
      {
       hidePosts.get(post.id) ? <PostUndo id= {post.id} />  : (
       <>
      <FeedHeader post={post} />
      <FeedImage postUrl={post.urls} setLike={setLike} />
      <FeedFooter post={post} setBackDrop={setBackDrop} setPostId={setPostId} islike={islike} setLike={setLike} />
      </>
    )
      }
   </div>
  )
}

export default Feed;
