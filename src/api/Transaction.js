// // Tanstack API Request Error react.development.js:1618 Uncaught TypeError: Cannot read properties of null (reading 'useContext')
// import { useQuery } from "@tanstack/react-query";
// import React from "react";

// export const useGetTransactions =  useQuery({
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