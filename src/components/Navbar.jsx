import { ChevronDown } from "lucide-react";
import ProfilePic from "../images/profile-pic.png";
import Logo from "../images/logo.png";

const Navbar = () => {
    return (
        <div className="text-body1 border-b border-body1/80">
            <div className="h-[121px] px-8 md:px-10 flex items-center justify-between mx-auto">
                <a href="/dashboard" className="">
                    <img src={Logo} className="hidden sm:block aspect-auto"/>
                    <img src={Logo} className="sm:hidden w-32 h-10 aspect-auto"/>
                </a>
                <div className="flex items-center justify-between ml-auto space-x-10 sm:space-x-16 md:space-x-[72px] text-3xl">
                    <a href="#">HELP</a>
                    <a href="#">SECURITY CENTER</a>
                    <div className="flex items-center">
                        <img src={ProfilePic} alt="profile picture" className="h-10 w-10" />
                        <a href="#" className="ml-2 hidden sm:block">
                            Admin 1
                        </a>
                        <ChevronDown className="h-4 w-4 ml-2 hidden sm:block" />
                    </div>
                </div>
                <div className="flex sm:hidden items-center space-x-4">
                    <a href="#">HELP</a>
                    <a href="#">SECURITY CENTER</a>
                    <div className="flex items-center">
                        <img src={ProfilePic} alt="profile picture" className="h-8 w-8" />
                        <ChevronDown className="h-4 w-4 ml-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
