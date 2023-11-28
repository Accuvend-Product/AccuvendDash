import { BellIcon, ChevronDown } from "lucide-react";
import ProfilePic from "../images/profile-pic.png";
import Logo from "../images/logo.png";
import useUserData from "../hooks/useUserData";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const { uploadedImageLink, unreadNotifications } = useUserData(BASE_URL);
  const userEmail = localStorage.getItem("userEmail");
  return (
    <div className="text-body1 border-b border-body1/80 sticky top-0 z-50">
      <div className="h-[80px] px-8 md:px-10 flex items-center justify-between mx-auto bg-white w-full">
        <a href="/dashboard" className="">
           <img src={Logo} className="block h-9 aspect-auto" />
       {/* <img src={Logo} className="hidden sm:block h-10 aspect-auto" />
           <img src={Logo} className="sm:hidden h-10 aspect-auto" /> */}
        </a>
        <div className="flex items-center ml-auto space-x-10 sm:space-x-16 md:space-x-[50px] text-xl">
          <div className="hover:cursor-pointer relative">
            <BellIcon className="h-7 w-7" />
            {!(unreadNotifications > 0) && (
             <div className="absolute top-1 right-1.5 transform translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-red-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center">
            <a href="#" className="ml-2 text-4xl hidden sm:block">
              {uploadedImageLink ? (
                <img
                  src={uploadedImageLink}
                  alt="profile picture"
                  className="h-8 w-8"
                />
              ) : userEmail && userEmail.length > 0 ? (
                userEmail[0].toUpperCase()
              ) : (
                ""
              )}
            </a>
            <ChevronDown className="h-4 w-4 ml-2 hidden sm:block" />
          </div>
        </div>
        <div className="flex sm:hidden items-center space-x-4">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
