import { ArrowLeft } from "lucide-react";

import DetailsCard from "../components/OrderConfirmation/details-card";
import OrderConfirmation from "../components/OrderConfirmation/order-confirmation";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/ui/loading";
import MainContent from "../components/MainContent";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import DetailsCardAirtime from "../components/OrderConfirmation/details-card-airtime";
import DetailsCardData from "../components/OrderConfirmation/details-card-data";
import OrderConfirmationAirtime from "../components/OrderConfirmation/order-confirmation-airtime";
import OrderConfirmationData from "../components/OrderConfirmation/order-confirmation-data";



const GetDetailCard = ({transaction}) => {
    switch (transaction.productType) {
        case "DATA":
            return <DetailsCardData transaction={transaction} />;
            break;

        case "AIRTIME":
            return <DetailsCardAirtime transaction={transaction} />;
            break;
        
        case "ELECTRICITY":
            return <DetailsCard transaction={transaction} />;
            break;
    
        default:
            return <DetailsCard transaction={transaction} />;
            break;
    }
}


const GetOrderConfirmation = ({transaction}) => {
    switch (transaction.productType) {
        case "DATA":
            return <OrderConfirmationData transaction={transaction} />;
            break;

        case "AIRTIME":
            return <OrderConfirmationAirtime transaction={transaction} />;
            break;
        
        case "ELECTRICITY":
            return <OrderConfirmation transaction={transaction} />;
            break;
    
        default:
            return <OrderConfirmation transaction={transaction} />;
            break;
    }
}


const TransactionDetails = ({sidebarType=''}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    
    const {isLoading , data : transactionDetails , isError } =  useQuery({
        queryKey: [`transaction-${id}`],
        queryFn : async () =>  {
            const res = await axios.get(`${BASE_URL}transaction/info?transactionId=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            return res?.data?.data?.transaction
        }
    })
    

    if (isLoading) {
        return <LoadingSpinner />
    }

    // can get the data and columns from some constant file
    return (
        <>
            <MainContent sideBartype={sidebarType}>
                <div className="flex items-center mt-9">
                    <ArrowLeft className="mr-2 mt-1 w-7 h-7 hover:cursor-pointer text-blue-800" onClick={() => navigate(-1)}/>
                    <h1 className="font-bold text-2xl">Transaction Details</h1>
                </div>
                {/* <h1 className="text-body1 text-xl my-2">{transactionDetails.id}</h1> */}

                {/* both cards */}
                <div className="mt-8 flex flex-col md:flex-row md:gap-x-16 items-stretch gap-y-8">
                    <GetDetailCard transaction={transactionDetails} />
                    <GetOrderConfirmation transaction={transactionDetails} />
                </div>

                <div className="mt-10"></div>
            </MainContent>
            
        </>
    );
};

export default TransactionDetails