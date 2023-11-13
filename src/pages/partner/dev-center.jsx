/* eslint-disable react/no-unescaped-entities */
import { Pencil, Trash } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";

const PartnerDevCenter = () => {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="px-8 sm:px-10 md:px-12 flex-1 pb-10">
                    <div className="mt-10 space-y-2">
                        <h1 className="text-2xl font-bold">API Keys</h1>
                        <p className="pb-4">Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them.</p>
                        <p className="pb-8">Do not share your API key with others, or expose it in the browser or other client-side code. In order to protect the security of your account,
                            Accuvend may also automatically disable any API key that we've found has leaked publicly.</p>

                        {/* Table */}
                        <table className="min-w-full overflow-hidden">
                            <thead className="font-bold uppercase">
                                <tr>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">Key</th>
                                    <th className="py-2 px-4 text-left">Created</th>
                                    <th className="py-2 px-4 text-left">Last Used</th>
                                    <th className="py-2 px-4 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4">Test</td>
                                    <td className="py-2 px-4">sk***********842</td>
                                    <td className="py-2 px-4">8 Nov 2023</td>
                                    <td className="py-2 px-4">23 Nov 2023</td>
                                    <td className="py-2 px-4 flex gap-2 items-center">
                                        <Pencil className="cursor-pointer h-4 w-4" />
                                        <Trash className="cursor-pointer h-4 w-4" />
                                    </td>
                                </tr>
                                {/* Add more rows if needed */}
                            </tbody>
                        </table>

                        {/* Button to generate a new key */}
                        <button className="mt-4 bg-primary text-white py-2 px-4 rounded-md">
                            + Create a new secret key
                        </button>

                        <h1 className="text-2xl font-bold pt-4">Default Organization</h1>
                        <p>If you belong to multiple organizations, this setting controls which organization is used by default when making requests with the API keys above.</p>
                        <div className="mt-4">
                            <select
                                className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                <option value="organization1">Zenith Bank</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PartnerDevCenter;
