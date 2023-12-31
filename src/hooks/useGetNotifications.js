import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
export const useNotificationData = (BASE_URL) =>{
    const token = localStorage.getItem('token');
    const result = useQuery({
        queryKey: ['notifications'],
        queryFn : async () => {
            const res = await axios.get(`${BASE_URL}notification/?page=1&limit=2&status=read`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return res?.data?.data?.notifications
        }
    })

    return result
}