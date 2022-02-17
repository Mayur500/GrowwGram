import React, { useEffect } from 'react';
import './userProfile.css'
import ProfileInfo from "common/ProfileInfo/ProfileInfo";
import ProfileImages from "common/ProfileImages/ProfileImages";
import { useParams } from 'react-router-dom';
import { fetchingUserData } from 'store/actions/userProfile';
import { useAppDispatch, useAppSelector } from "store/hooks";
import {Error} from 'ui';
import { UserInfoLoader} from 'common/Loaders';


const UserProfile = () => {

  const usernameId = useParams<string>()
  const {
    user,
    loadingUser
  } = useAppSelector(state => state.userProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchingUserData(`${usernameId.id}`));
    window.scrollTo(0, 0);
  }, []);

  if(loadingUser){
   return <UserInfoLoader />
  }

  return (
    <>
    {
      user ? (
    <div className='up21MainContainer'>
        <div className="up21Container">
            <ProfileInfo />
            <ProfileImages />
          </div>
      </div>
      ) : <Error msg='User NOT FOUND' />
    }
    </>
  )
}

export default UserProfile;
