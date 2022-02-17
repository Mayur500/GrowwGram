import './gridView.css';

import React ,{useState,useRef}from 'react';
import {useIntersection} from 'common/hooks/useIntersectionHook';
import {UserPhotos} from 'types/user';


interface IfirstChildProps {
  photo : UserPhotos
}

const GridViewImage : React.FC<IfirstChildProps> = ({photo}) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useIntersection(imgRef, () => {
    setIsInView(true);
});
const handleOnLoad = () => {
    setIsLoaded(true);
  };

return (

  <div className="gv21ImageContainer" ref={imgRef}>

 {isInView && (
  <>
    <img
      className={`gc01GridPhoto image thumb ${isLoaded ? 'mi21Thumb':''}`}
      src={photo.urls.thumb}
      alt={photo.alt_description || ""}
    />
    <img
      className={`gc01GridPhoto image regular ${isLoaded ? 'mi21ThumbFull':''}`}
      alt = {photo.alt_description || ""}
      src={photo.urls.regular}
      onLoad={handleOnLoad}
    />
  </>
)}
  </div>
)
 }


 export default GridViewImage;
