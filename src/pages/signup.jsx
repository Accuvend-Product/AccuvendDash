import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/brandmark-design.png';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(BASE_URL + 'auth/signup', formData);
            toast.success('Register Successful');
            console.log('Successful sign-up:', response.data);

        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Register Failed');
            setError(error);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <div className="w-[600px] p-16 border border-gray-300 rounded-lg">
                <img className=" items-center text-center h-5 mr-2" src={logo} alt="logo" />
                {error && <p className="text-white bg-red-500 rounded-xl px-4 py-5 text-xl text-center my-10">Registered Failed</p>}
                <form className="mt-[50px]" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-2xl font-medium mb-2 text-left">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600"
                        />
                    </div>
                    <div className="mt-[20px]">
                        <label htmlFor="password" className="block mb-2 text-2xl font-medium text-left">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600 relative"
                        />
                    </div>
                    <div className="mt-[20px]">
                        <label htmlFor="confirmPassword" className="block mb-2 text-2xl font-medium text-left">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-[20px] disabled:bg-gray-500 bg-primary hover:bg-blue-600 w-full text-white font-medium rounded-3xl text-lg px-5 py-3.5 text-center"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <p className="text-lg font-medium text-gray-400 dark:text-gray-400 mt-[20px] text-center">
                        Already have an account yet? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1">Login</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default SignUp;
