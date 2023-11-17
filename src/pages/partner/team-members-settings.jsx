import { DownloadCloud, Trash } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";
import ZenithImage from "../../images/zenith.png"
import { Link } from 'react-router-dom';
import { useState } from "react";
import { toast } from "react-hot-toast";

const initialFormData = {
    name: '',
    email: '',
    role: 'Admin',
};


const PartnerTeamSettings = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleInviteMember = () => {
        // Logic to send invitation request to the backend using formData
        console.log('Sending invitation:', formData);
        toast.success('Invitation sent successfully');
        // Here you can make an API request to invite the new member
        // Reset the form data after sending the request
        setFormData(initialFormData);
        // Close the modal after sending the request
        // setShowModal(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className=" px-8 sm:px-10 md:px-12 border-b border-body1 flex-1 pb-10">
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
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="border rounded-md w-full px-4 py-2 focus:outline-none"
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Guest">Guest</option>
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
                        <p className="text-body1">Take a look at your policies and the new policy to see what is covered</p>
                        <div className="flex ">
                            <Link to="/partner-dashboard/profile" className="px-2 py-1 border border-gray-300 text-body1 rounded-l-md">Profile</Link>
                            <Link to="/partner-dashboard/preferences" className="px-2 py-1 border-y border-gray-300 text-body1">Preferences</Link>
                            <Link to="/partner-dashboard/team-settings" className="px-2 py-1 border rounded-r-md bg-gray-200 border-gray-300 text-primary font-semibold ">Team members</Link>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col px-8 border border-gray-200 rounded-md pb-40">
                        {/* Container div */}
                        <div className="flex flex-col space-y-8 pt-4 pb-14">
                            <div className="grid grid-cols-3 gap-4">
                                {/* left side */}
                                <div className="flex flex-col col-span-1 gap-2">
                                    <h1 className="font-bold">Team Members</h1>
                                    <p>Invite your colleagues to work faster and collaborate together.</p>
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-2 border text-gray-600 border-gray-400 hover:border-transparent hover:text-white hover:bg-gray-400 w-fit px-2 py-1 rounded-md font-semibold">
                                            <DownloadCloud className="h-4 w-4" />
                                            Export CSV
                                        </button>
                                        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-secondary border border-secondary text-white w-fit px-3 py-1 rounded-md font-semibold">
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
                                                    <th className="px-4 py-2 text-left" style={{ width: "80px" }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Dummy Data */}
                                                <tr className="border-b">
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center">
                                                            <img src={ZenithImage} alt="User 1" className="w-10 h-10 rounded-full mr-2" />
                                                            <div>
                                                                <p className="font-semibold">John Doe</p>
                                                                <p className="text-gray-500">john.doe@example.com</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">2023-01-01</td>
                                                    <td className="px-4 py-2">
                                                        <button className="text-secondary bg-green-100 rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">Developer</button>
                                                    </td>
                                                    <td className="px-4 py-2"><Trash className="h-5 w-5" /></td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center">
                                                            <img src={ZenithImage} alt="User 2" className="w-10 h-10 rounded-full mr-2" />
                                                            <div>
                                                                <p className="font-semibold">Jane Smith</p>
                                                                <p className="text-gray-500">jane.smith@example.com</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">2023-02-01</td>
                                                    <td className="px-4 py-2">
                                                        <button className="text-primary bg-blue-100 rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">Admin</button>
                                                    </td>
                                                    <td className="px-4 py-2"><Trash className="h-5 w-5" /></td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center">
                                                            <img src={ZenithImage} alt="User 3" className="w-10 h-10 rounded-full mr-2" />
                                                            <div>
                                                                <p className="font-semibold">Samuel Johnson</p>
                                                                <p className="text-gray-500">samuel.johnson@example.com</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">2023-03-01</td>
                                                    <td className="px-4 py-2">
                                                        <button className="text-primary bg-blue-100 rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">Admin</button>
                                                    </td>
                                                    <td className="px-4 py-2"><Trash className="h-5 w-5" /></td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center">
                                                            <img src={ZenithImage} alt="User 4" className="w-10 h-10 rounded-full mr-2" />
                                                            <div>
                                                                <p className="font-semibold">Emily Brown</p>
                                                                <p className="text-gray-500">emily.brown@example.com</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">2023-04-01</td>
                                                    <td className="px-4 py-2">
                                                        <button className="text-secondary bg-green-100 rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">Developer</button>
                                                    </td>
                                                    <td className="px-4 py-2"><Trash className="h-5 w-5" /></td>
                                                </tr>
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
                                    <p>Guests can only view, they cannot take any actions on your account.</p>
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
                                                            <img src={ZenithImage} alt="User 1" className="w-10 h-10 rounded-full mr-2" />
                                                            <div>
                                                                <p className="font-semibold">John Doe</p>
                                                                <p className="text-gray-500">john.doe@example.com</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">2023-01-01</td>
                                                    <td className="px-4 py-2">
                                                        <button className="text-[#8D8484] bg-[#FBF1F1] rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">Guest</button>
                                                    </td>
                                                    <td className="px-4 py-2"><Trash className="h-5 w-5" /></td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center">
                                                            <img src={ZenithImage} alt="User 2" className="w-10 h-10 rounded-full mr-2" />
                                                            <div>
                                                                <p className="font-semibold">Jane Smith</p>
                                                                <p className="text-gray-500">jane.smith@example.com</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">2023-02-01</td>
                                                    <td className="px-4 py-2">
                                                        <button className="text-[#8D8484] bg-[#FBF1F1] rounded-full px-3 py-1.5 text-center font-semibold w-full hover:cursor-default">Guest</button>
                                                    </td>
                                                    <td className="px-4 py-2"><Trash className="h-5 w-5" /></td>
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
}

export default PartnerTeamSettings


