import ContentLoader from 'react-content-loader'

const SuggestionLoader = () => {

   const iterator = [1, 2, 3, 4, 5]
  return (
    <>
      {
        iterator.map(item => (
          <ContentLoader
            key={item}
            height={150}
            width={150}
            foregroundColor='var(--background)'
            backgroundColor='var(--grey)'
          >
            <circle cx="25" cy="50" r="20" />
            <rect x="60" y="45" rx="3" ry="3" width="120" height="7" />
            <rect x="60" y="60" rx="3" ry="3" width="110" height="6" />
          </ContentLoader>
        ))
      }
    </>
  )
}
export default SuggestionLoader;
