import React from "react";
import './Stories.css'
import random from 'assets/testingimages.jpeg'
import { useAppSelector } from "store/hooks";
import { Link } from 'react-router-dom';
import {PostsType} from 'types/post';
import {StoryLoader} from 'common/Loaders/index';
interface IfirstChildProps {
  postStories: Array<PostsType>,
  fetchingPosts:boolean
}

const Stories: React.FC<IfirstChildProps> = ({ postStories,fetchingPosts }) => {

   if(fetchingPosts){
       return (<StoryLoader/>);
   }

  return (

    <div className="st21Container flex">
      {
        postStories.map((post, index) => (
          <div key={`${post.id}_${index}`} className='st21ImageContainer flex'>
            <div>
            <Link to={`/profile/${post.user.username}`}> <img src={post.user.profile_image.large} className='st21Image' /> </Link>
            </div>
            <div className="st21UserName">
            <Link to={`/profile/${post.user.username}`}>{post.user.username} </Link> 
            </div>
          </div>
        ))
    
       }
    </div>
  )
}

export default Stories;
