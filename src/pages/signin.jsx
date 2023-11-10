import React from 'react'
import { Link } from "react-router-dom";
import InputBox from "../components/input";
import logo from '../assets/brandmark-design.png'

const SignIn = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
<section className='flex justify-center items-center h-screen'>
{/* <div class="bg-white rounded-lg shadow dar k:border md:mt-0 sm:max-w-md xl:p-16dark:bg-gray-800 dark:border-gray-700 w-96 p-6"> */}
<div className='w-[600px] p-16 border border-gray-300 rounded-lg'>
<a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white justify-center">      
    <img class=" items-center text-center h-5 mr-2" src={logo} alt="logo"/>
         
     </a>
     

       
     <form className='mt-[50px]'>
                  <div>
                       {/* <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                       <label for="email" class="block text-2xl font-medium mb-2 text-left">Email</label>
                       <input type="email" id='email' className='border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600'/>
                       {/* <input type="email" name="email" id="email" class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/> */}
                   </div>
                   <div className='mt-[20px]'>
                       <label for="password" class="block mb-2 text-2xl font-medium text-left">Password</label>
                       <input type="password" id='password' className='border border-gray-300 rounded-lg w-full px-2 py-4 focus:outline-none focus:ring-0 focus:border-blue-600'/>
                   </div>
                   <div class="flex items-center justify-between">
                       <div class="flex items-start">
                           {/* <div class="flex items-center h-5">
                             <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                           </div> */}
                           {/* <div class="ml-3 text-sm">
                             <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                           </div> */}
                       </div>
                       <a href="#" class="text-lg font-medium text-primary-600 hover:underline dark:text-primary-500 mt-[20px]">Forgot password?</a>
                   </div>
                   <button type="submit" className="mt-[20px] bg-gray-200 hover:bg-blue-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-lg px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                   <p class="text-lg font-medium text-gray-400 dark:text-gray-400 mt-[20px]">
                       Don’t have an account yet? <Link to='signup'> <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1">Create an account</a></Link>
                   </p>
               </form>


    </div>

</section>
    )
}

export default SignIn;