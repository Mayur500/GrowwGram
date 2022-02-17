import React, { useEffect } from "react";
import './HeaderNavigation.css'
import {SearchBar} from "ui";
import home from 'assets/home.svg';
import { useThemeDetector } from 'common/hooks/useTheme'
import { setStorage, getStorage } from "utils/storage";
import { deleteStorage } from "utils/storage";
import { fetchingRandomPosts } from "store/actions/feeds";
import { useAppDispatch ,useAppSelector} from "store/hooks";
import { useNavigate ,Link} from 'react-router-dom';
import { fetchingUserPhoto, fetchingUserData } from "store/actions/userProfile";
import Stories from "common/Stories/Stories";
const HeaderNavigation = () => {

    const {
    posts,
    fetchingPosts
  } = useAppSelector(state => state.feedsData);

  const {
   loadingPhotos,user,loadingUser
  } = useAppSelector(state => state.userProfile);

  const [isdark, setDark] = useThemeDetector();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
  
    if (getStorage('theme')) {
      const theme = getStorage('theme');
      console.log(theme);
      setDark(theme === 'dark' ? true : false);
    }
    if(fetchingPosts || loadingPhotos||loadingUser){
    document.documentElement.children[1].setAttribute('data-theme', 'light');
    }
    else{
      document.documentElement.children[1].setAttribute('data-theme', isdark ? 'dark' : 'light');
    }

  }, [isdark,fetchingPosts,loadingPhotos,loadingUser]);

  const toggleTheme = () => {
    setDark(!isdark);
    setStorage('theme', isdark ? 'light' : 'dark');
  }

  const ClickDelegation = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const elements = target.classList[0];

    switch (elements) {
      case 'theme':
        toggleTheme();
        break;

      case 'refresh':
        window.scrollTo(0, 0);
        if (window.location.pathname.startsWith('/profile')) {
          const user = window.location.pathname.substring(9);
          deleteStorage(`user_${user}`);
          console.log(user);
          dispatch(fetchingUserData(user));
          dispatch(fetchingUserPhoto(user));
        }
        else {
          deleteStorage('posts');
          dispatch(fetchingRandomPosts());
        }
        break;

      case 'home':
        navigate("/");
        break;

      case 'circle':
        navigate("/");
        break;

      default:
        break;
    }

  }
     
  const post = posts.length>0 ?  posts[2].user : undefined;

  return (
    <div className="hnav21Container flex" onClick={ClickDelegation}>

      <div className="hnav21Items">
        {isdark ? <i className="theme fa fa-sun-o fa-lg"> </i> : <i className="theme fa fa-moon-o fa-lg"></i>

        }
      </div>
      <div>
        <i className="home fa fa-home fa-lg"></i>
      </div>
      <div>
        <i className="refresh fa fa-refresh fa-lg"></i>
      </div>
      <div>
        <i className="heart fa fa-heart fa-lg"></i>
      </div>
        {
      post ? (<Link to={`/profile/${post.username}`}>
          <img src={`${post.profile_image.large}`} className="hd21UserImage"/>
      </Link>) : 
              (<div>
                <i className="cirlce fa fa-user-circle-o fa-lg"></i>
              </div>)
       }

    </div>

  )
}

export default HeaderNavigation;
