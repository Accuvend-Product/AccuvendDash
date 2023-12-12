


import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetComplaints = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        size: 9,
      });
      const [filters, setFilters] = useState({});
      const [isLoading, setIsLoading] = useState(false);
      const [tableData, setTableData] = useState([]);
      const [isError , setIsError] = useState(false)
      const [paginationDetail ,setPaginationDetail] = useState({})
    
      const getTransactions = async () => {
        
        setIsLoading(true)
        setIsError(false)
        try {
            const response = await axios.get(
                `${BASE_URL}complaints/all?${new URLSearchParams(
                  pagination
                ).toString()}&${new URLSearchParams(filters).toString()}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
          
              
              setTableData(response?.data?.data?.complaint);
              setPaginationDetail(response?.data?.data?.pagination)
        } catch (error) {
            setIsError(true)
            console.log(error)
        }
        
        setIsLoading(false)
        // return transformedData;
        
      };
    
      useEffect(() => {
        getTransactions();
      }, [filters, pagination]);
    
    //   const {isLoading, data , isError} = useQuery({
    //     queryKey: ["complaints"],
    //     queryFn: async () => {
    //       const response = await axios.get(`${BASE_URL}complaints/all`, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       });
    //       console.log(response?.data?.data)
    //       return response?.data?.data
    //     }
    //   })

      return {
        pagination,
        filters, 
        setFilters, 
        isLoading,
        tableData, 
        setPagination,
        isError,
        paginationDetail ,
        setPaginationDetail
      }
}