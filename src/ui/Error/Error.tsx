import './Error.css';

import React from 'react';
import { Link } from "react-router-dom";


interface IfirstChildProps {
  msg: string
}

const Error: React.FC<IfirstChildProps> = ({ msg }) => {
  return (
    <div className="es01Container flex">
      <p>
        {msg}
      </p>
      <Link to="/">Home Page </Link>

    </div>
  );
};

export default Error;
