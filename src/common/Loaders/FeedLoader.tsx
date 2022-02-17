
import ContentLoader from 'react-content-loader'

const FeedLoader = () => {
 const iterator = [1, 2, 3, 4];

 return (
<>
     {
       iterator.map(item => (
         <ContentLoader
           key={item}
           width={600}
           height={600}
           viewBox="0 0 400 400"
           backgroundColor="#d3d3d3"
           foregroundColor="#ecebeb"
         >
           <circle cx="31" cy="28" r="15" />
           <rect x="60" y="14" rx="2" ry="2" width="140" height="10" />
           <rect x="60" y="30" rx="2" ry="2" width="140" height="10" />
           <rect x="0" y="60" rx="2" ry="2" width="600" height="500" />
         </ContentLoader>
       ))
     }
       </>
    )
}

export default FeedLoader
