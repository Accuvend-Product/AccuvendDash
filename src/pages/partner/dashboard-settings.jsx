/* eslint-disable no-unused-vars */
import { ChevronDown, XIcon } from "lucide-react";

import EmailIcon from "../../components/icons/email";
import BellIcon from "../../components/icons/bell";
import LinkIcon from "../../components/icons/link";
import LockIcon from "../../components/icons/lock";
import PhoneIcon from "../../components/icons/phone";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import MainContent from "../../components/MainContent";
import useUserData from "../../hooks/useUserData";

const BASE_URL = import.meta.env.VITE_BASE_URL;

import { PARTNER_DASHBOARD_ROUTE, PREFERENCES_ROUTE } from "../../Routes";
import { useLogout } from "../../hooks/utilityHooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useModal } from "../../hooks/useModal";

const PartnerDashboardSettings = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
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

  //adding the logout to Password and Email changes

  const { handleLogout, isLogginLoading } = useLogout();

  //Get User Information
  const { userData , refetch : refetchUserData , isUserDataLoading  } = useUserData(BASE_URL);
  const [toggle2FAState , setToggle2FAState] = useState(false)

  useEffect(()=>{
    console.log(userData?.entity?.requireOTPOnLogin)
    setToggle2FAState(userData?.entity?.requireOTPOnLogin)
  },[userData])
  //
  const {
    ModalProvider: ChangeTwoFAModal,
    openModal: openChangeTwoFAModal,
    closeModal,
  } = useModal("Invite Partner");

  useEffect(() => {
    // Fetch user's notification preferences from the server and update state
    // Make an API call to get the user's notification preferences and update notificationOptions state
    // Example:
    axios
      .get(`${BASE_URL}notification/preference`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Notification preferences:", response.data);
        const preference = response.data.data.preference;
        const preferenceData = {
          notifyLogin: preference.login,
          notifyNewTransactions: response.data.notifyNewTransactions,
          notifyFailedTransaction: preference.failedTransactions,
          notifyNewAccounts: response.data.notifyNewAccounts,
        };
        setNotificationOptions(preferenceData);
      })
      .catch((error) => {
        console.error("Error fetching notification preferences:", error);
      });
  }, []);

  const handleNotificationCheckboxChange = async (option) => {
    try {
      // Update the state optimistically
      setNotificationOptions((prevOptions) => ({
        ...prevOptions,
        [option]: !prevOptions[option],
      }));

      // Prepare the updated preferences object
      const updatedPreferences = {
        login: notificationOptions.notifyLogin,
        logout: notificationOptions.notifyLogout,
        failedTransactions: notificationOptions.notifyFailedTransaction,
      };

      // Send a PATCH request to update the notification preferences on the server
      await axios.patch(
        `${BASE_URL}notification/preference`,
        {
          preference: updatedPreferences,
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
        // logout when user changes password
        handleLogout();
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
        // logout when user changes email
        handleLogout();
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



  // Toggle 2FA mutation

  const changeTwoFAMutation = useMutation({
    mutationFn: async ({
      onSuccessFunction,
      onFailureFunction,
      ...inviteBody
    }) => {
      try {
        const res = await axios.patch(
          `${BASE_URL}auth/login/otp-req`,
          inviteBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        onSuccessFunction();
        return res;
      } catch (err) {
        onFailureFunction();
        throw err;
      }
    },
  });


  const Toggle2FA = async (e) => {
    const value = userData?.entity?.requireOTPOnLogin
    console.log(userData?.entity?.requireOTPOnLogin)
    console.log(value)
    const _id = userData?.entity?.id
    e.target.disabled = true
    changeTwoFAMutation.mutate({
      requireOtp: !value,
      entityId: _id,
      onSuccessFunction: async () => {
        console.log("success");
        await refetchUserData() ;
        e.target.disabled = false
        toast.success(!value ? "Activation of Two Factor Authentication Successful": "Deactivation of Two Factor Authentication Successful");
        
        
      },
      onFailureFunction: async () => {
        console.log("failure");
        await refetchUserData();
        e.target.disabled = false
        toast.error(!value ? "Activation of Two Factor Authentication Unsuccessful": "Deactivation of Two Factor Authentication Unsuccessful");
        
      },
     
    });
   
  };

  return (
    <>
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
                  onChange={() =>
                    handleNotificationCheckboxChange("notifyLogin")
                  }
                />
              </label>
              <label className="flex justify-between">
                Notify Failed Transaction
                <input
                  type="checkbox"
                  checked={notificationOptions.notifyFailedTransaction}
                  onChange={() =>
                    handleNotificationCheckboxChange("notifyFailedTransaction")
                  }
                />
              </label>
              <label className="flex justify-between">
                Notify New Accounts
                <input
                  type="checkbox"
                  checked={notificationOptions.notifyNewAccounts}
                  onChange={() =>
                    handleNotificationCheckboxChange("notifyNewAccounts")
                  }
                />
              </label>
            </div>
          </div>
        </div>
      )}

    {/* <>
        <ChangeTwoFAModal>
          <ChangeTwoFAForm changeTwoFAMutation={changeTwoFAMutation} toggle2FAState={toggle2FAState} setToggle2FAState={setToggle2FAState} currentTwoFA={userData?.entity?.requireOTPOnLogin} closeModal={closeModal}/>
        </ChangeTwoFAModal>
      </> */}

      <MainContent>
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
              to={`${PARTNER_DASHBOARD_ROUTE}${PREFERENCES_ROUTE}`}
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
          <div className="flex flex-col space-y-8 items-center py-7 px-8 lg:mx-0 lg:w-2/3">
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
            <div
              className="flex items-center justify-between w-full cursor-pointer"
              onClick={() => setShowNotificationsModal(true)}
            >
              <div className="flex items-center gap-4 ">
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
                    <p className="text-sm text-gray-300">
                      Integrations connected to your Accuvend account
                    </p>
                    <span className="text-[#954A00] bg-[#FFCA96] px-2 py-0.5 rounded-full text-xs text-center">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 ml-auto" />
            </div>
            
            {/* Update Password */}
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
            <div className="w-full">
              <div
                className="flex items-center justify-between w-full cursor-pointer"
                onClick={() => {
                  setShow2FA((prevState) => !prevState)
                 
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <PhoneIcon />
                    <div className="flex flex-col">
                      <p className=" font-bold">
                        2-step verification
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm ">
                          Manage your 2-step authentication methods
                        </p>
                        
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </div>
                
              </div>
              {
                show2FA && <div className="mt-6 flex ms-2 flex-col gap-2">
                <label class="relative inline-flex items-center mb-5 cursor-pointer">
                  <input onChange={(e)=>{
                      setToggle2FAState((prevState) => !prevState)
                      
                      Toggle2FA(e)
                  }} type="checkbox" checked={toggle2FAState} class="sr-only peer" />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Activate Two Factor Authentication
                  </span>
                </label>
              </div>
              }
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
      </MainContent>
    </>
  );
};


// const ChangeTwoFAForm = ({ changeTwoFAMutation, closeModal ,  }) => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const createComplain = async () => {
//     changeTwoFAMutation.mutate({
//       email,
//       companyName:name,
//       onSuccessFunction: () => {
//         console.log("success");
//         toast.success("Partner Invite Sent Successfully");
//         closeModal();
//       },
//       onFailureFunction: () => {
//         console.log("failure");
//         toast.error("Partner Invite could not be sent");
//       },
//     });
//   };

//   return (
//     <form>
//       <div className="">
//         <div className="mb-6">
//           <label
//             for="default-input"
//             className="block mb-2 text-sm font-medium text-gray-900  "
//           >
//             Partner Email
//           </label>
//           <input
//             type="text"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             for="default-input"
//             className="block mb-2 text-sm font-medium text-gray-900  "
//           >
//             Partner Name
//           </label>
//           <input
//             type="text"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           />
//         </div>

//       </div>

//       <div>
//         <button
//           type="button"
//           disabled={changeTwoFAMutation.isPending}
//           onClick={() => createComplain()}
//           class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   focus:outline-none "
//         >
//           {changeTwoFAMutation.isPending ? (
//             <>
//               <svg
//                 aria-hidden="true"
//                 role="status"
//                 class="inline w-4 h-4 me-3 text-white animate-spin"
//                 viewBox="0 0 100 101"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                   fill="#E5E7EB"
//                 />
//                 <path
//                   d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                   fill="currentColor"
//                 />
//               </svg>
//               Loading...
//             </>
//           ) : (
//             "Invite Partner"
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };
export default PartnerDashboardSettings;
