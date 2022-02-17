import ContentLoader from 'react-content-loader'

const StoryLoader = () => {

  return (
  <div className='st21Loader'>
  <ContentLoader
      viewBox="0 0 600 200"
      foregroundColor='var(--background)'
      backgroundColor='var(--grey)'
   >
    <circle cx="50" cy="70" r="20" />
    <rect x="10" y="100" rx="5" ry="5" width="80" height="10" />
    <circle cx="150" cy="70" r="20" />
    <rect x="110" y="100" rx="5" ry="5" width="80" height="10" />
    <circle cx="240" cy="70" r="20" />
    <rect x="201" y="100" rx="5" ry="5" width="80" height="10" />
    <circle cx="340" cy="70" r="20" />
    <rect x="293" y="100" rx="5" ry="5" width="80" height="10" />

  </ContentLoader>
  </div> 

 )
}

export default StoryLoader
