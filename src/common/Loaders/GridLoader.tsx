import ContentLoader from 'react-content-loader'

const GridLoader = () => {

  const iterator = [1, 2];

  return (
<div className='gl21Loader'>
      {
        iterator.map(item => (
          <ContentLoader
          viewBox="0 0 400 200"
          foregroundColor='var(--background)'
          backgroundColor='var(--grey)'
          key={item}
          
       >
       
        <rect x="10" y="100" rx="5" ry="5" width="100" height="400" />
        <rect x="140" y="100" rx="5" ry="5" width="100" height="400" />
        <rect x="280" y="100" rx="5" ry="5" width="100" height="400" />
        <rect x="420" y="100" rx="5" ry="5" width="100" height="400" />
    
    
      </ContentLoader>
        ))
      }
      </div>
  )
 }

export default GridLoader
