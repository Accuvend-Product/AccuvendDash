/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import logo from '../assets/brandmark-design.png'
import { Link } from 'react-router-dom';
import useSignIn from '../api/auth';

const SignIn = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { mutate, isLoading, isError, error } = useSignIn();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        // Call the mutation function to perform the sign-in
        mutate(formData);
    };
    return (
        <section className="flex justify-center items-center h-screen">
            <div className="w-[600px] p-16 border border-gray-300 rounded-lg">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white justify-center">
                    <img className=" items-center text-center h-5 mr-2" src={logo} alt="logo" />
                </a>
                <form className="mt-[50px]" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-2xl font-medium mb-2 text-left">Email</label>
                        <input type="email" id="email" className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600" />
                    </div>
                    <div className="mt-[20px]">
                        <label htmlFor="password" className="block mb-2 text-2xl font-medium text-left">Password</label>
                        <input type="password" id="password" className="border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                        </div>
                        <a href="#" className="text-lg font-medium text-primary-600 hover:underline dark:text-primary-500 mt-[20px]">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        className="mt-[20px] bg-gray-200 hover:bg-blue-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-lg px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>
                    {isError && <p className="text-red-500 mt-[20px]">Error: {error.message}</p>}
                    <p className="text-lg font-medium text-gray-400 dark:text-gray-400 mt-[20px]">
                        Don't have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1">Create an account</Link>
                    </p>
                </form>
            </div>
        </section>

    )
}

export default SignIn;