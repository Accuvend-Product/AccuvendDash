import { useState } from "react"
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { toast } from "react-hot-toast";
import axios from "axios";
export const useLogout = () => {
    const navigate = useNavigate();
    const [isLogginLoading , setIsLogginLoading] = useState(false);
    const handleLogout = async () => {
    
        try {
            //Set Login out state loading to true
            setIsLogginLoading(true)
            // Retrieve the authentication token from local storage
            const authToken = localStorage.getItem("token");
            
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
            // Redirect to the login page
            navigate("/");
        } catch (error) {
            console.log(error);
            console.error("Error logging out:", error.message);
            toast.error("An error occurred while logging out. Please try again.");
        }finally{
          setIsLogginLoading(false)
        }
    };

    return {
        handleLogout , 
        isLogginLoading
    }

}