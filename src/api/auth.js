import { useMutation } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_BASE_URL

const useSignIn = (formData) => {
    return useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(BASE_URL+'auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("some error occurred damn")
                throw new Error(errorData.message);
            }
            console.log("it went thru yay")
            return response.json();
        },
    });
};


export default useSignIn;
