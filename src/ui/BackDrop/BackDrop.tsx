
import React, { useEffect } from 'react';
import './BackDrop.css'

interface IfirstChildProps {
  setBackDrop: React.Dispatch<React.SetStateAction<boolean>>
  isDrop: boolean

}
const BackDrop: React.FC<IfirstChildProps> = ({ isDrop, setBackDrop }) => {

  {isDrop? document.body.style.overflow = 'hidden':document.body.style.overflow = 'unset'}

  return (

    <div className={`flex ${isDrop ? 'bd21Container' : ''}`} onClick={() => setBackDrop(false)}>  </div>
  )
}

export default BackDrop;
