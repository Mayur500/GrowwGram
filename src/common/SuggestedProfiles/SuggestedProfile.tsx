import React ,{useState} from "react";
import './SuggestedProfiles.css'
import { useAppSelector } from "store/hooks";
import { Link } from 'react-router-dom';
import { PostsType } from "types/post";
import { SuggestionLoader } from "common/Loaders";
const SuggestedProfile = () => {

  const [followingItems , setFollowing] = useState(new Array(4));
  const {
    posts,
    fetchingPosts
  } = useAppSelector(state => state.feedsData);



   if(fetchingPosts){
     return <SuggestionLoader/>
   }
   
   const handleClick = (e:any)=>{
     const target = e.target;
       let updatedItems = [...followingItems];
       updatedItems[Number(target.dataset.id)] = 1;
       setFollowing(updatedItems);
   }
  
  return (

    <div className="sg21Container">
      <span >Suggestions For You</span>

      <br />
      {
        posts.slice(0, 4).map((post: PostsType, index: number) => (
          <div key={`${post.id}_${index}`} className="sg21Main flex">
            <div className="sg21MainLeft flex">
              <div>
                <Link to={`/profile/${post.user.username}`} ><img src={post.user.profile_image.large} alt="user" /> </Link>
              </div>
              <div className="sg21UserName">
              <Link to={`/profile/${post.user.username}`} > <h6>{post.user.username}</h6></Link>
              
              </div>
            </div>
            <div className="sg21Follow">
              <p onClick ={handleClick} data-id={index}> {followingItems[index]==1 ? "Requested" : "Follow"}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default SuggestedProfile;
