import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar"
import PartnerDetailsCard from "./details-card";
import PartnerOrderConfirmation from "./order-confirmation";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/ui/loading";
import MainContent from "../../components/MainContent";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const PartnerTransactionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    console.log(id)
    const [transactionDetails, setTransactionDetails] = useState(null);

    useEffect(() => {
        // Fetch transaction details using the 'id' parameter
        // Example: You may use an API call here

        // Mock API call
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}transaction/info?transactionId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log(response.data.data.transaction)

                setTransactionDetails(response.data.data.transaction);
            } catch (error) {
                console.error("Error fetching transaction details:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!transactionDetails) {
        return <LoadingSpinner />
    }

    // can get the data and columns from some constant file
    return (
        <>
            <Navbar />
            <div className="flex">
            <MainContent>
                    <div className="flex items-center">
                    <ArrowLeft className="mr-2 mt-1 w-7 h-7 hover:cursor-pointer text-blue-800" onClick={() => navigate(-1)}/>
                        <h1 className="font-bold text-2xl">Transaction Details</h1>
                    </div>
                    {/* <h1 className="text-body1 text-xl my-2">{transactionDetails.id}</h1> */}

                    {/* both cards */}
                    <div className="flex gap-16">
                        <PartnerDetailsCard transaction={transactionDetails} />
                        <PartnerOrderConfirmation transaction={transactionDetails} />
                    </div>

                    <div className="mt-10"></div>
                    </MainContent>
            </div>
        </>
    );
};

export default PartnerTransactionDetails