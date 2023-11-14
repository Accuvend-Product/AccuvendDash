import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TransactionTable from "./transaction/table/table";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);

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
          partner: transaction.partner ?? "TEST",
          "meter number": transaction.meter.meterNumber,
          "customer name": transaction.user.name,
          "transaction reference": transaction.bankRefId ?? "REF TEST",
          "transaction date": transaction.transactionTimestamp,
          amount: `${transaction.amount} N`,
          status: transaction.status.toLowerCase(),
        })
      );

      setTableData(transformedData); // Update state directly

      return transformedData;
    },
    // Other configurations...
  });

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className=" px-8 sm:px-10 md:px-12 border-b border-body1 flex-1 pb-10">
          <div className=" ml-auto py-10">
            {/* cards */}
            <div className="flex space-x-12 items-center justify-end">
              <div className="">
                <p className="text-3xl">Total no. Transacted 24hrs</p>
                <p className="text-[48px] text-primary font-semibold">
                  1,234
                </p>
              </div>
              <div className="">
                <p className="text-3xl">Failed Transactions</p>
                <p className="text-[48px] text-primary font-semibold">
                  34
                </p>
              </div>
              <div className="bg-primary text-white p-4">
                <p className="text-3xl">Total Amount Transacted 24hrs</p>
                <p className="text-[48px] font-semibold">N1,234,476.87</p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            tableData.length > 0 && (
              <>
                {/* Render your cards here */}
                <TransactionTable tableData={tableData} />
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
