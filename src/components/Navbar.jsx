import { ChevronDown } from "lucide-react";
import ProfilePic from "../images/profile-pic.png";
import Logo from "../images/logo.png";

const Navbar = () => {
    return (
        <div className="text-body1 border-b border-body1/80">
            <div className="h-[121px] px-4 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between mx-auto">
                <a href="/dashboard" className="">
                    <img src={Logo} className="hidden sm:block max-h-10 aspect-auto"/>
                    <img src={Logo} className="sm:hidden max-w-32 h-auto" />
                </a>
                <div className="flex items-center justify-between ml-auto space-x-4 sm:space-x-8 md:space-x-[72px] text-base md:text-3xl">
                    <a href="#" className="hidden sm:block">HELP</a>
                    <a href="#" className="hidden sm:block">SECURITY CENTER</a>
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
