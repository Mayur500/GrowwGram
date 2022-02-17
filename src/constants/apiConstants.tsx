export const API_CALL = {
  randomPhotos: `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&count=10`,
  userPhotos: (profile: string) =>
  `https://api.unsplash.com/users/${profile}/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
  userProfile: (profile: string) =>
  `https://api.unsplash.com/users/${profile}?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
  userPhotosMore: (profile: string, page: number) =>
  `https://api.unsplash.com/users/${profile}/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}`,
  getSearchResults : (search : string) =>
  `https://api.unsplash.com/search/users?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${search}`
};
