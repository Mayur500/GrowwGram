import {User,UserProfileImageType} from 'types/user'

export type FeedType = {
  posts: Array<PostsType>,
  fetchingPosts: boolean,
  failFetchingPosts: boolean,
  fetchingMorePosts: boolean,
  failFetchingMorePosts: boolean,
  hasMorePosts: boolean,
  hidePosts : Map<string,boolean>
}

export type Location = {
  name :string
 }
 

export type PostsType = {
 id : string,
 user : User,
 likes : string,
 location :Location,
 updated_at : string,
 created_at : string,
 description : string,
 urls : UserProfileImageType
}


