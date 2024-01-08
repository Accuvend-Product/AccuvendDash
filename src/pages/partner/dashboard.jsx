/* eslint-disable No.unused-vars */

import { TransactionTable as PartnerTransactionTable } from "../../components/table/table";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTransactionData } from "../../contexts/transaction-context";
import MainContent from "../../components/MainContent";
import { queryClient } from "../../App";
import { useGetTransactions } from "../../api/Transaction";

const PartnerDashboard = () => {
  const {
    pagination,
    filters,
    setFilters,
    isLoading,
    tableData,
    setPagination,
  } = useGetTransactions();


  
  const { isLoading: totalTransactionsLoading, data: totalTransactionData } =
    useQuery({
      queryKey: ["transactions", "total", `${new URLSearchParams(filters).toString()}`],
      queryFn: async () => {
        const response = await axios.get(`${BASE_URL}transaction/kpi?${new URLSearchParams(filters).toString()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const totalAmount =
          response?.data?.data?.totalTransactionAmount[0]?.total_amount;
        const totalTransactions = response?.data?.data?.totalTransactionCount;
        return { totalTransactions, totalAmount };
      },
    });

  const {
    isLoading: totalFailedTransactionsLoading,
    data: totalFailedTransactionData,
  } = useQuery({
    queryKey: ["transactions", "total", "failed",`${new URLSearchParams({...filters , status:"failed"}).toString()}`],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}transaction/kpi/?${new URLSearchParams({...filters , status:"failed"}).toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const totalAmount =
        response?.data?.data?.totalTransactionAmount[0]?.total_amount;
      const totalTransactions = response?.data?.data?.totalTransactionCount;
      return { totalTransactions, totalAmount };
    },
  });

  return (
    <>
      <MainContent>
        <div className=" ml-auto py-10">
          {/* cards */}
          <div className="lg:w-5/6 grid grid-cols-3 gap-x-7 lg:ml-auto">
            <div className="hover:bg-primary hover:text-white px-4 py-3 bg-gray-100 text-primary rounded-lg hover:cursor-pointer">
              <p className="font-bold text-center text-lg">
                Total No. Transacted{" "}
              </p>
              <div className="text-[1.65rem] font-semibold hover:text-white">
                {totalTransactionsLoading ? (
                  <div className="flex items-center gap-2">
                    <div role="">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                    </div>
                    <p className="">Loading...</p>
                  </div>
                ) : (
                  <p className="text-center">
                    {parseInt(
                      totalTransactionData?.totalTransactions
                    )?.toLocaleString() || 0}
                  </p>
                )}
              </div>
            </div>

            <div className="hover:bg-primary hover:text-white px-4 py-3 bg-gray-100 text-primary rounded-lg hover:cursor-pointer">
              <p className="font-bold text-center text-lg">
                Failed Transactions{" "}
              </p>
              <div className="text-[1.65rem] font-semibold hover:text-white">
                {totalFailedTransactionsLoading ? (
                  <div className="flex items-center gap-2">
                    <div role="">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                    </div>
                    <p className="hover:text-white">Loading...</p>
                  </div>
                ) : (
                  <p className="text-center">
                    {parseInt(
                      totalFailedTransactionData?.totalTransactions
                    )?.toLocaleString() || 0}
                  </p>
                )}
              </div>
            </div>

            <div className="hover:bg-primary hover:text-white px-4 py-3 bg-gray-100 text-primary rounded-lg hover:cursor-pointer">
              <p className="font-bold text-center text-lg">
                Total Amount Transacted{" "}
              </p>
              <div className="text-[1.65rem] font-semibold">
                {" "}
                {totalTransactionsLoading ? (
                  <div className="inline-flex items-center">
                    <div className="flex items-center gap-2">
                      <div role="">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                      </div>
                      <p className="text-primary hover:text-white">
                        Loading...
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center">
                    ₦ {parseInt(
                      totalTransactionData?.totalAmount
                    )?.toLocaleString() !== "NaN"  ? parseInt(
                      totalTransactionData?.totalAmount
                    )?.toLocaleString() : 0 }
                    
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="h-1/2 w-full flex items-center justify-center">
            <div role="">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            </div>
          </div>
        ) : (
          tableData && (
            <>
              {/* Render your cards here */}
              <PartnerTransactionTable
                filter={filters}
                setFilter={setFilters}
                tableData={tableData}
                isPartnerTable={true}
              />
            </>
          )
        )}
      </MainContent>
    </>
  );
};

export default PartnerDashboard;
