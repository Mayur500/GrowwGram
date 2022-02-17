import React from "react";

import './PostUndo.css'
import { PostsType } from 'types/post';
import {UndoHidePosts} from 'store/actions/feeds';
import {useAppDispatch} from 'store/hooks'


interface IfirstChildProps {
  id : string
}

const PostUndo: React.FC<IfirstChildProps> = ({id}) => {


  const dispatch = useAppDispatch();

  const handClick = () => {
    dispatch(UndoHidePosts(id))
  }

  return (


    <div className="pu21HideContainer">
      <div className="pu21Hide">
        <div>
          Post Hidden
        </div>
        <div>
          You won't see this post in your News Feed.
        </div>
      </div>
      <button className="pu21HideUndo" onClick={handClick}>
        Undo
      </button>
    </div>

  )
}

export default PostUndo;
