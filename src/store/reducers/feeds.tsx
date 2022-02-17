import {FeedType,PostsType} from 'types/post';

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

const initalState: FeedType = {

  posts: [],
  fetchingPosts: false,
  failFetchingPosts: false,
  fetchingMorePosts: false,
  failFetchingMorePosts: false,
  hasMorePosts: false,
  hidePosts : new Map()

}

const feedsReducer = (state = initalState,
  action: { type: string, payload: Array<PostsType> | string}
) => {

  switch (action.type) {
    case FETCH_RANDOM_POST_REQUEST:
      return {
        ...state,
        fetchingPosts: true
      }
    case FETCH_RANDOM_POST_SUCCESS:
      return {
        ...state,
        posts: [...action.payload as Array<PostsType>],
        hasMorePosts: action.payload.length > 0 ? true : false,
        fetchingPosts: false
      }
    case FETCH_RANDOM_POST_FAILURE:
      return {
        ...state,
        failFetchingPosts: true,
        fetchingPosts: false,
        hasMorePosts: false
      }
    case FETCH_MORE_RANDOM_POST_REQUEST:
      return {
        ...state,
        fetchingMorePosts: true
      }
    case FETCH_MORE_RANDOM_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload as Array<PostsType>],
        hasMorePosts: action.payload.length > 0 ? true : false,
        failFetchingMorePosts: false,
        fetchingMorePosts: false
      }
    case FETCH_MORE_RANDOM_POST_FAILURE:
      return {
        ...state,
        failFetchingMorePosts: true,
        hasMorePosts: state.failFetchingMorePosts ? false : true
      }
    
      case HIDE_POSTS :
      const key = action.payload as string;
       const newMap = new Map(state.hidePosts);
       newMap.set(key,true); 
      return {
        ...state,
        hidePosts : newMap
      }
    
      case UNDO_POSTS :
       const keyUndo = action.payload as string;
       const newMapUndo = new Map(state.hidePosts);
       newMapUndo.delete(keyUndo); 
      return {
        ...state,
        hidePosts : newMapUndo
      }
     default:
       return{
         ...state
       }

  }
}

export default feedsReducer;
