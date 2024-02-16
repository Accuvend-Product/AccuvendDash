
import { useEffect, useMemo, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isObjectEmpty } from "../lib/utils";
export const useGetTransactions = (query = {} , url) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 30,
  });
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isError, setIsError] = useState(false);

  const partnerfilter = useMemo(()=>{
    let  _filters = {}
    if (filters?.partnerId) return  {...filters , partnerId: filters?.partnerId?.partnerId}
    else return filters
    
  },[filters])

  const getTransactions = async () => {
    setIsLoading(true);
    setIsError(false);
   
    try {
      const response = await axios.get(
        `${BASE_URL}${url ? url : 'transaction?'}${new URLSearchParams(query).toString()}${
           "&"
        }${new URLSearchParams(pagination).toString()}${
          isObjectEmpty(pagination) ? "" : "&"
        }${new URLSearchParams(partnerfilter).toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const transformedData = response.data.data.transactions.map(
        (transaction) => ({
          image: transaction.powerUnit?.discoLogo
            ? transaction.powerUnit?.discoLogo
            : "https://res.cloudinary.com/richiepersonaldev/image/upload/v1699947957/dpijlhj08ard76zao2uk.jpg",
          disco: transaction.disco ?? "TEST",
          "meter number": transaction?.meter?.meterNumber,
          "customer name": transaction?.user?.name,
          "customer email": transaction?.user?.email,
          "customer phone": transaction?.user?.phoneNumber,
          "transaction reference": transaction?.id,
          "bank reference": transaction?.bankRefId,
          "transaction date": transaction?.transactionTimestamp,
          amount: `₦${transaction?.amount}`,
          status: transaction?.status.toLowerCase(),
          selection: transaction?.partnerId ?? "TESTID",
          events : transaction?.events,
          superagent: transaction?.superagent,
          partnerName : transaction?.partner?.companyName,
        })
      );
      setTableData(transformedData);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }

    setIsLoading(false);
    // return transformedData;
  };

  useEffect(() => {
    getTransactions();
  }, [filters, pagination?.limit , pagination?.page , pagination]);

  
  return {
    pagination,
    filters,
    setFilters,
    isLoading,
    tableData,
    setPagination,
    isError,
    refetch : () => getTransactions()
  };
};
