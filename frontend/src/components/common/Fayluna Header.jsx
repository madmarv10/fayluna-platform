import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SearchBar from "./SearchBar";
import defaultAvatar from "../../../public/assets/images/default-avatar.png";
import { ReactComponent as BookmarkIcon } from "../../../public/assets/icons/bookmark.svg";
import { ReactComponent as HeartIcon } from "../../../public/assets/icons/heart.svg";
import { ReactComponent as ShareIcon } from "../../../public/assets/icons/share.svg";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/assets/images/logo.png"
                alt="Fayluna Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 mx-4">
            <SearchBar />
          </div>

          {/* Right: Nav Icons or Auth Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Bookmark */}
                <Link to="/bookmarks" className="hover:text-purple-600">
                  <BookmarkIcon className="h-6 w-6" />
                </Link>

                {/* Likes / Favorites */}
                <Link to="/favorites" className="hover:text-purple-600">
                  <HeartIcon className="h-6 w-6" />
                </Link>

                {/* Share */}
                <button type="button" className="hover:text-purple-600">
                  <ShareIcon className="h-6 w-6" />
                </button>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={
                        user.avatarUrl || "/assets/images/default-avatar.png"
                      }
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="hidden sm:block text-gray-700 font-medium">
                      {user.username}
                    </span>
                  </button>
                  {/* Optional dropdown menu: */}
                  {/* <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div> */}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
