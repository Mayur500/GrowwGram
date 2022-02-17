
import './profileImages.css';

import React, { useState, useEffect } from 'react';

import GridView from 'common/GridView/GridView';
import ListView from 'common/ListView/ListView';
import './profileImages.css'
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useParams } from 'react-router-dom';
import { fetchingUserPhoto } from 'store/actions/userProfile';
import {Error} from 'ui';
import { FeedLoader, GridLoader } from 'common/Loaders';
const ProfileImages = () => {
  const username = useParams<string>()

  const {
    user,
    userPhotosError,
    loadingPhotos
  } = useAppSelector(state => state.userProfile);
  const dispatch = useAppDispatch();

  const [display, setDisplay] = useState("grid");
  const setDisplayToGrid = () => {
    setDisplay("grid");
  };
  const setDisplayToList = () => {
    setDisplay("list");
  };

  useEffect(() => {
    dispatch(fetchingUserPhoto(`${username.id}`));
  }, []);

  if(loadingPhotos){

    if(display==='grid'){
      return <GridLoader/>
    } 
     return <FeedLoader/>
  }

  return (
    <div className="pp21Container">
      <div className="pp21DisplayButtons">
        <div
          className={`pp21Button ${display === "list" ? "active" : ""}`}
          onClick={setDisplayToList}
        >
          <i className="fa fa-list fa-lg"></i>

        </div>
        <div
          className={`pp21Button ${display === "grid" ? "active" : ""}`}
          onClick={setDisplayToGrid}
        >
          <i className="fa fa-th fa-lg"></i>
        </div>
      </div>
      <>

        {
          !userPhotosError ? display === 'grid' ? (
            <div>

              <GridView />

            </div>
          ) : <ListView />
            : <Error msg="PHOTOS NOT FOUND" />
        }

      </>
    </div>
  );
};

export default ProfileImages;
