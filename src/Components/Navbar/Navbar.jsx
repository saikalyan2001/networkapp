import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { IoIosHeartEmpty, IoMdClose } from "react-icons/io";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";
import { IoIosHeart } from "react-icons/io";
import { BsPlusSquare } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { TfiMenu } from "react-icons/tfi";
import UseLogout from "../../hooks/UseLogout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";
import Search from "../Sidebar/Search";
import { FaUserCircle } from "react-icons/fa";

function Navbar({ isCreating, setIsCreating }) {
  const authUser = useAuthStore((state) => state.user);

  const [isSearch, setIsSearch] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

  const handleNotifications = () => {
    setIsNotifications(!isNotifications);
  };

  const handleMore = () => {
    setIsMore(!isMore);
  };

  const handleSearch = () => {
    setIsSearch(!isSearch);
  };

  const location = useLocation();

  useEffect(() => {
    setIsSearch(false);
    setIsMore(false);
    setIsNotifications(false);
  }, [location]);

  const togglehandleCreate = () => {
    console.log("created");

    setIsCreating(!isCreating);
  };

  const togglehandleClose = () => {
    setIsCreating(!isCreating);
  };

  const { handleLogout, isLoggingOut, error } = UseLogout();

  const { pathname } = useLocation();

  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;

  return (
    <>
      {canRenderSidebar ? (
        <div>
          <div className="navbar">
            <div className="brand-logo">Samskrithi</div>

            <div className="items">
              <div>
                <Link
                  to="/"
                  className={`nav-links ${
                    location.pathname === "/" ? "act" : ""
                  }`}
                >
                  {location.pathname === "/" ? (
                    <AiFillHome className="nav-icon" />
                  ) : (
                    <AiOutlineHome className="nav-icon" />
                  )}
                  Home
                </Link>
              </div>

              <Search />

              <div>
                <Link
                  to="explore"
                  className={`nav-links ${
                    location.pathname === "/explore" ? "act" : ""
                  }`}
                >
                  {location.pathname === "/explore" ? (
                    <MdExplore className="nav-icon" />
                  ) : (
                    <MdOutlineExplore className="nav-icon" />
                  )}
                  Explore
                </Link>
              </div>

              <div>
                <Link
                  to="reels"
                  className={`nav-links ${
                    location.pathname === "/reels" ? "act" : ""
                  }`}
                >
                  {location.pathname === "/reels" ? (
                    <BiSolidMoviePlay className="nav-icon" />
                  ) : (
                    <BiMoviePlay className="nav-icon" />
                  )}
                  Reels
                </Link>
              </div>

              <div>
                <Link
                  to="chat"
                  className={`nav-links ${
                    location.pathname === "/chat" ? "act" : ""
                  }`}
                >
                  {location.pathname === "/chat" ? (
                    <RiMessengerFill className="nav-icon" />
                  ) : (
                    <RiMessengerLine className="nav-icon" />
                  )}
                  Messages
                </Link>
              </div>

              <div>
                <div
                  className={`notification-icon ${
                    isNotifications ? "act" : ""
                  }`}
                  onClick={handleNotifications}
                >
                  {isNotifications ? (
                    <IoIosHeart className="nav-icon" />
                  ) : (
                    <IoIosHeartEmpty className="nav-icon" />
                  )}
                  Notifications
                </div>
              </div>

              <div>
                <Link onClick={togglehandleCreate} className="nav-links">
                  <BsPlusSquare className="nav-icon" />
                  Create
                </Link>
              </div>

              <div>
                <Link
                  to={`${authUser.username}`}
                  className={`nav-links ${
                    location.pathname === "/profile" ? "act" : ""
                  }`}
                >
                  {authUser?.profilePicURL ? (
                    <img
                      src={authUser.profilePicURL}
                      alt="profile-pic"
                      className={
                        location.pathname === "/profile"
                          ? "profile-nav-act"
                          : "profile-nav"
                      }
                    />
                  ) : (
                    <FaUserCircle
                      className={
                        location.pathname === "/profile"
                          ? "profile-nav-act-icon"
                          : "profile-nav-icon"
                      }
                    />
                  )}
                  Profile
                </Link>
              </div>

              
            </div>

            <div onClick={handleLogout} className="logout-btn">
              Logout
            </div>

            <div>
              <div
                className={`more-icon ${isMore ? "act" : ""}`}
                onClick={handleMore}
              >
                {isMore ? (
                  <TfiMenu className="nav-icon" />
                ) : (
                  <FiMenu className="nav-icon" />
                )}
                More
              </div>
            </div>
          </div>

          <div className="vertical-line"></div>

          <div
            className={isCreating ? "overlay-active" : "overlay"}
            onClick={togglehandleClose}
          >
            <span className="close">
              <IoMdClose />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
