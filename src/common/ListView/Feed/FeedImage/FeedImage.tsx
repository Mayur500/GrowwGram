import './FeedImage.css';
import React,  {useState,useRef } from 'react';
import {useIntersection} from 'common/hooks/useIntersectionHook';
import { PostsType } from 'types/post';
import { UserProfileImageType } from 'types/user';
interface IfirstChildProps {
    setLike: Function,
    postUrl : UserProfileImageType
}


const FeedImage: React.FC<IfirstChildProps> = ({ postUrl, setLike }) => {

    const [isdouble, setDouble] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);
    const doubleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setLike(true);
        setDouble(!isdouble);
    }

    useIntersection(imgRef, () => {
        setIsInView(true);
    });
    const handleOnLoad = () => {
        setIsLoaded(true);
      };
    return  (

        <div className='mi21Container' onDoubleClick={doubleClick} ref={imgRef}>

             {isInView && (
        <>
          <img
            className={`image thumb ${isLoaded ? 'mi21Thumb':''}`}
            src={postUrl.thumb}
          />
          <img
            className={`image regular ${isLoaded ? 'mi21ThumbFull':''}`}
            src={postUrl.regular}
            onLoad={handleOnLoad}
          />
        </>
      )}
            <div className={`gc21PhotoOverlays flex  ${isdouble ? 'double' : ''}`}>
                <div className="gc21PhotoOverlayStats">
                    <i className="fa fa-heart fa-5x" style={{ color: "red" }}></i>
                </div>
            </div>
        </div>
    );
}

export default FeedImage;
