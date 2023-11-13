/* eslint-disable no-unused-vars */
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL

async function signUp(email, password) {
    const response = await fetch(BASE_URL + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Failed on sign up request', response);
    }

    return await response.json();
}

export function useSignUp() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const signUpMutation = useMutation(
        ({ email, password }) => signUp(email, password), {
        onSuccess: (data) => {
            // TODO: save the user in the state
            navigate('/');
            toast.success('Sign up successful');
        },
        onError: (error) => {
            toast.error('Ops.. Error on sign up. Try again!');
        }
    });

    return signUpMutation;
}



async function signIn(email, password) {
    const response = await fetch(BASE_URL + 'auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Failed on sign in request');
    }

    return await response.json();
}

export function useSignIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const signInMutation = useMutation(
        ({ email, password }) => signIn(email, password),
        {
            onSuccess: (data) => {
                // TODO: save the user in the state
                navigate('/dashboard');
                toast.success('Sign in successful');
            },
            onError: (error) => {
                toast.error('Ops.. Error on sign in. Try again!', error);
            },
        }
    );

    return signInMutation;
}

export async function getDashboardTableData(queries) {
    const response = await fetch(BASE_URL + 'transaction', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include authorization header if required
        },
        query: queries
    });

    console.log("response", response)

    if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
    }

    return await response.json();
}

export function useDashboardTableData() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data, mutate } = useMutation(
        () => getDashboardTableData(),
        {
            onSuccess: (data) => {
                // send data to the table
                toast.success('Sign in successful');
            },
            onError: (error) => {
                toast.error('Ops.. Error retrieving table information', error);
            },
        }
    );

    return data;
}

