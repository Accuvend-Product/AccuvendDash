// // Tanstack API Request Error react.development.js:1618 Uncaught TypeError: Cannot read properties of null (reading 'useContext')
// import { useQuery } from "@tanstack/react-query";
// import React from "react";

// export const useGetTransactions = () => useQuery({
//     queryKey: ["transactions"],
//     queryFn: async () => {
//         const response = await axios.get(`${BASE_URL}transaction`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });

//         const transformedData = response.data.data.transactions.map(
//             (transaction) => ({
//                 image: transaction.powerUnit?.discoLogo ? transaction.powerUnit?.discoLogo : "https://res.cloudinary.com/richiepersonaldev/image/upload/v1699947957/dpijlhj08ard76zao2uk.jpg",
//                 disco: transaction.disco ?? "TEST",
//                 "meter number": transaction.meter.meterNumber,
//                 "customer name": transaction.user.name,
//                 "transaction reference": {id: transaction.id, bankRefId: transaction.bankRefId},
//                 "transaction date": transaction.transactionTimestamp,
//                 amount: `₦${transaction.amount}`,
//                 status: transaction.status.toLowerCase(),
//                 selection: transaction.partnerId ?? "TESTID",
//             })
//         );

//         // setTableData(transformedData);
//         // setPartnerTableData(transformedData);
//         return transformedData;
//     },
// });

// export const useGetYesterdayTransaction = useQuery({
//     queryKey: ["transactions", "total"],
//     queryFn: async () => {
//         const response = await axios.get(`${BASE_URL}transaction/yesterday`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });

//         const totalTransactionCount = response.data.data.transactions.length;
//         const allTotalTransactionCount = response.data.data.totalAmount;

//         // setTotalTransactions(totalTransactionCount);
//         // setTotalAmount(allTotalTransactionCount);

//         return {
//             totalTransactionCount ,
//             allTotalTransactionCount
//         };
//     },
// });

// export const useGetYesterdayFailedTransaction = useQuery({
//     queryKey: ["transactions", "failed"],
//     queryFn: async () => {
//         const response = await axios.get(
//             `${BASE_URL}transaction/yesterday?status=failed`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             }
//         );

//         const failedTransactionCount = response.data.data.transactions.length;
//         // setFailedTransactions(failedTransactionCount);

//         return failedTransactionCount;
//     },
//     staleTime: 1000 * 60 * 60,
// });

import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isObjectEmpty } from "../lib/utils";
export const useGetTransactions = (query = {} , url) => {
  const [pagination, setPagination] = useState({
    // page: 1,
    // limit: 8,
  });
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isError, setIsError] = useState(false);

  const getTransactions = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(
        `${BASE_URL}${url ? url : 'transaction?'}${new URLSearchParams(query).toString()}${
          isObjectEmpty(query) ? "" : "&"
        }${new URLSearchParams(pagination).toString()}${
          isObjectEmpty(pagination) ? "" : "&"
        }${new URLSearchParams(filters).toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const transformedData = response.data.data.transactions.map(
        (transaction) => ({
          image: transaction.powerUnit?.discoLogo
            ? transaction.powerUnit?.discoLogo
            : "https://res.cloudinary.com/richiepersonaldev/image/upload/v1699947957/dpijlhj08ard76zao2uk.jpg",
          disco: transaction.disco ?? "TEST",
          "meter number": transaction.meter.meterNumber,
          "customer name": transaction.user.name,
          "transaction reference": transaction.id,
          "bank reference": transaction.bankRefId,
          "transaction date": transaction.transactionTimestamp,
          amount: `₦${transaction.amount}`,
          status: transaction.status.toLowerCase(),
          selection: transaction.partnerId ?? "TESTID",
          events : transaction.events,
        })
      );
      setTableData(transformedData);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }

    setIsLoading(false);
    // return transformedData;
  };

  useEffect(() => {
    getTransactions();
  }, [filters, pagination]);

  // Removed React Query Because filters are not updating
  // const { isLoading , data : tableData  } = useQuery({
  //     queryKey: [`transactions`,filters, pagination],
  //     queryFn: async () => {
  //         const response = await axios.get(`${BASE_URL}transaction?${new URLSearchParams(pagination).toString()}&${ new URLSearchParams(filters).toString()}`, {
  //             headers: {
  //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //         });

  //         const transformedData = response.data.data.transactions.map(
  //             (transaction) => ({
  //                 image: transaction.powerUnit?.discoLogo ? transaction.powerUnit?.discoLogo : "https://res.cloudinary.com/richiepersonaldev/image/upload/v1699947957/dpijlhj08ard76zao2uk.jpg",
  //                 disco: transaction.disco ?? "TEST",
  //                 "meter number": transaction.meter.meterNumber,
  //                 "customer name": transaction.user.name,
  //                 "transaction reference": {id: transaction.id, bankRefId: transaction.bankRefId},
  //                 "transaction date": transaction.transactionTimestamp,
  //                 amount: `₦${transaction.amount}`,
  //                 status: transaction.status.toLowerCase(),
  //                 selection: transaction.partnerId ?? "TESTID",
  //             })
  //         );

  //         return transformedData;
  //     },
  // });

  return {
    pagination,
    filters,
    setFilters,
    isLoading,
    tableData,
    setPagination,
    isError,
    refetch : () => getTransactions()
  };
};
