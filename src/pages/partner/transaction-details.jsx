import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar"
import PartnerDetailsCard from "./details-card";
import PartnerOrderConfirmation from "./order-confirmation";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const PartnerTransactionDetails = () => {
  const { id } = useParams();

  console.log(id)
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    // Fetch transaction details using the 'id' parameter
    // Example: You may use an API call here

    // Mock API call
    const fetchData = async () => {
      try {
            const response = await axios.get(`${BASE_URL}transaction/info?bankRefId=${id}`, {
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
    return <p>Loading...</p>;
  }

  // can get the data and columns from some constant file
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-[372px] pt-4 px-8 sm:px-10 md:px-12 border-b border-body1 w-[100%]">
          <div className="flex items-center">
            <ArrowLeft className="mr-2 w-5 h-5" />
            <h1 className="font-bold text-2xl">Transaction Details</h1>
          </div>
          {/* <h1 className="text-body1 text-xl my-2">{transactionDetails.id}</h1> */}

          {/* both cards */}
          <div className="flex gap-16">
            <PartnerDetailsCard transaction={transactionDetails} />
            <PartnerOrderConfirmation transaction={transactionDetails}/>
          </div>

          <div className="mt-10"></div>
        </div>
      </div>
    </>
  );
};

export default PartnerTransactionDetails