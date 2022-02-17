import {UserType,UserPhotos,User,SearchType} from 'types/user'
import { AnyAction } from 'redux'

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



const initalState: UserType = {
  user: null,
  userPhotos: [],
  userError: false,
  userPhotosError: false,
  userMorePhotosError: false,
  loadingUser: false,
  loadingPhotos: false,
  loadingMorePhotos: false,
  hasMore: false,
  page: 1,
  searchResults: []
}

const userProfileReducer = (state = initalState,
  action: AnyAction
) => {

  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loadingUser: true
      }
    case FETCH_USER_SUCCESS:
      const userDataRes = action.payload
      return {
        ...state,
        user: userDataRes,
        loadingUser: false

      }
    case FETCH_USER_FAILURE:
      return {
        ...state,
        userError: true,
        loadingUser: false
      }
    case FETCH_USER_PHOTO_REQUEST:
      return {
        ...state,
        loadingPhotos: true
      }
    case FETCH_USER_PHOTO_SUCCESS:
      const userPhotosRes = action.payload
      return {
        ...state,
        userPhotos: action.payload,
        loadingPhotos: false,
        hasMore: userPhotosRes && userPhotosRes.length < 10 ? false : true
      }
    case FETCH_USER_PHOTO_FAILURE:
      return {
        ...state,
        userPhotosError: true,
        loadingPhotos: false,
        hasMore: false
      }
    case FETCH_USER_MORE_PHOTO_REQUEST:
      return {
        ...state,
        loadingMorePhotos: true
      }
    case FETCH_USER_MORE_PHOTO_SUCCESS:
      const userMorePhotosRes = action.payload
      return {
        ...state,
        userPhotos: [...state.userPhotos, ...userMorePhotosRes],
        hasMore: userMorePhotosRes && userMorePhotosRes.length < 10 ? false : true,
        loadingMorePhotos: false,
        userMorePhotosError: false


      }
    case FETCH_USER_MORE_PHOTO_FAILURE:
      return {
        ...state,
        loadingMorePhotos: false,
        hasMore: state.userMorePhotosError ? false : true,
        userMorePhotosError: true,
      }
    case SEARCH_RESULTS:
      const SearchResultsRes = action.payload
      return {
        ...state,
        searchResults: SearchResultsRes
      }
    default:
      return {
        ...state,
      }

  }
};

export default userProfileReducer;


