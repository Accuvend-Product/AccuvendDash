import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";
import PartnerTransactionTable from "./table/table";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePartnerData } from "../../contexts/partner-context";

const PartnerDashboard = () => {

    const {
        tableData: partnerTableData,
        setTableData: setPartnerTableData,
        totalTransactions: partnerTotalTransactions,
        setTotalTransactions: setPartnerTotalTransactions,
      } = usePartnerData();

    const [tableData, setTableData] = useState(partnerTableData);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [failedTransactions, setFailedTransactions] = useState(0);

    const { isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}transaction`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const transformedData = response.data.data.transactions.map(
                (transaction) => ({
                    image: transaction.powerUnit?.discoLogo ? transaction.powerUnit?.discoLogo : "https://res.cloudinary.com/richiepersonaldev/image/upload/v1699947957/dpijlhj08ard76zao2uk.jpg",
                    disco: transaction.disco ?? "TEST",
                    "meter number": transaction.meter.meterNumber,
                    "customer name": transaction.user.name,
                    "transaction reference": transaction.bankRefId,
                    "transaction date": transaction.transactionTimestamp,
                    amount: `₦${transaction.amount}`,
                    status: transaction.status.toLowerCase(),
                    selection: transaction.partnerId ?? "TESTID",
                })
            );

            setTableData(transformedData);
            setPartnerTableData(transformedData);
            return transformedData;
        },
    });

    const { isLoading: totalTransactionsLoading, } = useQuery({
        queryKey: ["transactions", "total"],
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}transaction/yesterday`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const totalTransactionCount = response.data.data.transactions.length;
            const allTotalTransactionCount = response.data.data.totalAmount;

            setTotalTransactions(totalTransactionCount);
            setTotalAmount(allTotalTransactionCount);

            return totalTransactionCount;
        },
    });


    const { isLoading: failedTransactionsLoading } = useQuery({
        queryKey: ["transactions", "failed"],
        queryFn: async () => {
            const response = await axios.get(
                `${BASE_URL}transaction/yesterday?status=failed`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const failedTransactionCount = response.data.data.transactions.length;
            setFailedTransactions(failedTransactionCount);

            return failedTransactionCount;
        },
        staleTime: 1000 * 60 * 60,
    });

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="ml-[372px] px-8 sm:px-10 md:px-12 border-b border-body1 flex-1 pb-10">
                    <div className=" ml-auto py-10">
                        {/* cards */}
                        <div className="flex space-x-12 items-center justify-end">


                            <div className="hover:bg-primary hover:text-white px-4 py-2 bg-gray-100 text-primary rounded-lg hover:cursor-pointer">
                                <p className="text-[16px]">Total no. Transacted Today</p>
                                <p className="text-[48px] font-semibold hover:text-white">
                                    {totalTransactionsLoading ? (<div className="flex items-center gap-2">
                                        <div role="">
                                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        </div>
                                        <p className="">Loading...</p>
                                    </div>) : (<p className="text-center">{totalTransactions || 0}</p>)}
                                </p>
                            </div>


                            <div className="hover:bg-primary hover:text-white px-4 py-2 bg-gray-100 text-primary rounded-lg hover:cursor-pointer">
                                <p className="text-[16px]">Failed Transactions Today</p>
                                <p className="text-[48px] font-semibold hover:text-white">
                                    {failedTransactionsLoading
                                        ? (<div className="flex items-center gap-2">
                                            <div role="">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                            <p className="hover:text-white">Loading...</p>
                                        </div>)
                                        : (<p className="text-center">{failedTransactions || 0}</p>)}
                                </p>
                            </div>


                            <div className="hover:bg-primary hover:text-white px-4 py-2 bg-gray-100 text-primary rounded-lg hover:cursor-pointer">
                                <p className="text-[16px]">Total Amount Vended Today</p>
                                <p className="text-[48px] font-semibold">
                                    {" "}
                                    {totalTransactionsLoading ? (<div className="inline-flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div role="">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                            <p className="text-primary hover:text-white">Loading...</p>
                                        </div>
                                    </div>) : (<p className="text-center">₦{totalAmount.toLocaleString() || 0}</p>)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="h-1/2 w-full flex items-center justify-center">
                            <div role="">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        tableData && (
                            <>
                                {/* Render your cards here */}
                                <PartnerTransactionTable tableData={tableData} />
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default PartnerDashboard;
