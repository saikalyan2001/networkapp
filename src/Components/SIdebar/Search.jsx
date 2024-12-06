import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import useSearchUser from "../../hooks/useSearchUser";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import "./Search.css";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import SuggestedUser from "../../SuggestedUsers/SuggestedUser";

const Search = () => {
  const searchRef = useRef(null);
  const { user, getUserProfile, setUser } = useSearchUser();
  const [isSearch, setIsSearch] = useState(false);

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  console.log(user);

  const handleSearch = () => {
    setIsSearch(!isSearch);
  };

  const handleSearchClose = () => {
    setIsSearch(!isSearch);
  };

  return (
    <>
      <div>
        <div
          className={`search-icon  ${isSearch ? "act" : ""}`}
          onClick={handleSearch}
        >
          {isSearch ? (
            <IoSearch className="nav-icon" />
          ) : (
            <IoSearchOutline className="nav-icon" />
          )}
          Search
        </div>
      </div>

      <div className={`search-modal ${isSearch ? "act" : ""}`}>
        <div>
          <h3 className="search-title">Search user</h3>
          <div>
            <MdClose className="search-modal-close" onClick={handleSearchClose} />
          </div>
          <form onSubmit={handleSearchUser}>
            <div className="search-modal-input">
              <label htmlFor="">Username</label>
              <input type="text" placeholder="sai" ref={searchRef} />
            </div>
            <button className="search-modal-btn">Search</button>
          </form>
          {user && <SuggestedUser user={user} setUser={setUser} />}
        </div>
      </div>
    </>
  );
};

export default Search;


