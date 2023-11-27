/* eslint-disable react/no-unescaped-entities */
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";
import axios from "axios";
import { ClipboardCopy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MainContent from "../../components/MainContent";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PartnerDevCenter = () => {
    const [apiKeyData, setApiKeyData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchApiKeys = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}key/active`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (response.data.status === 'success') {
                setApiKeyData(response.data.data);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching API keys:', error);
            toast.error('Error fetching API keys:', error);
        }
    };

    const createNewKey = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}key/new`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (response.data.status === 'success') {
                fetchApiKeys();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating new API key:', error);
        }
    };

    const copyToClipboard = async (content) => {
        try {
            await navigator.clipboard.writeText(content);
            toast.success('Copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy:', error);
            toast.error('Failed to copy to clipboard');
        }
    };

    useEffect(() => {
        fetchApiKeys(); // Fetch API keys on component mount
    }, []);
    return (
        <>
            <Navbar />
            <div className="flex">
            <MainContent>
                    {isLoading ? ( // Display loading screen when isLoading is true
                        <div className="h-screen flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (<div className="mt-10 space-y-2">
                        <h1 className="text-2xl font-bold">API Keys</h1>
                        <p className="pb-4">Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them.</p>
                        <p className="px-4 py-4 rounded-lg bg-red-100 text-red-500 ">Do not share your API key with others, or expose it in the browser or other client-side code. In order to protect the security of your account,
                            Accuvend may also automatically disable any API key that we've found has leaked publicly.</p>

                        {/* Table */}
                        <table className="min-w-full overflow-hidden">
                            <thead className="font-bold uppercase">
                                <tr>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">API Key</th>
                                    <th className="py-2 px-4 text-left">Secret Key</th>
                                    <th className="py-2 px-4 text-left">Created</th>
                                    <th className="py-2 px-4 text-left">Last Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4">Test</td>
                                    
                                    <td className="py-2 px-4">
                                        <span>{apiKeyData?.apiKey?.slice(0, 4)}*****{apiKeyData?.apiKey?.slice(-4)}</span>
                                        <button
                                            onClick={() => copyToClipboard(apiKeyData?.apiKey)}
                                            className="ml-2 focus:outline-none"
                                        >
                                            <ClipboardCopy className="w-4 h-4" />
                                        </button>
                                    </td>

                                    <td className="py-2 px-4">
                                        <span>{apiKeyData?.secretKey?.slice(0, 4)}*****{apiKeyData?.secretKey?.slice(-4)}</span>
                                        <button
                                            onClick={() => copyToClipboard(apiKeyData?.secretKey)}
                                            className="ml-2 focus:outline-none"
                                        >
                                            <ClipboardCopy className="w-4 h-4" />
                                        </button>
                                    </td>

                                    <td className="py-2 px-4">8 Nov 2023</td>
                                    <td className="py-2 px-4">23 Nov 2023</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Button to generate a new key */}
                        <button className="mt-4 bg-primary text-white py-2 px-4 rounded-md" onClick={createNewKey}>
                            + Create a new secret key
                        </button>
                    </div>)
                    }
               </MainContent>
            </div>
        </>
    );
}

export default PartnerDevCenter;
