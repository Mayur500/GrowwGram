import './listView.css';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Feed from './Feed/Feed';
import { ThreeDots } from 'react-loader-spinner'
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchingUserMorePhoto } from 'store/actions/userProfile';
import {Comments,BackDrop} from 'ui';

import { useParams } from 'react-router-dom';
import { PostsType } from 'types/post'
import {UserPhotos} from 'types/user';

const ListView = () => {

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

  const isNotFetching = !loadingMorePhotos;

  const FetchApiError = <h1 className="fd21Error" key={0} > Api Error </h1>

  const getMorePhotos = () => {
    if (isNotFetching) {
      dispatch(fetchingUserMorePhoto(`${username.id}`));
    }
  }

  const filterPost = userPhotos.find((userPhoto : UserPhotos)=> photoId === userPhoto.id);

  return (
    <>

     <BackDrop isDrop={isBackDrop} setBackDrop={setBackDrop} />
    {isBackDrop ? <Comments post={filterPost} /> : null}
      <InfiniteScroll
        pageStart={0}
        loadMore={getMorePhotos}
        hasMore={hasMore}
        loader={userMorePhotosError ? FetchApiError : <ThreeDots key={0} />}>
        <div className="fd21Content main21Content">
          <div className="fd21InsideContainer">
            {

              userPhotos.map((userPhoto: PostsType, index: number) => (
                <Feed key={index} setBackDrop={setBackDrop} post={userPhoto} setPostId={setPhotoId} />
              ))
            }
          </div>
        </div>
      </InfiniteScroll>

    </>
  )
};

export default ListView;
