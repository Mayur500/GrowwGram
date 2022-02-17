import ContentLoader from 'react-content-loader'

const UserInfoLoader = () => (

  <div className='up21LoaderInfo'>
 <ContentLoader

 viewBox="0 0 250 100"
 foregroundColor='var(--background)'
 backgroundColor='var(--grey)'
 width="500"
 height="200"
>
 <circle cx="50" cy="70" r="10" />
 <rect x="100" y="50" width="120" height="10" />
 <rect x="70" y="70" width="160" height="10" />
 <rect x="100" y="90" width="120.5" height="10" />

</ContentLoader>
</div>
)

export default UserInfoLoader;
