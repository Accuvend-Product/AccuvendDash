


import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const VITE_PORTAL_TYPE = import.meta.env.VITE_PORTAL_TYPE;
export const useGetComplaints = (entityid) => {
     
    const [pagination, setPagination] = useState({
        page: 1,
        size: 9,
      });
      const [filters, setFilters] = useState();
      const [isLoading, setIsLoading] = useState(false);
      const [tableData, setTableData] = useState([]);
      const [isError , setIsError] = useState(false)
      const [paginationDetail ,setPaginationDetail] = useState({})
      const [entityFilter, setEntityFilter] = useState()
    
    
      const getComplaints = async (entityId) => {
        
        setIsLoading(true)
        setIsError(false)
        try {
            const response = await axios.get(
                `${BASE_URL}complaints/all?${new URLSearchParams(
                  (() => (entityId && VITE_PORTAL_TYPE ===  'PARTNER'  ? {
                    entityId : entityId
                  }: {}))()
                ).toString()}&${new URLSearchParams(
                  pagination
                ).toString()}&${new URLSearchParams(filters).toString()}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
          
              
              setTableData(response?.data?.data?.complaint.map((item) => {
                return {
                  ...item , 
                  "ticketId": item?.id
                }
              }));
              setPaginationDetail(response?.data?.data?.pagination)
        } catch (error) {
            setIsError(true)
            console.log(error)
        }
        
        setIsLoading(false)
        // return transformedData;
        
      };
    
      useEffect(() => {
        getComplaints(entityid);
      }, [filters, pagination , entityid]);
    
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
        setPaginationDetail,
        refetch : () =>  getComplaints(entityid)
      }
}