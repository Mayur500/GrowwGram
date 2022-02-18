import './gridView.css';

import React, { useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ThreeDots } from 'react-loader-spinner'
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchingUserMorePhoto } from 'store/actions/userProfile';
import { useParams } from 'react-router-dom';
import { UserPhotos } from 'types/user';
import { useIntersection } from 'common/hooks/useIntersectionHook';
import GridImage from './GridImage'
import {Comments,BackDrop} from 'ui';


const GridView = () => {

  const username = useParams<string>()
  const [isBackDrop,setBackDrop] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<string>('');

  const {
    userPhotos,
    loadingMorePhotos,
    userMorePhotosError,
    hasMore
  } = useAppSelector(state => state.userProfile);
  const dispatch = useAppDispatch();

  const filterPost = userPhotos.find((userPhoto : UserPhotos)=> photoId === userPhoto.id);
  const isNotFetching = !loadingMorePhotos;

  const FetchApiError = <h1 key={0} className="fd21Error"> Network Error </h1>

  const getMorePhotos = () => {
    if (isNotFetching && hasMore) {
      dispatch(fetchingUserMorePhoto(`${username.id}`));
    }
  }

  const handleOnClick = (e:any)=>{
    const target = e.target;
    setBackDrop(!isBackDrop);
    setPhotoId(target.dataset.id);
  }

  return (
    <>
      {
        (
          <div className="gv01Container">

             <BackDrop isDrop={isBackDrop} setBackDrop={setBackDrop} />
             {isBackDrop ? <Comments post={filterPost} /> : null}
            <InfiniteScroll
              pageStart={0}
              loadMore={getMorePhotos}
              hasMore={true}
              loader={userMorePhotosError ? FetchApiError : <ThreeDots key={0} />}
            >
              {userPhotos.map((photo: UserPhotos, index: number) => (
                <div key={`${photo.id}_${index}`} className="gv01PhotoContainer">
                  <GridImage photo={photo}/>
                  <div className="gc01PhotoOverlay flex" onClick={handleOnClick} data-id={photo.id}>
                    <div className="gc01PhotoOverlayStat">
                    <i className="fa fa-heart"></i> {photo.likes}
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        )
      }
    </>
  );
};

export default GridView;
