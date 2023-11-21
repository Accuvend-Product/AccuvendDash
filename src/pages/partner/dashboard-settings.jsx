/* eslint-disable no-unused-vars */
import { ChevronDown, XIcon } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";
import EmailIcon from "../../components/icons/email";
import BellIcon from "../../components/icons/bell";
import LinkIcon from "../../components/icons/link";
import LockIcon from "../../components/icons/lock";
import PhoneIcon from "../../components/icons/phone";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PartnerDashboardSettings = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [showNotificationsModal, setShowNotificationsModal] = useState(false);
    const [notificationOptions, setNotificationOptions] = useState({
        notifyLogin: false,
        notifyNewTransactions: false,
        notifyFailedTransaction: false,
        notifyNewAccounts: false,
    });

    useEffect(() => {
        // Fetch user's notification preferences from the server and update state
        // Make an API call to get the user's notification preferences and update notificationOptions state
        // Example:
        // axios.get(`${BASE_URL}profile/notification-preferences`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // })
        // .then((response) => {
        //   setNotificationOptions(response.data);
        // })
        // .catch((error) => {
        //   console.error("Error fetching notification preferences:", error);
        // });
    }, []);

    const handleNotificationCheckboxChange = async (option) => {
        try {
            // Update the state optimistically
            setNotificationOptions((prevOptions) => ({
                ...prevOptions,
                [option]: !prevOptions[option],
            }));

            // Send a PATCH request to update the notification preference on the server
            const updatedValue = !notificationOptions[option]; // Updated value for the checkbox

            await axios.patch(
                `${BASE_URL}profile/notification-preferences`,
                {
                    [option]: updatedValue,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Optionally, show a success toast or perform any other actions upon successful update
            toast.success(`Notification ${option} updated successfully`);
        } catch (error) {
            console.error(`Error updating ${option} notification:`, error);
            // Rollback the state change on error by reverting to the previous value
            setNotificationOptions((prevOptions) => ({
                ...prevOptions,
                [option]: !prevOptions[option],
            }));
            toast.error(`Failed to update ${option} notification. Please try again.`);
        }
    };


    const oldEmailValue = localStorage.getItem("userEmail");

    const handlePasswordChange = async () => {
        try {
            if (newPassword !== newPassword2) {
                toast.error("Passwords do not match. Please try again.");
                return;
            }
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
        setNewPassword2("");
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
                <div className="ml-[372px] px-8 sm:px-10 md:px-12 border-b border-body1 flex-1 pb-10">
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
                                            Enter
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Notifications */}
                            <div className="flex items-center justify-between w-full">
                                <div
                                    className="flex items-center gap-4 cursor-pointer"
                                >
                                    <BellIcon />
                                    <div className="flex flex-col">
                                        <p className="font-bold">Notifications</p>
                                        <p className="text-sm">Choose what we get in touch about</p>
                                    </div>
                                </div>
                                <ChevronDown onClick={() => setShowNotificationsModal(true)} className="h-4 w-4 ml-auto" />
                            </div>
                            {/* Modal for Notifications */}
                            {showNotificationsModal && (
                                <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                                    {/* Modal */}
                                    <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-3/4 max-w-md">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-xl font-bold">Notifications</h2>
                                            <button
                                                onClick={() => setShowNotificationsModal(false)}
                                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                            >
                                                <XIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                        <div className="flex flex-col space-y-4">
                                            {/* Your checkboxes and labels here */}
                                            <label className="flex justify-between">
                                                Notify Login
                                                <input
                                                    type="checkbox"
                                                    checked={notificationOptions.notifyLogin}
                                                    onChange={() => handleNotificationCheckboxChange('notifyLogin')}
                                                />
                                            </label>
                                            <label className="flex justify-between">
                                                Notify Failed Transaction
                                                <input
                                                    type="checkbox"
                                                    checked={notificationOptions.notifyFailedTransaction}
                                                    onChange={() =>
                                                        handleNotificationCheckboxChange('notifyFailedTransaction')
                                                    }
                                                />
                                            </label>
                                            <label className="flex justify-between">
                                                Notify New Accounts
                                                <input
                                                    type="checkbox"
                                                    checked={notificationOptions.notifyNewAccounts}
                                                    onChange={() =>
                                                        handleNotificationCheckboxChange('notifyNewAccounts')
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                    <div className="mt-4 flex flex-col gap-2">
                                        <input
                                            type="password"
                                            placeholder="Old Password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            className="border border-gray-300 rounded-md focus:outline-none px-3 py-2 w-full"
                                        />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="border border-gray-300 rounded-md focus:outline-none px-3 py-2 w-full"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Confirm New Password"
                                            value={newPassword2}
                                            onChange={(e) => setNewPassword2(e.target.value)}
                                            className="border border-gray-300 rounded-md focus:outline-none px-3 py-2 w-full"
                                        />
                                        <button
                                            onClick={handlePasswordChange}
                                            className="bg-primary text-white rounded-md px-2 py-2"
                                        >
                                            Enter
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
