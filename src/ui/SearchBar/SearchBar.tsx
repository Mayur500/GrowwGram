
import React, { useState, useEffect, useRef } from "react";
import './SearchBar.css'
import { useDebounce } from 'common/hooks/useDebounceHook';
import { fetchSearchResults } from 'store/actions/userProfile'
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Link } from 'react-router-dom';
import {SearchType} from 'types/user';
const SearchBar = () => {

  const {
    searchResults
  } = useAppSelector(state => state.userProfile);
  const dispatch = useAppDispatch();

  const [focus, setFocus] = useState(false);

  const searchInput = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = event.target.value
    setSearchTerm(searchInput);

  }
  const handleFocus = () => {
    setFocus(true);
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>
    ) => {

    const isOutSide = e.relatedTarget;
    if (!isOutSide) {
      setFocus(false);
    }
    if (searchInput.current) {
      searchInput.current.value = '';
    }
  }

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        dispatch(fetchSearchResults(debouncedSearchTerm))
      }
    },
    [debouncedSearchTerm]
  );
  return (

    <div className="sb21Container">
      <div className="sb21InputWrapper" onFocus={handleFocus} onBlur={handleBlur}>
        <input className="sb21Input" type="text" placeholder="Search" onChange={handleSelect} ref={searchInput} />
        <i className="sb21InputIcon fa fa-search"></i>
        {
          focus ? (<div className="sb21InputResults">
            {
              searchResults.map((result: SearchType) => (
                <Link  key={result.id} to={`/profile/${result.username}`} style={{ textDecoration: 'none' }}>
                  <div className="sb21ResultsContainer flex">
                    <img src={result.profile_image.small} alt="small" />
                    <p>{result.username}</p>
                    <p>Follow</p>
                  </div>
                </Link>

              ))
            }
          </div>) : null
        }
      </div>
    </div>

  )
}

export default SearchBar;
