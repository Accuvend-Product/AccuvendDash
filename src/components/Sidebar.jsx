import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Erp from "./icons/erp";
import {
  Cpu,
  HelpCircle,
  LayoutDashboard,
  LogOutIcon,
  User,
  ArrowRightLeft,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
// import { Replay } from "lucide-react";
import Replay from "./icons/replay.jsx";
import MessageQuestion from "./icons/messagequestion";
import {
  ADMIN_ROUTE,
  CUSTOMER_CARE_ROUTE,
  EVENT_ROUTE,
  PARTNERS_ROUTE,
  REPLAY_ROUTE,
  SUPPORT_ROUTE,
  TRANSACTION_ROUTE,
} from "../Routes";
import { CUSTOMERCARE, PARTNER, ADMIN, CUSTOMER } from "../Constants";
import { useLogout } from "../hooks/utilityHooks";
import Profile2Users from "./icons/profile2user";
import {
  ParnterLinks,
  CustomerCareLinks,
  CustomerLinks,
  AdminLinks,
} from "./menu-items.jsx";

const PORTAL_TYPE = import.meta.env.VITE_PORTAL_TYPE;

const Sidebar = ({ sideBartype }) => {
  const { handleLogout, isLogginLoading } = useLogout();
  const links = (() => {
    let _link = "";
    switch (PORTAL_TYPE) {
      case CUSTOMERCARE:
        _link = CustomerCareLinks;
        break;
      case ADMIN:
        _link = AdminLinks;
        break;
      case PARTNER:
        _link = ParnterLinks;
        break;
      case CUSTOMER:
        _link = CustomerLinks;
        break;
      default:
        _link = ParnterLinks;
        break;
    }
    return _link;
  })();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSupportSubLinks, setShowSupportSublinks] = useState();

  return (
    <div className="flex">
      <div className="hidden md:w-[260px] max-h-screen overflow-hidden border-r border-body1 md:flex flex-col fixed top-0 left-0 bottom-0 pb-10 pt-16">
        <div className="flex flex-col pt-8 space-y-4 px-4 md:px-4 lg:px-4 xl:px-6">
          {links.map((link) => (
            <>
            
            {!link?.subLinks ? <span className="flex flex-col">
              <a
                href={link.href}
                className={`hover:bg-gray-100 rounded-md px-2  text-sm hover:px-3 py-2 flex items-center justify-between hover:text-primary ${
                  location?.pathname === link?.href
                    ? "text-primary"
                    : "text-black"
                }`}
                target={link?.blank ? "_blank" : ""}
                key={link.name}
              >
                <div className="flex items-center">
                  {link.icon}
                  <p className="">{link.name}</p>
                </div>
              </a>
            </span> : <SubLinkDropDownSidebar  navigate={navigate} location={location} link={link}/>}

            </>
          ))}
        </div>
        <div className="px-4 md:px-6 lg:px-6 xl:px-8 mt-auto">
          <button
            onClick={handleLogout}
            disabled={isLogginLoading}
            className={`flex items-center ${
              isLogginLoading ? "text-gray-200" : "text-black"
            } gap-2`}
          >
            <LogOutIcon />
            <p className="">{isLogginLoading ? "LOGGING OUT ..." : "LOGOUT"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const SubLinkDropDownSidebar = ({navigate , location , link}) => {
  const [showSupportSubLinks, setShowSupportSublinks] = useState(false);
  return (
    <span className="flex flex-col">
      <a
        href={link.href}
        className={`hover:bg-gray-100 rounded-md px-2  text-sm hover:px-3 py-2 flex items-center justify-between hover:text-primary ${
          location?.pathname === link?.href ? "text-primary" : "text-black"
        }`}
        target={link?.blank ? "_blank" : ""}
        key={link.name}
        onClick={(event) => {
          if (link.subLinks) {
              event.preventDefault();
              setShowSupportSublinks((prevState) => !prevState);
          }
        }}
      >
        <div className="flex items-center">
          {link.icon}
          <p className="">{link.name}</p>
        </div>

        {link?.subLinks ? (
          <>
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </>
        ) : (
          ""
        )}
      </a>
      {link?.subLinks && showSupportSubLinks ? (
        <>
          <ol className="mt-2 pl-9">
            {link?.subLinks?.map((item) => (
              <>
                <li className="mt-4 text-sm">
                  <a
                    href={item?.href}
                    className={`${
                      location?.pathname === item?.href
                        ? "text-primary"
                        : "text-black"
                    } hover:text-primary`}
                  >
                    {item.name}
                  </a>
                </li>
              </>
            ))}
          </ol>
        </>
      ) : (
        ""
      )}
    </span>
  );
};

export default Sidebar;
