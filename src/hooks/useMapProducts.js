import { mapProductToObject, useGetProducts } from "../api/getProducts"
import { useMemo } from "react"
export const useMapProducts = () => {
    const {data , isError , isLoading} = useGetProducts()
    const mapProductCodesToName = useMemo(()=>{
        return mapProductToObject(data?.data?.data?.products)
    },[data])

    return mapProductCodesToName
}