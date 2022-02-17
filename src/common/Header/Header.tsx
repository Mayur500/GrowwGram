import React from "react";
import './Header.css'
import {SearchBar} from "ui";
import HeaderNavigation from './HeaderNavigation/HeaderNavigation'
import { Link } from "react-router-dom";
const Header = () => {


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <header className="hd21Container" >
        <div className="hd21Items flex main21Content">
          <Link to={'/'} className="hd21Logo">
          <div>
            Growwgram
          </div>
          </Link>
          <SearchBar />
          <HeaderNavigation />
        </div>
      </header>
    </>
  )
}

export default Header;
