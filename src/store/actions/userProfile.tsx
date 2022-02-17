
import { AppThunk } from 'store/store'
import { getStorage, setStorage, deleteStorage, allStorage } from 'utils/storage';
import {UserType,UserPhotos,User,SearchType} from 'types/user'
import {USER_STORAGE_SIZE} from 'constants/storageConstants';
import unsplash from 'utils/api';
import { API_CALL } from 'constants/apiConstants';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_PHOTO_REQUEST,
  FETCH_USER_PHOTO_SUCCESS,
  FETCH_USER_PHOTO_FAILURE,
  FETCH_USER_MORE_PHOTO_REQUEST,
  FETCH_USER_MORE_PHOTO_SUCCESS,
  FETCH_USER_MORE_PHOTO_FAILURE,
  SEARCH_RESULTS
} from 'store/actionTypes/userProfile';

export const fetchingUserData = (profile: string): AppThunk => {

  return async (dispatch , getState) => {

    const url = API_CALL.userProfile(profile)
    try {

      const keys = allStorage();
      const keysUserLength = keys.filter(key => key.startsWith('user_')).length;

      dispatch({ type: FETCH_USER_REQUEST });
      if (getStorage(`user_${profile}`)) {
        const result = getStorage(`user_${profile}`)[0] as User
        dispatch({ type: FETCH_USER_SUCCESS, payload: result})

      }
      else {
        const response = await unsplash.get(url);
        let res = [];
        if (keysUserLength < USER_STORAGE_SIZE) {
          setStorage(`user_${profile}`, [response.data ]);
        }
        const result = response.data as User
        dispatch({ type: FETCH_USER_SUCCESS, payload: result});
      }
    }
    catch (err) {
      console.log(err);
      dispatch({ type: FETCH_USER_FAILURE })
    }
  }

}


export const fetchingUserPhoto = (profile: string): AppThunk => {

  return async (dispatch) => {

    const url = API_CALL.userPhotos(profile)
    try {

      dispatch({ type: FETCH_USER_PHOTO_REQUEST });

      if (getStorage(`user_${profile}`) && getStorage(`user_${profile}`)[1]) {
        const result = getStorage(`user_${profile}`)[1] as Array<UserPhotos>
        dispatch({ type: FETCH_USER_PHOTO_SUCCESS, payload:result })
      }
      else {
        const response = await unsplash.get(url);
        if (getStorage(`user_${profile}`)) {
          setStorage(`user_${profile}`, [getStorage(`user_${profile}`)[0], response.data]);
        }
        const result = response.data as Array<UserPhotos>
        dispatch({ type: FETCH_USER_PHOTO_SUCCESS, payload: result });
      }
    }
    catch (err) {
      console.log(err);
      dispatch({ type: FETCH_USER_PHOTO_FAILURE })
    }
  }

}



export const fetchingUserMorePhoto = (profile: string): AppThunk => {

  return async (dispatch, getState) => {

    const url = API_CALL.userPhotosMore(profile, getState().userProfile.page + 1);
    try {
      dispatch({ type: FETCH_USER_MORE_PHOTO_REQUEST });
      const response = await unsplash.get(url);
      if (getStorage(`user_${profile}`) && getStorage(`user_${profile}`)[1] && getStorage(`user_${profile}`)[1].length < USER_STORAGE_SIZE) {
        console.log(getStorage(`user_${profile}`)[1].length);
        const Photos = getStorage(`user_${profile}`)[1];
        const updatedPhotos = [...Photos, ...response.data];

        setStorage(`user_${profile}`, [getStorage(`user_${profile}`)[0], updatedPhotos]);
      }
      const result = response.data as Array<UserPhotos>  
      dispatch({ type: FETCH_USER_MORE_PHOTO_SUCCESS, payload: result});
    }
    catch (err) {
      console.log(err);
      dispatch({ type: FETCH_USER_MORE_PHOTO_FAILURE })
    }
  }

}



export const fetchSearchResults = (search: string):AppThunk => {

  return async (dispatch) => {

    const url = API_CALL.getSearchResults(search);
    try {
      const response = await unsplash.get(url);
      const results =  response.data.results as Array<SearchType>;
      dispatch({ type: SEARCH_RESULTS, payload: results });
    }
    catch (err) {
      console.log(err);
    }
  }

}

