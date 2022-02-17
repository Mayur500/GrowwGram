import {
  combineReducers,
  createStore,
  applyMiddleware,
  AnyAction
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch, } from "redux-thunk";

import {feedsReducer,userProfileReducer} from 'store/reducers/';


const reducer = combineReducers({
  feedsData: feedsReducer,
  userProfile: userProfileReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ThunkDispatch<RootState,unknown,AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
export default store;
