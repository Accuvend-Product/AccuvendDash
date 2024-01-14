import React from "react";
import { PARTNER_DASHBOARD_ROUTE, PREFERENCES_ROUTE } from "../../Routes";
import { Link , useLocation } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProfileNavigation = () => {
  const location = useLocation();
  const {userData} = useUserData(BASE_URL)
  return (
    <>
      <div className="flex ">
        <Link
          to="/partner-dashboard/profile"
          className={`px-2 py-1 border border-gray-300 ${ location?.pathname === "/partner-dashboard/profile"? 'bg-gray-200 text-primary' : ""}  text-body1 rounded-l-md`}
        >
          Profile
        </Link>
        <Link
          to={`${PARTNER_DASHBOARD_ROUTE}${PREFERENCES_ROUTE}`}
          className={`px-2 py-1  border-gray-300
          ${userData?.entity?.role?.name === "PARTNER" ? "border-y":"border rounded-r-md"}
          ${ location?.pathname === `${PARTNER_DASHBOARD_ROUTE}${PREFERENCES_ROUTE}`? 'bg-gray-200 text-primary' : ""} font-semibold  `}
        >
          Preferences
        </Link>
        {userData?.entity?.role?.name === "PARTNER" && <Link
          to="/partner-dashboard/team-settings"
          className={`px-2 py-1 border border-gray-300 text-body1 rounded-r-md ${ location?.pathname === "/partner-dashboard/team-settings" ? 'bg-gray-200 text-primary' : ""}  `}
        >
          Team members
        </Link>}
      </div>
    </>
  );
};

export default ProfileNavigation;
