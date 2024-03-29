import {
  AlertCircle,
  BellIcon,
  BellOff,
  ChevronDown,
  Loader,
} from "lucide-react";
import ProfilePic from "../images/profile-pic.png";
import Logo from "../images/logo.png";
import useUserData from "../hooks/useUserData";
import { useNotificationData } from "../hooks/useGetNotifications";
import { ADMIN, CUSTOMERCARE, PARTNER, CUSTOMER } from "../Constants";
import { useState, useRef, useEffect } from "react";
import { useLogout } from "../hooks/utilityHooks";
import { LogOutIcon } from "lucide-react";
import {
  ADMIN_ROUTE,
  CUSTOMER_CARE_ROUTE,
  EVENT_ROUTE,
  REPLAY_ROUTE,
  TRANSACTION_ROUTE,
} from "../Routes";
import { Link } from "react-router-dom";
import {
  ParnterLinks,
  CustomerCareLinks,
  CustomerLinks,
  AdminLinks,
} from "./menu-items.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORTAL_TYPE = import.meta.env.VITE_PORTAL_TYPE;
import { useNavigate, useLocation } from "react-router-dom";
import OneSignal from "react-onesignal";
const NotificationDropDown = ({ NotificationData }) => {
  const { isError, isLoading, data: notificationData } = NotificationData;
  const [show, setShow] = useState(false);
  const DropDownMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
      setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative" ref={DropDownMenuRef}>
        <div className="inline-flex items-center overflow-hidden rounded-md">
          <button
            type="button"
            onClick={() => setShow((prevState) => !prevState)}
            className="relative inline-flex items-center p-2 text-sm font-medium text-center"
          >
            <BellIcon className="h-6 w-6" />

            <div
              className={`absolute inline-flex items-center justify-center w-5 h-5 ${
                notificationData && notificationData?.length > 10
                  ? "text-[6.5px]"
                  : "text-[7.5px]"
              } font-bold text-white bg-red-500 border-2 border-white rounded-full top-0.5 end-0.5 `}
            >
              {notificationData
                ? notificationData?.length > 99
                  ? "99+"
                  : notificationData?.length
                : "0"}
            </div>
          </button>
        </div>

        {show && (
          <div
            className="absolute end-0 z-10 mt-2 w-72 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
          >
            <div className="p-2">
              <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                {" "}
                Notifications{" "}
              </strong>

              <div className="h-40 overflow-y-scroll ">
                {isLoading ? (
                  <>
                    <div className=" h-5/6 w-full flex items-center justify-center mt-3">
                      <div role="">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {isError && !isLoading && !notificationData ? (
                  <>
                    <div className=" h-5/6 mt-3 flex flex-col gap-y-2 justify-center items-center text-red-500">
                      <AlertCircle className="w-5 h-5" />
                      <div className="text-sm">Oops Something Went Wrong</div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {!isError &&
                !isLoading &&
                notificationData &&
                notificationData?.length > 0 ? (
                  <>
                    {notificationData?.map((item) => (
                      <div
                        href="#"
                        className="flex flex-col gap-y-1 rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        <p className="text-black text-sm">{item?.heading}</p>
                        <p className="text-xs truncate">{item?.message}</p>
                        <p className="text-xs text-end">
                          {new Date(item?.createdAt)?.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}

                {!isError &&
                !isLoading &&
                notificationData &&
                notificationData?.length < 0 ? (
                  <>
                    <div className=" h-5/6 mt-3 flex flex-col gap-y-2 justify-center items-center text-blue-500">
                      <BellOff className="w-5 h-5" />
                      <div className="text-sm">No more notifications</div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="p-2">
              <Link
                to="/notifications"
                className={`flex w-full px-4 py-2 text-sm items-center text-blue-700 hover:bg-blue-50 gap-2`}
              >
                <p className="text-center w-full">See more</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const IconDropDown = ({ uploadedImageLink, userEmail }) => {
  const [show, setShow] = useState(false);
  const { handleLogout, isLogginLoading } = useLogout();
  const DropDownMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
      setShow(false);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [showSupportSubLinks, setShowSupportSublinks] = useState();

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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <>
      <div className="relative" ref={DropDownMenuRef}>
        <div className="inline-flex items-center overflow-hidden rounded-md">
          <button
            type="button"
            onClick={() => setShow((prevState) => !prevState)}
            className="relative inline-flex items-center p-2 text-sm font-medium text-center"
          >
            {uploadedImageLink ? (
              <img
                src={uploadedImageLink}
                alt="profile picture"
                className="w-6 h-6 rounded-full ring-2 ring-gray-300 p-1"
              />
            ) : userEmail && userEmail?.length > 0 ? (
              <>
                <div className="relative ring-2 ring-gray-300 p-1 text-xs inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full ">
                  <span className="font-medium ">
                    {userEmail[0].toUpperCase()}
                  </span>
                </div>
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
              <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full ring-2 ring-gray-300 p-1">
                <svg
                  className="absolute w-6 h-6 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            )}
          </button>
        </div>

        {show && (
          <div
            className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
          >
            <div className="p-2">
              {/* className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem" */}

              {links.map((link) => (
                <IconDropDownItem  link={link} location={location} navigate={navigate}/>
              ))}
            </div>

            <div className="p-2">
              <button
                onClick={handleLogout}
                disabled={isLogginLoading}
                className={`flex w-full px-4 py-2 text-sm items-center text-red-700 hover:bg-red-50 ${
                  isLogginLoading ? "text-gray-200" : "text-black"
                } gap-2`}
              >
                <LogOutIcon className="w-4 h-4" />
                <p className="">
                  {isLogginLoading ? "LOGGING OUT ..." : "LOGOUT"}
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const IconDropDownItem = ({location , link, navigate }) => {
  const [showSupportSubLinks, setShowSupportSublinks] = useState();
  return <>
   <span className="flex flex-col">
                  <a
                    href={link.href}
                    className="flex items-center justify-between  rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                    // className={`hover:bg-gray-100 rounded-md pl-2 text-sm hover:pl-3 py-2 flex items-center hover:text-primary ${
                    //   location?.pathname === link?.href
                    //     ? "text-primary"
                    //     : "text-black"
                    // }`}
                    target={link?.blank ? "_blank" : ""}
                    key={link.name}
                    onClick={(event) => {
                      if (link.subLinks) {
                          event.preventDefault();
                          setShowSupportSublinks((prevState) => !prevState);
                      }
                    }}
                  >
                    
                    <p className="">{link.name.charAt(0) + link.name.slice(1).toLowerCase() }</p>
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
                      <ol className="mt-2 pl-8">
                        {link?.subLinks?.map((item) => (
                          <>
                            <li className="mt-1.5 text-sm">
                              <a
                                href={item?.href}
                                className="block rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                role="menuitem"
                                // className={`${
                                //   location?.pathname === item?.href
                                //     ? "text-primary"
                                //     : "text-black"
                                // } hover:text-primary`}
                              >
                                {item.name.charAt(0) + item.name.slice(1).toLowerCase() }
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
  </>
}

const Navbar = () => {
  const { uploadedImageLink, unreadNotifications , userData } = useUserData(BASE_URL);
  const NotificationData = useNotificationData(BASE_URL);
  const userEmail = localStorage.getItem("userEmail");

  

  return (
    <div className="text-body1 border-b border-body1/80 sticky top-0 z-20">
      <div className="py-2.5 px-8 md:px-10 flex items-center justify-between mx-auto bg-white w-full">
        <a href="#" className="flex w-auto divide-x-[3px] divide-[#002E87] ">
          <div className=" h-full mr-2 relative top-[0.425rem]">
            <img
              src={Logo}
              className="block h-[0.825rem]  xl-h-4 aspect-auto"
            />
          </div>

          <div className="font-bold text-base pl-2 text-[#002E87]">
            {PORTAL_TYPE === PARTNER ? "Partner" : ""}
            {PORTAL_TYPE === CUSTOMERCARE ? "Support" : ""}
            {PORTAL_TYPE === ADMIN ? "Admin" : ""}
            {PORTAL_TYPE === CUSTOMER ? "Customer" : ""}
          </div>
        </a>

        <div className="flex items-center gap-3">
          {/* Notification */}
          {userData?.entity?.partnerProfileId && <NotificationDropDown NotificationData={NotificationData} />}
          {/* Notification end */}
          <IconDropDown
            userEmail={userEmail}
            uploadedImageLink={uploadedImageLink}
          />
        </div>

        {/* <div className="flex sm:hidden items-center space-x-4">
          <div className="flex items-center">
            {uploadedImageLink ? (
              <img
                src={uploadedImageLink}
                alt="profile picture"
                className="h-8 w-8"
              />
            ) : (
              <img src={ProfilePic} alt="profile picture" className="h-8 w-8" />
            )}
            <ChevronDown className="h-4 w-4 ml-2" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
