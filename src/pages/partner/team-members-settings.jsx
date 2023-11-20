import { DownloadCloud } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";
import ZenithImage from "../../images/zenith.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialFormData = {
  name: "",
  email: "",
  roleId: "",
};

const PartnerTeamSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [roles, setRoles] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

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

    try {
      const response = await axios.post(
        `${BASE_URL}team/member/new`,
        formData,
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

  const handleInviteButtonClick = () => {
    fetchRoles();
    setShowModal(true);
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}team/member`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      console.log("Team Members Response:", response);
      if (response.status === 200) {
        setTeamMembers(response.data.data.teamMembers);
      } else {
        toast.error("Failed to fetch team members");
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

    useEffect(() => {
        console.log("Fetching team members...");
      fetchTeamMembers();
    }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-[372px] px-8 sm:px-10 md:px-12 border-b border-body1 flex-1 pb-10">
          {/* Modal for inviting new member */}
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
                to="/partner-dashboard/preferences"
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
                    <button className="flex items-center gap-2 border text-gray-600 border-gray-400 hover:border-transparent hover:text-white hover:bg-gray-400 w-fit px-2 py-1 rounded-md font-semibold">
                      <DownloadCloud className="h-4 w-4" />
                      Export CSV
                    </button>
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
                          <th
                            className="px-4 py-2 text-left"
                            style={{ width: "80px" }}
                          ></th>
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
                              <button className="text-primary bg-blue-100 rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">
                                {member.entity.role.name}
                              </button>
                            </td>
                            {/* Add actions like deleting team member */}
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
                    <button className="flex items-center gap-2 border text-gray-600 border-gray-400 hover:border-transparent hover:text-white hover:bg-gray-400 w-fit px-2 py-1 rounded-md font-semibold">
                      <DownloadCloud className="h-4 w-4" />
                      Export CSV
                    </button>
                    <button className="flex items-center gap-2 bg-secondary border border-secondary text-white w-fit px-3 py-1 rounded-md font-semibold">
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
                          <th className="px-4 py-2 text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Dummy Data */}
                        <tr className="border-b">
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
                        </tr>
                        <tr className="border-b">
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
                          </td>
                          {/* <td className="px-4 py-2"><Trash className="h-5 w-5" /></td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerTeamSettings;
