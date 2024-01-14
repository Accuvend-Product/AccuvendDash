import React , {useEffect , useState} from 'react'
import { useNavigate , Navigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useLogout } from '../hooks/utilityHooks';
import useUserData from '../hooks/useUserDataFetchApi';
import { toast } from "react-hot-toast";

const RequireAuth = ({children}) => {
    const {handleLogout} = useLogout()
    const navigate = useNavigate();
    const { isUserDataError} = useUserData(BASE_URL)
    useEffect(()=>{
        const authToken = localStorage.getItem("token");
        if(!authToken){
            toast.error("Sorry you have to login to see the dashboard");
            // Clear authentication token and user email from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            // Redirect to the login page
            navigate("/");
            
        }else{
            if(isUserDataError?.response?.data?.message === "Invalid authentication"){
                handleLogout();
            }
        }
        
    },[isUserDataError])



  return children
}

export default RequireAuth