import React from 'react'
import axios from 'axios'
import MainContent from '../../components/MainContent'
import {useQuery} from '@tanstack/react-query'
const Product = () => {
    const {isLoading , data , isError} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try{
                const response = await axios.get(`${BASE_URL}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                return response
            }catch(err){
                return err
            }
        }
    })
  return (
    <>
        <MainContent>

        </MainContent>
    </>
  )
}

export default Product