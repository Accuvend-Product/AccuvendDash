import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DetailsCard from "./details-card";
import TransactionTable from "./table/table";

const TransactionDetails = () => {
    // can get the data and columns from some constant file
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="pt-4 px-8 sm:px-10 md:px-12 border-b border-body1">
                    <div className="flex items-center">
                        <ArrowLeft className="mr-2 w-5 h-5" />
                        <h1 className="font-bold text-2xl">Transaction Details</h1>
                    </div>
                    <h1 className="text-body1 text-xl my-2">
                        PHED (TXN-2023-001)
                    </h1>

                    {/* both cards */}
                    <DetailsCard />

                    <div className="mt-10">
                        {/* table */}
                        <TransactionTable />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionDetails