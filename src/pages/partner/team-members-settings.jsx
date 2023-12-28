import { DownloadCloud } from "lucide-react";

import ZenithImage from "../../images/zenith.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import MainContent from "../../components/MainContent";
import { Trash } from "lucide-react";
import { useModal } from "../../hooks/useModal";

const initialFormData = {
  name: "",
  email: "",
  roleId: "",
};
import { PARTNER_DASHBOARD_ROUTE, PREFERENCES_ROUTE } from "../../Routes";
const PartnerTeamSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [roles, setRoles] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [deleteEmail, setDeleteEmail] = useState(null);
  const [deleteTeamMeberIsLoading, setDeleteTeamMeberIsLoading] =
    useState(false);
  const {
    ModalProvider: RemoveMemberModal,
    openModal: openMemberModal,
    closeModal: closeMemeberModal,
  } = useModal(
    "Remove Team Member Confirmation",
    () => null,
    () => {
      setDeleteEmail(null);
    }
  );

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}role/`);

      console.log("Response:", response);
      if (response.status === 200) {
        console.log("Roles:", response.data.data);
        // toast.success("Roles fetched successfully");
        setRoles(response.data.data.roles);
      } else {
        toast.error("Failed to fetch roles");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInviteMember = async () => {
    console.log("Sending invitation:", formData);
    const uploadFormData = {...formData}
    if (!uploadFormData?.roleId || !uploadFormData?.roleId === "" ){
       uploadFormData.roleId = roles?.filter(item => item?.name === "GUEST")[0]?.id  ? roles?.filter(item => item?.name === "GUEST")[0]?.id : ""
    }

    console.log("Sending invitation:", uploadFormData);

    // return 

    try {
      const response = await axios.post(
        `${BASE_URL}team/member/new`,
        uploadFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Invitation response:", response);
      toast.success("Invitation sent successfully");
      
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast.error("Failed to send invitation");
    } finally {
      setFormData(initialFormData);
      setShowModal(false);
    }
  };

  const removeInvitedMember = async (email) => {
    setDeleteTeamMeberIsLoading(true);

    try {
      const response = await axios.delete(
        `${BASE_URL}team/member/?email=${email}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      //   console.log("Invitation response:", response);
      toast.success("Team Member Removed Successfully ");
    } catch (error) {
      //   console.error("Error sending invitation:", error);
      toast.error("Team Member Couldn't be Removed");
    } finally {
      closeMemeberModal();
      setDeleteTeamMeberIsLoading(false);
    }
    setDeleteTeamMeberIsLoading(false);
  };

  const handleInviteButtonClick = () => {
    fetchRoles();
    setShowModal(true);
  };

  const handleInviteGuestButtonClick = () => {
    fetchRoles();
    setShowGuestModal(true);
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}team/member`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Team Members Response:", response);
      if (response.status === 200) {
        setTeamMembers(response.data.data.teamMembers);
      } else {
        toast.error("Failed to fetch team members");
      }
    } catch (error) {
      toast.error("Failed to fetch team members");
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching team members...");
    fetchTeamMembers();
  }, []);

  return (
    <>
      <MainContent>
        {/* Modal for inviting new member */}

        <>
          <RemoveMemberModal>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-11 h-11 d"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-base font-bold text-gray-900 ">
                Are you sure you want to remove this team member? This action is
                irreversible, and once removed, the team member data will be
                permanently deleted. Please confirm your decision."
              </h3>
              <button
                onClick={() => {
                    removeInvitedMember(deleteEmail)
                }}
                disabled={deleteTeamMeberIsLoading}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              >
                {!deleteTeamMeberIsLoading ? (
                  "Yes, I'm sure"
                ) : (
                  <>
                    <svg
                      aria-hidden="true"
                      class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  </>
                )}
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => {
                  closeMemeberModal();
                  setDeleteEmail(null);
                }}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  "
              >
                No, cancel
              </button>
            </div>
          </RemoveMemberModal>
        </>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 w-[35%]">
                <h1 className="text-lg font-bold mb-4">Invite New Member</h1>
                <div className="mb-4">
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border rounded-md w-full px-4 py-2 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border rounded-md w-full px-4 py-2 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Role</label>
                  <select
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleInputChange}
                    className="border rounded-md w-full px-4 py-2 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleInviteMember}
                    className="bg-secondary text-white px-4 py-2 rounded-md mr-2"
                  >
                    Invite
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="border border-gray-300 px-4 py-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showGuestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 w-[35%]">
                <h1 className="text-lg font-bold mb-4">Invite New Member</h1>
                <div className="mb-4">
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border rounded-md w-full px-4 py-2 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border rounded-md w-full px-4 py-2 focus:outline-none"
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="block mb-1">Role</label>
                  <select
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleInputChange}
                    className="border rounded-md w-full px-4 py-2 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="flex justify-end">
                  <button
                    onClick={handleInviteMember}
                    className="bg-secondary text-white px-4 py-2 rounded-md mr-2"
                  >
                    Invite
                  </button>
                  <button
                    onClick={() => setShowGuestModal(false)}
                    className="border border-gray-300 px-4 py-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 space-y-2">
          <h1 className="text-2xl font-bold">Profile</h1>
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
              className="px-2 py-1 border-y border-gray-300 text-body1"
            >
              Preferences
            </Link>
            <Link
              to="/partner-dashboard/team-settings"
              className="px-2 py-1 border rounded-r-md bg-gray-200 border-gray-300 text-primary font-semibold "
            >
              Team members
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col px-8 border border-gray-200 rounded-md pb-40">
          {/* Container div */}
          <div className="flex flex-col space-y-8 pt-4 pb-14">
            <div className="grid grid-cols-3 gap-4">
              {/* left side */}
              <div className="flex flex-col col-span-1 gap-2">
                <h1 className="font-bold">Team Members</h1>
                <p>
                  Invite your colleagues to work faster and collaborate
                  together.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleInviteButtonClick()}
                    className="flex items-center gap-2 bg-secondary border border-secondary text-white w-fit px-3 py-1 rounded-md font-semibold"
                  >
                    Invite new member
                  </button>
                </div>
              </div>

              {/* right side */}
              <div className="flex justify-start col-span-2">
                <div className="rounded-lg border border-gray-200 overflow-hidden w-full">
                  <table className="table-auto w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Date Added</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Remove Member</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="border-b">
                          <td className="px-4 py-2">
                            <div className="flex items-center">
                              <img
                                src={member.profilePicture ?? ZenithImage}
                                alt="User 1"
                                className="w-10 h-10 rounded-full mr-2"
                              />
                              <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-gray-500">
                                  {member.entity.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            {
                              new Date(member.createdAt)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => console.log("Tell")}
                              className="text-primary bg-blue-100 rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default"
                            >
                              {member.entity.role.name
                                .toLowerCase()
                                .charAt(0)
                                .toUpperCase() +
                                member.entity.role.name.slice(1).toLowerCase()}
                            </button>
                          </td>
                          {/* Add actions like deleting team member */}

                          <td className="px-4 py-2">
                            <button
                              onClick={() => {
                                setDeleteEmail(member.entity.email);
                                openMemberModal();
                                console.log();
                              }}
                              className="flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600  "
                              type="button"
                            >
                              <Trash className="h-4 w-4 " />
                              {/* <span>Remove member</span> */}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="flex flex-col space-y-8 pt-4 pb-14">
            <div className="grid grid-cols-3 gap-4">
              {/* left side */}
              <div className="flex flex-col col-span-1 gap-2">
                <h1 className="font-bold">Guests</h1>
                <p>
                  Guests can only view, they cannot take any actions on your
                  account.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleInviteGuestButtonClick()}
                    className="flex items-center gap-2 bg-secondary border border-secondary text-white w-fit px-3 py-1 rounded-md font-semibold"
                  >
                    Invite new guest
                  </button>
                </div>
              </div>

              {/* right side */}
              <div className="flex justify-start col-span-2">
                <div className="rounded-lg border border-gray-200 overflow-hidden w-full">
                  <table className="table-auto w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Date Added</th>
                        <th className="px-4 py-2 text-left">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Dummy Data */}
                      {/* <tr className="border-b">
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={ZenithImage}
                                                                alt="User 1"
                                                                className="w-10 h-10 rounded-full mr-2"
                                                            />
                                                            <div>
                                                                <p className="font-semibold">John Doe</p>
                                                                <p className="text-gray-500">
                                                                    john.doe@example.com
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">2023-01-01</td>
                                                    <td className="px-4 py-2">
                                                        <button className="text-[#8D8484] bg-[#FBF1F1] rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">
                                                            Guest
                                                        </button>
                                                    </td>
                                                    {/* <td className="px-4 py-2"><Trash className="h-5 w-5" /></td> */}
                      {/* </tr> */}
                      {/* <tr className="border-b"> 
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={ZenithImage}
                                                                alt="User 2"
                                                                className="w-10 h-10 rounded-full mr-2"
                                                            />
                                                            <div>
                                                                <p className="font-semibold">Jane Smith</p>
                                                                <p className="text-gray-500">
                                                                    jane.smith@example.com
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">2023-02-01</td>
                                                    <td className="px-4 py-2">
                                                        <button className="text-[#8D8484] bg-[#FBF1F1] rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">
                                                            Guest
                                                        </button>
                                                    </td>*/}
                      {/* <td className="px-4 py-2"><Trash className="h-5 w-5" /></td> */}
                      {/* </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContent>
    </>
  );
};

export default PartnerTeamSettings;
