import { ArrowLeft, Copy } from "lucide-react";
import GreenCheck from "../../components/icons/green-check";
import RedCheck from "../../components/icons/red-check";
import PropTypes from "prop-types";

import DetailsCard from "../../components/details-card";
import OrderConfirmation from "../../components/order-confirmation-old";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/ui/loading";
import MainContent from "../../components/MainContent";
import { useQuery } from "@tanstack/react-query";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Logo from "../../images/logo.png";

const CustomerTransactionDetails = ({ sidebarType = "" }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    data: transactionDetails,
    isError,
  } = useQuery({
    queryKey: [`transaction-${id}`],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}transaction/info?transactionId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res?.data?.data?.transaction;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // can get the data and columns from some constant file
  return (
    <>
      {/* <div className="flex items-center mt-9">
            <ArrowLeft className="mr-2 mt-1 w-7 h-7 hover:cursor-pointer text-blue-800" onClick={() => navigate(-1)}/>
            <h1 className="font-bold text-lg">Transaction Details</h1>
        </div> */}
      {/* <h1 className="text-body1 text-xl my-2">{transactionDetails.id}</h1> */}

      {/* both cards */}
      <div className="flex mt-5 flex-col w-full items-center justify-center  gap-16 px-8">
        <div className="flex items-center justify-center">
          <img src={Logo} className=" h-4 aspect-auto" />
        </div>
        <div className="flex flex-col">
          <div className="">
            <div className="flex  justify-between py-3  gap-2">
              <p className="font-bold text-sm">Customer Name</p>
              <p className="text-gray-500 text-sm">
                {transactionDetails?.user.name}
              </p>
            </div>
            <hr />

            <div className="flex  justify-between py-3  gap-2">
              <p className="font-bold text-sm">Address</p>
              <p className="text-gray-500 text-sm">
                {transactionDetails?.user.address}
              </p>
            </div>
            <hr />

            <div className="flex  justify-between py-3  gap-2">
              <p className="font-bold text-sm">Meter number</p>
              <p className="text-gray-500 text-sm">
                {transactionDetails?.meter?.meterNumber}
              </p>
            </div>
            <hr />

            <div className="flex  justify-between py-3  gap-2">
              <p className="font-bold text-sm">Token</p>
              <p className="text-gray-500 hover:text-blue-600 active:text-blue-600 text-sm flex gap-x-3 items-center">
                <span>{transactionDetails?.powerUnit?.token || "XXXX" }</span>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(transactionDetails?.powerUnit?.token || "XXXX");
                      toast.success("Copied to clipboard!");
                    } catch (error) {
                      console.error("Failed to copy:", error);
                      toast.error("Failed to copy to clipboard");
                    }
                  }}
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </p>
            </div>
          </div>

          {/* Order Confirmation Events */}
          <div>
            <div className="flex flex-col space-y-4 pt-8 pb-4">
              <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                <div className="mt-2">
                  <GreenCheck />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Validate Meter</h1>
                  <p className="text-sm">
                    Meter Number - {transactionDetails?.meter.meterNumber}
                  </p>
                  <p className="text-sm">
                    Name - {transactionDetails?.user.name}
                  </p>
                  <p className="text-sm">
                    Address - {transactionDetails?.user.address}
                  </p>
                </div>
              </div>
              <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                <div className="mt-2">
                  <GreenCheck />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Check if Disco is up</h1>
                  <p className="text-sm">{transactionDetails?.disco}</p>
                </div>
              </div>
              <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                <div className="mt-2">
                  {transactionDetails?.amount !== "0" ? (
                    <GreenCheck />
                  ) : (
                    <RedCheck />
                  )}
                </div>
                <div>
                  <h1 className="font-bold text-lg">Confirm Payment</h1>
                  <p className="text-sm">
                    Amount - N{transactionDetails?.amount}
                  </p>
                </div>
              </div>
              <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                <div className="mt-2">
                  {transactionDetails?.powerUnit !== null ? (
                    <GreenCheck />
                  ) : (
                    <RedCheck />
                  )}
                </div>
                <div>
                  <h1 className="font-bold text-lg">Generate Token</h1>
                  {transactionDetails?.powerUnit?.token ? (
                    <p className="text-sm">Token generated successfully</p>
                  ) : (
                    <p className="text-sm">Token not generated</p>
                  )}
                </div>
              </div>
              <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                <div className="mt-2">
                  {transactionDetails?.powerUnit !== null ? (
                    <GreenCheck />
                  ) : (
                    <RedCheck />
                  )}
                </div>
                <div>
                  <h1 className="font-bold text-lg">Send Token</h1>
                  <p className="text-sm">
                    {transactionDetails?.powerUnit !== null
                      ? transactionDetails?.powerUnit.token
                      : "Token not generated"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10"></div>
    </>
  );
};

export default CustomerTransactionDetails;
