import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = (BASE_URL) => {
    const [email, setEmail] = useState('');
    const [uploadedImageLink, setUploadedImageLink] = useState('');
    const [isUserDataLoading, setIsUserDataLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token available');
                }

                const response = await axios.get(`${BASE_URL}auth/loggeduser`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.status === 'success') {
                    const userData = response.data.data.partner;
                    setEmail(userData.email);
                    if (userData.profilePicture) {
                        setUploadedImageLink(userData.profilePicture);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsUserDataLoading(false);
            }
        };

        fetchUserData();
    }, [BASE_URL]);

    return { email, uploadedImageLink, isUserDataLoading };
};

export default useUserData;
