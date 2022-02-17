import {AppThunk} from 'store/store';
import {PostsType} from 'types/post';
import { USER_STORAGE_SIZE } from 'constants/storageConstants';
import {
  FETCH_RANDOM_POST_REQUEST,
  FETCH_RANDOM_POST_SUCCESS,
  FETCH_RANDOM_POST_FAILURE,
  FETCH_MORE_RANDOM_POST_REQUEST,
  FETCH_MORE_RANDOM_POST_SUCCESS,
  FETCH_MORE_RANDOM_POST_FAILURE,
  HIDE_POSTS,
  UNDO_POSTS

} from 'store/actionTypes/feeds';
import { getStorage, setStorage } from 'utils/storage';

import unsplash from 'utils/api';
import { API_CALL } from 'constants/apiConstants';

export const fetchingRandomPosts = (): AppThunk => {

  return async (dispatch, getState) => {

    const url = API_CALL.randomPhotos

    try {
      dispatch({ type: FETCH_RANDOM_POST_REQUEST });

      if (getStorage('posts')) {
        const result = getStorage('posts') as Array<PostsType>
        dispatch({ type: FETCH_RANDOM_POST_SUCCESS, payload: result})
      }
      else {

        const response = await unsplash.get(url);
        setStorage('posts', response.data);
        const result = response.data as Array<PostsType>

        dispatch({ type: FETCH_RANDOM_POST_SUCCESS, payload: result });
      }
    }
    catch (err) {
      console.log(err);
      dispatch({ type: FETCH_RANDOM_POST_FAILURE })
    }
  }

}

export const hidePosts = (postid:string)=>{
return{ 
   type: HIDE_POSTS,
   payload : postid
   }
}


export const UndoHidePosts = (postid:string)=>{
  return{ 
    type: UNDO_POSTS,
    payload : postid
     }
  
}

export const fetchingMoreRandomPosts = (): AppThunk => {

  return async (dispatch, getState) => {

    const url = API_CALL.randomPhotos

    try {

      dispatch({ type: FETCH_MORE_RANDOM_POST_REQUEST });
      const response = await unsplash.get(url);
      if (getStorage('posts') && getStorage('posts').length < USER_STORAGE_SIZE) {
        setStorage('posts', [...getStorage('posts'), ...response.data]);
      }
      const result = response.data as Array<PostsType>
      dispatch({ type: FETCH_MORE_RANDOM_POST_SUCCESS, payload: result });
    }
    catch (err) {

      dispatch({ type: FETCH_MORE_RANDOM_POST_FAILURE })
    }
  }

}
