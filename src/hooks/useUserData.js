import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = (BASE_URL) => {
    const [email, setEmail] = useState('');
    const [uploadedImageLink, setUploadedImageLink] = useState('');
    const [isUserDataLoading, setIsUserDataLoading] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [entityId , setEntityId] = useState('')
    const [isUserDataError , setIsUserDataError] = useState(null)
    const [userData , setUserData] = useState(null)
    const fetchUserData = async () => {
        setIsUserDataError(null)
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
                const _userData = {
                    ...response.data.data.partner,
                    unreadNotifications: response.data.unreadNotificationsCount
                };
                setUserData(response.data.data)
                console.log(_userData)
                setEmail(_userData?.email);
                setUnreadNotifications(response.data.unreadNotificationsCount);
                if (_userData.profilePicture) {
                    setUploadedImageLink(_userData.profilePicture);
                }
                if(_userData?.entityId){
                    setEntityId(_userData?.entityId)
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsUserDataError(error)
        } finally {
            setIsUserDataLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [BASE_URL]);

    return { entityId, email, uploadedImageLink , unreadNotifications , isUserDataError , isUserDataLoading , userData , refetch : fetchUserData};
};

export default useUserData;
