import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TransactionTable from "./transaction/table/table";
import { useEffect, useState } from "react";
import columns from "./transaction/table/columns";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import Data from "./transaction/table/data";



const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}transaction`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // Add other configuration options as needed
        });

        console.log(response.data.data);
        const transactions = response.data.data.transactions;

        if (response.data && transactions) {
          const transformedData = transactions.map(
            (transaction) => ({
              "partner": transaction.partner ?? "TEST",
              "meter number": transaction.meter.meterNumber,
              "customer name": transaction.user.name,
              "transaction reference": transaction.id,
              "transaction date": new Date(
                transaction.transactionTimestamp
              ).toLocaleDateString(),
              "amount": `${transaction.amount} N`,
              "status": transaction.status.toLowerCase(),
            })
          );

          console.log("transformedData === ", transformedData);

          setTableData(Data)
          
        } else {
          console.error("Invalid dashboard table data structure");
        }
      } catch (error) {
        console.error("Error fetching dashboard table data:", error);
      } finally {
        setLoading(false);
      }
    };

    console.log("loading === ", loading);

    fetchTableData();
  }, []);

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
                <p>Last Transaction</p>
                <p className="text-[48px] text-primary font-semibold">
                  N1,234.34
                </p>
              </div>
              <div className="">
                <p>Total Withdrawal</p>
                <p className="text-[48px] text-primary font-semibold">
                  N1,234.34
                </p>
              </div>
              <div className="bg-primary text-white p-4">
                <p>Total Balance</p>
                <p className="text-[48px] font-semibold">N1,234.34</p>
              </div>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            tableData.length > 0 && (
              <>
                {/* Render your cards here */}
                <TransactionTable 
                tableData={tableData} 
                columns={columns}
                />
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
