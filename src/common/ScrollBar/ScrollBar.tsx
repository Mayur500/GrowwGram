import React, {useEffect, useState} from 'react';
import './ScrollBar.css';
  
const ScrollBar = () =>{

  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    if (window.scrollY > 300){
      setVisible(true)
    } 
    else{
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);

    return () => {
      window.removeEventListener('scroll', toggleVisible);
    }
  }, [])
  
  return (
    <div onClick={scrollToTop} className={`sb21ScrollContainer ${visible ? 'fadeInUp':'sb21Hidden'}`}>
     <i className="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
  );
}
  

export default ScrollBar;
