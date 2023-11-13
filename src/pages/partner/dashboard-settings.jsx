import { ChevronDown } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";
import EmailIcon from "../../components/icons/email";
import BellIcon from "../../components/icons/bell";
import LinkIcon from "../../components/icons/link";
import LockIcon from "../../components/icons/lock";
import PhoneIcon from "../../components/icons/phone";
import { Link } from 'react-router-dom';

const PartnerDashboardSettings = () => {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className=" px-8 sm:px-10 md:px-12 border-b border-body1 flex-1 pb-10">
                    <div className="mt-10 space-y-2">
                        <h1 className="text-2xl font-bold">Preferences</h1>
                        <p className="text-body1">Take a look at your policies and the new policy to see what is covered</p>
                        <div className="flex ">
                            <Link to="/partner-dashboard/profile"  className="px-2 py-1 border border-gray-300 text-body1 rounded-l-md">Profile</Link>
                            <Link to="/partner-dashboard/preferences"  className="px-2 py-1 border-y border-gray-300 text-primary font-semibold  ">Preferences</Link>
                            <Link to="/partner-dashboard/team-settings" className="px-2 py-1 border border-gray-300 text-body1 rounded-r-md ">Team members</Link>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center border border-gray-200 rounded-md">
                        {/* Container div */}
                        <div className="flex flex-col space-y-8 items-center pt-4 pb-14 w-1/2">
                            {/* Email Settings */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                    <EmailIcon />
                                    <div className="flex flex-col">
                                        <p className="font-bold">Email Settings</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm">zenithbankplc@gmail.com</p>
                                            <span className="text-secondary bg-[#E7F6EC] px-2 py-0.5 rounded-full text-xs">Verified</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-auto" />
                            </div>

                            {/* Notifications */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                    <BellIcon />
                                    <div className="flex flex-col">
                                        <p className="font-bold">Notifications</p>
                                        <p className="text-sm">Choose what we get in touch about</p>
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-auto" />
                            </div>

                            {/* Connected account */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                    <LinkIcon />
                                    <div className="flex flex-col">
                                        <p className="text-gray-300 font-bold">Connected Accounts</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-300">Integrations connected to your Rayna account</p>
                                            <span className="text-[#954A00] bg-[#FFCA96] px-2 py-0.5 rounded-full text-xs text-center">Coming Soon</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-auto" />
                            </div>

                            {/* change password */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                    <LockIcon />
                                    <div className="flex flex-col">
                                        <p className="font-bold">Change Password</p>
                                        <p className="text-sm">***************</p>
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-auto" />
                            </div>
                            
                            {/* 2 step verification */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                    <PhoneIcon />
                                    <div className="flex flex-col">
                                        <p className="font-bold">2-step verification</p>
                                        <p className="text-sm">Manage your 2-step authentication methods</p>
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-auto" />
                            </div>

                            {/* Webhooks */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                    <LinkIcon />
                                    <div className="flex flex-col">
                                        <p className="text-gray-300 font-bold">Wehooks</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-300">You do not have any active webhooks</p>
                                            <span className="text-[#954A00] bg-[#FFCA96] px-2 py-0.5 rounded-full text-xs text-center">Coming Soon</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-auto" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default PartnerDashboardSettings