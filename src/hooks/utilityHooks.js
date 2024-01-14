import { useState } from "react"
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQueryClient, QueryCache} from '@tanstack/react-query'
export const useLogout = () => {
    const navigate = useNavigate();
    const [isLogginLoading , setIsLogginLoading] = useState(false);
    const queryClient = useQueryClient();
    
    const handleLogout = async () => {
        
        try {
            //Set Login out state loading to true
            setIsLogginLoading(true)
            // Retrieve the authentication token from local storage
            const authToken = localStorage.getItem("token");
            if(!authToken){
                toast.error("Sorry you have to login to see the dashboard");
                // Clear authentication token and user email from local storage
                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");
                //invalidate current-user query when logged out 
                queryClient.invalidateQueries({ queryKey: ['current-user'] })
                //clear all cache when logged out for 
                queryClient.clear()
                // Redirect to the login page
                navigate("/");
                return 
            }
            
            // Send a POST request to the server's logout endpoint with the authentication token as data
            const response = await axios.post(
                `${BASE_URL}auth/logout`,
                {
                    token: authToken,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
    
            // Check if the logout was successful
            if (response.status === 200) {
                toast.success("Logout Successful");
            } else {
               
                throw new Error("Logout Failed. Please try again.");
            }
            
            // Clear authentication token and user email from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            //invalidate current-user query when logged out 
            queryClient.invalidateQueries({ queryKey: ['current-user'] })
            // Redirect to the login page
            navigate("/");
        } catch (error) {
            console.log(error);
            console.error("Error logging out:", error.message);
            // if the error is because of invalid session still log the user out 
            if(error.response?.data?.message === "Invalid authentication"){
                toast.error("Sorry you have been logged out of this session , because another session has been started");
                 // Clear authentication token and user email from local storage
                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");
                //invalidate current-user query when logged out 
                queryClient.invalidateQueries({ queryKey: ['current-user'] })
                //clear all cache when logged out for 
                queryClient.clear()
                // Redirect to the login page
                navigate("/");
            }else if(error.response?.data?.message === "Invalid authentication"){
                
            }
            else{
                toast.error("An error occurred while logging out. Please try again.");
            }
        }finally{
          setIsLogginLoading(false)
        }
    };

    return {
        handleLogout , 
        isLogginLoading
    }

}