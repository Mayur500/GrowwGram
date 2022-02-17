import './profileInfo.css';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from "store/hooks";
const ProfileInfo = () => {

  const {
    user
  } = useAppSelector(state => state.userProfile);

  return (
    <>
      {
        (
          <div className="pi21Container flex">
            <div>
              <img
                src={user.profile_image.large}
                alt="image"
                className="pi21ProfilePhoto"
              />
            </div>
            <div className="pi21UserInfo flex">
              <div className="pi21Username">{user.username}</div>
              <div className="pi21UserStats">
                <div className="pi21UserStatItem flex">
                  <i className="fi-rr-camera"></i>
                  <span className="pi21UserStatFigure">24 </span>
                  Photos
                </div>
                <div className="pi21UserStatItem">
                  <i className="fi-rr-following"></i>
                  <span className="pi21UserStatFigure">{user.followers_count}</span>
                  Followers
                </div>
                <div className="pi21UserStatItem">
                  <i className="fi-rr-users"></i>
                  <span className="pi21UserStatFigure">{user.following_count}</span>
                  Following
                </div>
              </div>
              <div>
                <div className="pi21UserFullName">{user.first_name}</div>
                <div>
                  <i>{user.description}</i>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default ProfileInfo;
