import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Cpu, HelpCircle, LayoutDashboard, LogOutIcon, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Sidebar = () => {
    const [links, setLinks] = useState([
        {
            name: "DASHBOARD",
            icon: <LayoutDashboard className="h-5 w-5 mr-2 text-2xl" />,
            href: "/partner-dashboard",
            active: false,
        },
        {
            name: "PROFILE",
            icon: <User className="h-5 w-5 mr-2" />,
            href: "/partner-dashboard/profile",
            active: false,
        },
        {
            name: "RESOLUTION CENTER",
            icon: <HelpCircle className="h-5 w-5 mr-2" />,
            href: "/resolution-center",
            active: false,
        },
        {
            name: "DEV CENTER",
            icon: <Cpu className="h-5 w-5 mr-2" />,
            href: "/partner-dashboard/devcenter",
            active: false,
        },
    ]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Update the links based on the current location
        setLinks((prevLinks) =>
            prevLinks.map((link) => ({
                ...link,
                active: location.pathname === link.href,
            }))
        );
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            // Retrieve the authentication token from local storage
            const authToken = localStorage.getItem("token");

            // Send a POST request to the server's logout endpoint with the authentication token as data
            const response = await axios.post(
                `${BASE_URL}auth/logout`,
                {
                    token: authToken,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Check if the logout was successful
            if (response.status === 200) {
                toast.success("Logout Successful");
            } else {
                toast.error("Logout Failed. Please try again.");
            }
        } catch (error) {
            console.log(error);
            console.error("Error logging out:", error.message);
            toast.error("An error occurred while logging out. Please try again.");
        } finally {
            // Clear authentication token and user email from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            // Redirect to the login page
            navigate("/");
        }
    };

    return (
        <div className="flex">
            <div className="w-full md:w-[372px] max-h-screen overflow-hidden border-r border-body1 flex flex-col fixed top-[80px] left-0 bottom-0 pb-10">
                <div className="flex flex-col pt-8 space-y-4 px-4 md:px-8 lg:px-10 xl:px-12">
                    {links.map((link) => (
                        <a
                            href={link.href}
                            className={`flex items-center hover:text-primary ${link.active ? "text-primary" : "text-black"
                                }`}
                            key={link.name}
                        >
                            {link.icon}
                            <p className="">{link.name}</p>
                        </a>
                    ))}
                </div>
                <div className="px-4 md:px-8 lg:px-10 xl:px-12 mt-auto">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center text-black gap-2`}
                    >
                        <LogOutIcon />
                        <p className="">LOGOUT</p>
                    </button>
                </div>
            </div>
        </div>
    );

};


export default Sidebar;
