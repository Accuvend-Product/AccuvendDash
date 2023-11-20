import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DetailsCard from "./details-card";
import OrderConfirmation from "./order-confirmation";
import { useNavigate } from "react-router-dom";

const TransactionDetails = () => {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="ml-[372px] pt-4 px-8 sm:px-10 md:px-12 border-b border-body1 w-[100%]">
                    <div className="flex items-center">
                        <ArrowLeft className="mr-2 w-5 h-5 hover:cursor-pointer" onClick={() => navigate(-1)}/>
                        <h1 className="font-bold text-2xl">Transaction Details</h1>
                    </div>
                    <h1 className="text-body1 text-xl my-2">
                        PHED (TXN-2023-001)
                    </h1>

                    {/* both cards */}
                    <div className="flex gap-16">
                        <DetailsCard />
                        <OrderConfirmation />
                    </div>

                    <div className="mt-10">

                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionDetails