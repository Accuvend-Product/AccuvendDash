import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = (BASE_URL) => {
    const [email, setEmail] = useState('');
    const [uploadedImageLink, setUploadedImageLink] = useState('');
    const [isUserDataLoading, setIsUserDataLoading] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            console.log("here")
            setIsUserDataLoading(true);
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
                    const userData = {
                        ...response.data.data.partner,
                        unreadNotifications: response.data.unreadNotificationsCount
                    };

                    setEmail(userData.email);
                    setUnreadNotifications(response.data.unreadNotificationsCount);
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

    return { email, uploadedImageLink, isUserDataLoading , unreadNotifications};
};

export default useUserData;
