/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import logo from '../assets/brandmark-design.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SignIn = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(BASE_URL + 'auth/login', formData);
            console.log('Successful sign-in:', response.data.data);

            // Save the tokens and user credentials in local storage
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('userEmail', response.data.data.entity.email);

            toast.success('Login Successful');

            // Redirect to the dashboard
            navigate('/partner-dashboard');

        } catch (error) {
            toast.error('Login Failed');
            console.error('Error signing in:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="flex justify-center items-center h-screen">
            <div className="w-[600px] p-16 border border-gray-300 rounded-lg">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white justify-center">
                    <img className=" items-center text-center h-5 mr-2" src={logo} alt="logo" />
                </a>
                {error && <p className="text-white bg-red-500 rounded-xl px-4 py-5 text-xl text-center my-10">Login Failed</p>}
                <form className="mt-[50px]" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-2xl font-medium mb-2 text-left">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600"
                        />
                    </div>
                    <div className="mt-[20px]">
                        <label htmlFor="password" className="block mb-2 text-2xl font-medium text-left">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                        </div>
                        <a href="#" className="text-lg font-medium text-primary-600 hover:underline dark:text-primary-500 mt-[20px]">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        className="mt-[20px] disabled:bg-gray-500 bg-primary hover:bg-blue-600 w-full text-white font-medium rounded-3xl text-lg px-5 py-3.5 text-center"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>
                    <p className="text-lg font-medium text-primary mt-[20px] text-center">
                        Don't have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1">Create an account</Link>
                    </p>
                </form>
            </div>
        </section>

    )
}

export default SignIn;