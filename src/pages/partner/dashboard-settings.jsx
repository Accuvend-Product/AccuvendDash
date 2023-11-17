import { ChevronDown } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";
import EmailIcon from "../../components/icons/email";
import BellIcon from "../../components/icons/bell";
import LinkIcon from "../../components/icons/link";
import LockIcon from "../../components/icons/lock";
import PhoneIcon from "../../components/icons/phone";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PartnerDashboardSettings = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const oldEmailValue = localStorage.getItem("userEmail");

  const handlePasswordChange = async () => {
    try {
      // Send a POST request to the server's "auth/changepassword" endpoint
      const response = await axios.post(
        `${BASE_URL}auth/changepassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("response", response);

      // Check if the password change was successful
      if (response.status === 200) {
        console.log("Password changed successfully");
        toast.success("Password changed successfully");
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error.message);
      toast.error(
        "An error occurred while changing the password. Please try again."
      );
    }

    // Clear input fields after changing the password
    setOldPassword("");
    setNewPassword("");
  };

  const handleEmailChange = async () => {
    try {

        console.log("newEmail", newEmail);
      // Send a POST request to the server's "auth/changepassword" endpoint
      const response = await axios.patch(
        `${BASE_URL}profile/email`,
        {
          email: newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Check if the password change was successful
      if (response.status === 200) {
        console.log("Email changed successfully");
        toast.success("Email changed successfully");

        // Update the email in local storage
        localStorage.setItem("email", newEmail);
      } else {
        toast.error("Failed to change email. Please try again.");
      }
    } catch (error) {
      console.error("Error changing email:", error);
      toast.error(
        "An error occurred while changing the email. Please try again."
      );
    }

    // Clear input fields after changing the password
    setNewEmail("");
  };

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className=" px-8 sm:px-10 md:px-12 border-b border-body1 flex-1 pb-10">
                    <div className="mt-10 space-y-2">
                        <h1 className="text-2xl font-bold">Preferences</h1>
                        <p className="text-body1">
                            Take a look at your policies and the new policy to see what is
                            covered
                        </p>
                        <div className="flex ">
                            <Link
                                to="/partner-dashboard/profile"
                                className="px-2 py-1 border border-gray-300 text-body1 rounded-l-md"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/partner-dashboard/preferences"
                                className="px-2 py-1 border-y border-gray-300 bg-gray-200 text-primary font-semibold  "
                            >
                                Preferences
                            </Link>
                            <Link
                                to="/partner-dashboard/team-settings"
                                className="px-2 py-1 border border-gray-300 text-body1 rounded-r-md "
                            >
                                Team members
                            </Link>
                        </div>
                    </div>

          <div className="mt-10 flex justify-center border border-gray-200 rounded-md">
            {/* Container div */}
            <div className="flex flex-col space-y-8 items-center pt-4 pb-14 w-1/2">
              {/* Email Settings */}
              <div className="w-full">
                <div
                  className="flex items-center justify-between w-full cursor-pointer"
                  onClick={() => setShowChangeEmail(!showChangeEmail)}
                >
                  <div className="flex items-center gap-4">
                    <EmailIcon />
                    <div className="flex flex-col">
                      <p className="font-bold">Email Settings</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{oldEmailValue}</p>
                        <span className="text-secondary bg-[#E7F6EC] px-2 py-0.5 rounded-full text-xs">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </div>

                {showChangeEmail && (
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="email"
                      placeholder="New Email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="border border-gray-300 rounded-md focus:outline-none px-3 py-2"
                    />
                    <button
                      onClick={handleEmailChange}
                      className="bg-primary text-white rounded-md px-2 py-2"
                    >
                      Confirm
                    </button>
                  </div>
                )}
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
                                        <p className="text-gray-300 font-bold">
                                            Connected Accounts
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-300">
                                                Integrations connected to your Rayna account
                                            </p>
                                            <span className="text-[#954A00] bg-[#FFCA96] px-2 py-0.5 rounded-full text-xs text-center">
                                                Coming Soon
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-auto" />
                            </div>
                            <div className="w-full">
                                <div
                                    className="flex items-center justify-between w-full cursor-pointer"
                                    onClick={() => setShowChangePassword(!showChangePassword)}
                                >
                                    <div className="flex items-center gap-4">
                                        <LockIcon />
                                        <div className="flex flex-col">
                                            <p className="font-bold">Change Password</p>
                                            <p className="text-sm">***************</p>
                                        </div>
                                    </div>
                                    <ChevronDown className="h-4 w-4 ml-auto" />
                                </div>
                                {showChangePassword && (
                                    <div className="mt-4 flex items-center gap-2">
                                        <input
                                            type="password"
                                            placeholder="Old Password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            className="border border-gray-300 rounded-md focus:outline-none px-3 py-2"
                                        />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="border border-gray-300 rounded-md focus:outline-none px-3 py-2"
                                        />
                                        <button
                                            onClick={handlePasswordChange}
                                            className="bg-primary text-white rounded-md px-2 py-2"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* 2 step verification */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                    <PhoneIcon />
                                    <div className="flex flex-col">
                                        <p className="font-bold">2-step verification</p>
                                        <p className="text-sm">
                                            Manage your 2-step authentication methods
                                        </p>
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
                                            <p className="text-sm text-gray-300">
                                                You do not have any active webhooks
                                            </p>
                                            <span className="text-[#954A00] bg-[#FFCA96] px-2 py-0.5 rounded-full text-xs text-center">
                                                Coming Soon
                                            </span>
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
};

export default PartnerDashboardSettings;
