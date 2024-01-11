
import OTPInput from "../components/OTPInput";
import { useState } from "react";
import logo from "../assets/brandmark-design.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ADMIN, CUSTOMERCARE, PARTNER,  CUSTOMER } from "../Constants";
import { ADMIN_ROUTE, CUSTOMER_CARE_ROUTE, TRANSACTION_ROUTE } from "../Routes";
import { EyeOff, Eye } from "lucide-react";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORTAL_TYPE = import.meta.env.VITE_PORTAL_TYPE;

export const ConfirmOTP = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        otpCode: "",
    });
  
    const [loggInOTPSet, setLoggInOTPSet] = useState(true);
    const [otpRequestSuccessful , setOtpRequestSuccessful] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token available');
        }
        const response = await axios.post(BASE_URL + "auth/login/confirm", formData , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log("Successful sign-in:", response?.data.data);
  
        // Save the tokens and user credentials in local storage
        localStorage.setItem("token", response?.data?.data?.accessToken);
        localStorage.setItem("userEmail", response?.data?.data?.entity?.email);
  
        toast.success("Login Successful");
  
        // Redirect to the dashboard for the right portal
        if (PORTAL_TYPE === ADMIN) navigate(`${ADMIN_ROUTE}${TRANSACTION_ROUTE}`);
        if (PORTAL_TYPE === PARTNER) navigate("/partner-dashboard");
        if (PORTAL_TYPE === CUSTOMERCARE) navigate(`${CUSTOMER_CARE_ROUTE}${TRANSACTION_ROUTE}`);
        if (PORTAL_TYPE === CUSTOMER) navigate(`/transactions`);
      } catch (error) {
        console.log(error)
        let error_message = ""
        if(error_message = error?.response?.status === 400){
          error_message = error?.response?.data?.message
        }else if(error_message = error?.response?.status === 403  && error?.response?.data?.message === "Unauthorized access to current login route" ){
          error_message = "Sorry You don't have access to this portal"
        }else{
          error_message = "Login Failed"
        }
        toast.error(error_message);

        console.error("Error signing in:", error_message);
        setError(error_message);
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <section className="flex justify-center items-center h-screen px-5">
        <div className="w-[600px] p-16 border border-gray-300 rounded-lg">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white justify-center"
          >
            <img
              className=" items-center text-center h-5 mr-2"
              src={logo}
              alt="logo"
            />
          </a>
          {error && (
            <p className="text-white bg-red-500 rounded-xl px-4 py-5 text-xl text-center my-10">
              {error}
            </p>
          )}
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
           
            <div className="">
                <div className="text-center  mb-6 text-3xl">Enter OTP Code</div>
                <div className="text-center ">Please enter the 6 digits verification code we just sent to your email</div>
              <div className="my-6">
                {/* <label
                  htmlFor="phoneNumber"
                  className="block text-2xl font-medium mb-2 text-left"
                >
                  OTP
                </label> */}
                <OTPInput
                  id="otp"
                  value={formData.OTP}
                  onChange={(value) => setFormData({ ...formData,otpCode : value })}
                  className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600"
                />
              </div>
            </div>
  
          
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>
            </div>
            <button
              type="submit"
              className="mt-[20px] disabled:bg-gray-500 bg-primary hover:bg-blue-600 w-full text-white font-medium rounded-3xl text-lg px-5 py-3.5 text-center"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
            {/* <p className="text-lg font-medium text-primary mt-[20px] text-center">
                          Don't have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1">Create an account</Link>
                      </p> */}
          </form>
        </div>
      </section>
    );
}
