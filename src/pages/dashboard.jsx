import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TransactionTable from "./transaction/table/table";

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className=" px-8 sm:px-10 md:px-12 border-b border-body1 flex-1">
                    <div className=" ml-auto py-10">
                        {/* cards */}
                        <div className="flex space-x-12 items-center justify-end">
                            <div className="">
                                <p>Last Transaction</p>
                                <p className="text-[48px] text-primary font-semibold">N1,234.34</p>
                            </div>
                            <div className="">
                                <p>Total Withdrawal</p>
                                <p className="text-[48px] text-primary font-semibold">N1,234.34</p>
                            </div>
                            <div className="bg-primary text-white p-4">
                                <p>Total Balance</p>
                                <p className="text-[48px] font-semibold">N1,234.34</p>
                            </div>
                        </div>
                    </div>

                    {/* table */}
                    <TransactionTable />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
