import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ReactComponent as HomeIcon } from "../../../public/assets/icons/home.svg";
import { ReactComponent as ExploreIcon } from "../../../public/assets/icons/explore.svg";
import { ReactComponent as AnalyticsIcon } from "../../../public/assets/icons/analytics.svg";
import { ReactComponent as BookmarkIcon } from "../../../public/assets/icons/bookmark.svg";
import { ReactComponent as UserIcon } from "../../../public/assets/icons/user.svg";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: <HomeIcon className="h-6 w-6" /> },
    { to: "/explore", label: "Explore", icon: <ExploreIcon className="h-6 w-6" /> },
    user && {
      to: "/analytics",
      label: "Analytics",
      icon: <AnalyticsIcon className="h-6 w-6" />,
    },
    user && {
      to: "/bookmarks",
      label: "Bookmarks",
      icon: <BookmarkIcon className="h-6 w-6" />,
    },
    user && {
      to: "/profile",
      label: "Profile",
      icon: <UserIcon className="h-6 w-6" />,
    },
  ].filter(Boolean);

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r">
      <nav className="mt-8 px-4">
        {links.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center space-x-3 mb-4 p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-purple-600"
              }`}
            >
              {icon}
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
