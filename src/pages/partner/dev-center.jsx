/* eslint-disable react/no-unescaped-entities */

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
      const response = await axios.get(`${BASE_URL}key/active`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.status === "success") {
        setApiKeyData(response.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching API keys:", error);
      toast.error("Error fetching API keys:", error);
    }
  };

  const createNewKey = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}key/new`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.status === "success") {
        fetchApiKeys();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating new API key:", error);
    }
  };

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  useEffect(() => {
    fetchApiKeys(); // Fetch API keys on component mount
  }, []);
  return (
    <>
      <MainContent>
        {isLoading ? ( // Display loading screen when isLoading is true
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="mt-10">
            <h1 className="text-2xl font-bold">API Keys</h1>
            <p className="pb-4">
              Your secret API keys are listed below. Please note that we do not
              display your secret API keys again after you generate them.
            </p>
            <p className="px-4 py-4 mt-5 mb-10 rounded-lg bg-red-100 text-red-500 ">
              Do not share your API key with others, or expose it in the browser
              or other client-side code. In order to protect the security of
              your account, Accuvend may also automatically disable any API key
              that we've found has leaked publicly.
            </p>

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
                    <span>
                      {apiKeyData?.apiKey?.slice(0, 4)}*****
                      {apiKeyData?.apiKey?.slice(-4)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(apiKeyData?.apiKey)}
                      className="ml-2 focus:outline-none"
                    >
                      <ClipboardCopy className="w-4 h-4" />
                    </button>
                  </td>

                  <td className="py-2 px-4">
                    <span>
                      {apiKeyData?.secretKey?.slice(0, 4)}*****
                      {apiKeyData?.secretKey?.slice(-4)}
                    </span>
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
            <button
              className="mt-7 bg-primary text-white py-2 px-4 rounded-md"
              onClick={createNewKey}
            >
              + Request a new secret key
            </button>

            {/* Developer Guide  */}
            <div
              id="alert-additional-content-3"
              className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 mt-8"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium ">
                    Developer API Documentation
                </h3>
              </div>
              <div className="mt-2 mb-4 text-sm ">
                Discover the nuts and bolts of our API functionality – from endpoints to usage guidelines. Dive into our detailed <a className="font-medium text-blue-600  underline" target="_blank" href="http://docs.accuvend.ng">API Documentation</a> to seamlessly integrate and make the most of our services.
              </div>
            </div>
            {/* SOP */}
            <div
              id="alert-additional-content-3"
              className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50  mt-8"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium ">
                  Navigate Our Standard Operating Procedures (SOP)
                </h3>
              </div>
              <div className="mt-2 mb-4 text-sm ">
                Understand the intricacies of our operational guidelines. Delve into our comprehensive <a className="font-medium text-blue-600  underline" target="_blank" href="http://sop.accuvend.ng"> SOP - Standard Operating Procedure </a> to ensure smooth and standardized processes across your interactions with our services.
              </div>
            </div>

          {/* SLA */}
            <div
              id="alert-additional-content-3"
              className="p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50  mt-8"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium ">
                Explore Our Service Level Agreement (SLA) Commitments
                </h3>
              </div>
              <div className="mt-2 mb-4 text-sm ">
              Uncover the commitments and expectations outlined in our SLA. Refer to our detailed <a className="font-medium text-blue-600  underline" target="_blank" href="http://sla.accuvend.ng"> Service Level Agreement  </a> to gain insights into the quality and timeliness of the services we pledge to provide.
              </div>
            </div>

          </div>
        )}
      </MainContent>
    </>
  );
};

export default PartnerDevCenter;
