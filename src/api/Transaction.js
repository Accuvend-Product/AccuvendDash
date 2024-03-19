
import { useEffect, useMemo, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isObjectEmpty } from "../lib/utils";
// export const useGetTransactions = (query = {} , url , fetchOnMount = true) => {
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 30,
//   });
//   const [filters, setFilters] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [isError, setIsError] = useState(false);

//   const partnerfilter = useMemo(()=>{
//     let  _filters = {}
//     if (filters?.partnerId) return  {...filters , partnerId: filters?.partnerId?.partnerId}
//     else return filters
    
//   },[filters])

//   const getTransactions = async () => {
//     setIsLoading(true);
//     setIsError(false);
   
//     try {
//       const response = await axios.get(
//         `${BASE_URL}${url ? url : 'transaction?'}${new URLSearchParams(query).toString()}${
//            "&"
//         }${new URLSearchParams(pagination).toString()}${
//           isObjectEmpty(pagination) ? "" : "&"
//         }${new URLSearchParams(partnerfilter).toString()}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       const transformedData = response.data.data.transactions.map(
//         (transaction) => ({
//           image: transaction.powerUnit?.discoLogo
//             ? transaction.powerUnit?.discoLogo
//             : "https://res.cloudinary.com/richiepersonaldev/image/upload/v1699947957/dpijlhj08ard76zao2uk.jpg",
//           disco: transaction.disco ?? "TEST",
//           "meter number": transaction?.meter?.meterNumber,
//           "customer name": transaction?.user?.name,
//           "customer email": transaction?.user?.email,
//           "customer phone": transaction?.user?.phoneNumber,
//           "transaction reference": transaction?.id,
//           "bank reference": transaction?.bankRefId,
//           "transaction date": transaction?.transactionTimestamp,
//           amount: `₦${transaction?.amount}`,
//           status: transaction?.status.toLowerCase(),
//           selection: transaction?.partnerId ?? "",
//           productType: transaction?.productType,
//           biller: transaction?.biller,
//           events : transaction?.events,
//           superagent: transaction?.superagent,
//           partnerName : transaction?.partner?.companyName,
//           "user number": transaction?.user?.phoneNumber ,
//           "channel": transaction?.channel
//         })
//       );
//       setTableData(transformedData);
//     } catch (error) {
//       setIsError(true);
//       console.log(error);
//     }

//     setIsLoading(false);
//     // return transformedData;
//   };

//   useEffect(() => {
//     if(fetchOnMount) getTransactions();
//   }, [filters, pagination?.limit , pagination?.page , pagination]);

  
//   return {
//     pagination,
//     filters,
//     setFilters,
//     isLoading,
//     tableData,
//     setPagination,
//     isError,
//     refetch : () => getTransactions()
//   };
// };


/**
 * A custom hook to fetch transaction data from the server and manage pagination and filters.
 * @param {object} query - Query parameters to be included in the request URL.
 * @param {string} url - The API endpoint URL for fetching transaction data. Defaults to baseurl + 'transaction' if not provided.
 * @param {boolean} fetchOnMount - Determines whether to fetch data on component mount. Defaults to true.
 * @returns {object} An object containing pagination, filters, loading state, transaction data, error state, and refetch function.
 */
export const useGetTransactions = (query = {}, url, fetchOnMount = true) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 30,
  });
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isError, setIsError] = useState(false);

  // Memoized partner filter to handle partnerId extraction
  const partnerfilter = useMemo(() => {
    let _filters = {};
    if (filters?.partnerId) return { ...filters, partnerId: filters?.partnerId?.partnerId };
    else return filters;
  }, [filters]);

  /**
   * Function to fetch transaction data from the server.
   */
  const getTransactions = async (async = false) => {
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

      // Transforming response data
      const transformedData = response.data.data.transactions.map((transaction) => ({
        image: transaction.powerUnit?.discoLogo ? transaction.powerUnit?.discoLogo :
          "https://res.cloudinary.com/richiepersonaldev/image/upload/v1699947957/dpijlhj08ard76zao2uk.jpg",
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
        selection: transaction?.partnerId ?? "",
        productType: transaction?.productType,
        biller: transaction?.biller,
        events: transaction?.events,
        superagent: transaction?.superagent,
        partnerName: transaction?.partner?.companyName,
        "user number": transaction?.user?.phoneNumber,
        "channel": transaction?.channel
      }));

      setTableData(transformedData);

      if(async){
        setIsLoading(false);
        return transformedData
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
      if(async){
        setIsLoading(false);
        return error
      }
     
    }
    setIsLoading(false);
    
  };

  // Fetch data on component mount if fetchOnMount is true
  useEffect(() => {
    if (fetchOnMount) getTransactions();
  }, [filters, pagination?.limit, pagination?.page, pagination]);

  /**
   * Function to refetch transaction data.
   */
  const refetch = () => getTransactions();

  /**
   * Async Function to refetch transaction data. this will return data or an error
   */

  const asyncReFetch = async () => await getTransactions(true) ;

  return {
    pagination,
    filters,
    setFilters,
    isLoading,
    tableData,
    setPagination,
    isError,
    refetch,
    asyncReFetch,
  };
};
