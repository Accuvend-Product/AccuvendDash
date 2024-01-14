import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useUserData = (BASE_URL) => {
  const fetchUserData = async () => {
    
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.get(`${BASE_URL}auth/loggeduser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.status)
      if (response.data.status === "success") {
        const _userData = {
          ...response.data.data.partner,
          unreadNotifications: response.data.unreadNotificationsCount,
        };
        console.log(_userData);
        return {
          userData: response.data.data,
          entityId: _userData?.entityId,
          uploadedImageLink: _userData?.profilePicture,
          email: _userData?.email,
          unreadNotifications: response.data.unreadNotificationsCount,
        };
      }
  };

  const queryInfo = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchUserData,
  });

  return {
    entityId: queryInfo.data?.entityId,
    email: queryInfo.data?.email,
    uploadedImageLink: queryInfo.data?.uploadedImageLink,
    unreadNotifications: queryInfo.data?.unreadNotifications ,
    isUserDataError: queryInfo.error ,
    isUserDataLoading: queryInfo.isLoading,
    userData: queryInfo.data?.userData,
    refetch: queryInfo.refetch,
  };
};

export default useUserData;
