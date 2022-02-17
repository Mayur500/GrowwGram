export type UserType = {
  user: User | null,
  userPhotos:Array<UserPhotos> ,
  userError: boolean,
  userPhotosError: boolean,
  userMorePhotosError: boolean,
  loadingUser: boolean,
  loadingPhotos: boolean,
  loadingMorePhotos: boolean,
  hasMore: boolean,
  page: 1,
  searchResults: Array<SearchType>

}

export type UserPhotos = {
  id: string,
  created_at:string,
  updated_at:string,
  description : string,
  urls : UserProfileImageType,
  user : UserType
  alt_description : string,
  likes : number,
}

export type SearchType = {
id :string,
username : string,
profile_image : UserProfileImageType

}

export type UserProfileImageType = {
  small: string;
  medium: string;
  large: string;
  regular :string;
  thumb : string;
  full: string;
}

export type User = {
  id :string
  name: string;
  username: string;
  profile_image:UserProfileImageType;
  followers_count: number;
  following_count: number;
  total_photos: number;

}
