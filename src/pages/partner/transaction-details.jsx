import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar"
import PartnerDetailsCard from "./details-card";
import PartnerOrderConfirmation from "./order-confirmation";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PartnerTransactionDetails = () => {
  const { id } = useParams();
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    // Fetch transaction details using the 'id' parameter
    // Example: You may use an API call here

    // Mock API call
    const fetchData = async () => {
      try {
        const response = await fetch(`/transaction/info${id}`);
        const data = await response.json();
        setTransactionDetails(data);
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
        <div className="pt-4 px-8 sm:px-10 md:px-12 border-b border-body1 w-[100%]">
          <div className="flex items-center">
            <ArrowLeft className="mr-2 w-5 h-5" />
            <h1 className="font-bold text-2xl">Transaction Details</h1>
          </div>
          <h1 className="text-body1 text-xl my-2">PHED (TXN-2023-001)</h1>

          {/* both cards */}
          <div className="flex gap-16">
            <PartnerDetailsCard />
            <PartnerOrderConfirmation />
          </div>

          <div className="mt-10"></div>
        </div>
      </div>
    </>
  );
};

export default PartnerTransactionDetails