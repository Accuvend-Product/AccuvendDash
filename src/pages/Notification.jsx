import React from "react";
import MainContent from "../components/MainContent";
import { useNotificationData } from "../hooks/useGetNotifications";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import {
  AlertCircle,
  BellIcon,
  BellOff,
  ChevronDown,
  Loader,
} from "lucide-react";
const Notification = () => {
  const { isLoading, isError, data: notificationData } = useNotificationData();
  return (
    <>
      <MainContent>
        <div className="w-full mt-10">
          <div className="p-2">
            <div className="w-full flex justify-between items-center mb-6">
              <div className="">
                <p className="max-w-lg text-2xl font-semibold leading-normal text-gray-900 mb-2 ">
                Notification Center
                </p>
                <p className="text-left text-sm text-gray-500 ">
                    Stay Informed with Our Timely Notifications and Updates
                </p>
              </div>
            </div>

            {/* Add Pagination To do */}
            <div className="w-full">
              {isLoading ? (
                <>
                  <div className=" h-5/6 w-full flex items-center justify-center mt-3">
                    <div role="">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {isError && !isLoading && !notificationData ? (
                <>
                  <div className=" h-5/6 mt-3 flex flex-col gap-y-2 justify-center items-center text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    <div className="text-sm">Oops Something Went Wrong</div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {!isError &&
              !isLoading &&
              notificationData &&
              notificationData?.length > 0 ? (
                <>
                  {notificationData?.map((item) => (
                    <div
                      href="#"
                      className="flex flex-col gap-y-1 my-3 py-5 p-6 bg-white border border-gray-200 hover:bg-gray-100 text-sm text-gray-500  hover:text-gray-700"
                      role="menuitem"
                    >
                      <p className="text-black text-base">{item?.heading}</p>
                      <p className="text-xs truncate">{item?.message}</p>
                      <p className="text-xs text-end">
                        {new Date(item?.createdAt)?.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}

              {!isError &&
              !isLoading &&
              notificationData &&
              notificationData?.length < 0 ? (
                <>
                  <div className=" h-5/6 mt-3 flex flex-col gap-y-2 justify-center items-center text-blue-500">
                    <BellOff className="w-5 h-5" />
                    <div className="text-sm">No more notifications</div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </MainContent>
    </>
  );
};

export default Notification;
