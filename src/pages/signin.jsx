/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import logo from "../assets/brandmark-design.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ADMIN, CUSTOMERCARE, PARTNER } from "../Constants";
import { ADMIN_ROUTE, CUSTOMER_CARE_ROUTE, TRANSACTION_ROUTE } from "../Routes";
import { EyeOff, Eye } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORTAL_TYPE = import.meta.env.VITE_PORTAL_TYPE;

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(BASE_URL + "auth/login", formData);
      console.log("Successful sign-in:", response.data.data);

      // Save the tokens and user credentials in local storage
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("userEmail", response.data.data.entity.email);

      toast.success("Login Successful");

      // Redirect to the dashboard for the right portal
      if (PORTAL_TYPE === ADMIN) navigate(`${ADMIN_ROUTE}${TRANSACTION_ROUTE}`);
      if (PORTAL_TYPE === PARTNER) navigate("/partner-dashboard");
      if (PORTAL_TYPE === CUSTOMERCARE) navigate(`${CUSTOMER_CARE_ROUTE}${TRANSACTION_ROUTE}`);
    } catch (error) {
      let error_message = error?.response?.status === 400 ? error?.response?.data?.message  : "Login Failed"
      error_message = error?.response?.status === 403 && error?.response?.data?.message === "Unauthorized access to current login route"  ? "Sorry You don't have access to this portal" : "Login Failed"
      toast.error(error_message);
      console.error("Error signing in:", error_message);
      setError(error_message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex justify-center items-center h-screen">
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
        <form className="mt-[50px]" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-2xl font-medium mb-2 text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600"
            />
          </div>
          <div className="mt-[20px]">
            <label
              htmlFor="password"
              className="block mb-2 text-2xl font-medium text-left"
            >
              Password
            </label>

            <div className="relative">
             
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="flex border border-gray-300 rounded-lg w-full px-2 py-4 hover:outline-none hover:ring-0 hover:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600"
              />
               <div className="absolute inset-y-0 end-0 pe-6 z-10  flex items-center">
                <button
                    className="w-4 h-4"
                    type="button"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                >
                    {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start"></div>
            <a
              href="#"
              className="text-lg font-medium text-primary-600 hover:underline dark:text-primary-500 mt-[20px]"
            >
              Forgot password?
            </a>
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
};

export default SignIn;
