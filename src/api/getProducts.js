/**
 * Function that fetches product data from the server using axios and react-query.
 * @returns {object} The query result object containing data, status, and error.
 */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getBillerImage } from "../lib/utils";

// Get base URL from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useGetProducts = () => {
    /**
     * React Query hook to fetch product data.
     * @returns {object} The query result object containing data, status, and error.
     */
    const res = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                const response = await axios.get(`${BASE_URL}/master/product`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                return response;
            } catch (err) {
                throw err;
            }
        },
    });
    return res;
}

/**
 * Function to map an array of products to an object with product codes as keys.
 * @param {array} products - Array of products fetched from the server.
 * @returns {object} Object with product codes as keys and formatted product names as values.
 */
export const mapProductToObject = (products) => {
    if(products === undefined) return {};
    // Reduce the array of products to an object with product codes as keys
    return products.reduce((_object, _item) => {
        // Format the product name based on category and type
        _object[_item?.masterProductCode] =  _item?.category === "ELECTRICITY" ? 
            `${_item?.productName} - ${_item?.type}` : 
            `${_item?.productName} - ${_item?.category}`;
        return _object;
    }, {});
}


/**
 * Custom hook to get the image and name of a biller based on its biller code.
 * @param {string} billerCode - The biller code to search for.
 * @returns {Array} Returns an array containing the biller image URL and name.
 */
export const useGetBillerImage = (billerCode) => {
    if(!billerCode)  return [getBillerImage(),'']
    // Get product data using custom hook
    const { data } = useGetProducts();
    
    // Filter products data to find the biller with the specified biller code
    const biller = data?.data?.data?.products?.filter((item) => item?.masterProductCode === billerCode);
    if(!biller){
        return [getBillerImage() , '']
    }
    // Extract biller image URL and name from the filtered biller data
    return [getBillerImage(biller[0]?.productName?.toUpperCase()), biller[0]?.productName];
};
