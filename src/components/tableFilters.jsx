import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { useQuery } from "@tanstack/react-query";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useGetProducts } from "../api/getProducts";
const BASE_URL = import.meta.env.VITE_BASE_URL

// import Datepicker from 'flowbite-datepicker/Datepicker';
export const StatusFilter = ({ handleStatusSelect, isActive = false }) => {
  const [show, setShow] = useState(false);
  const DropDownMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
      setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative">
        <div className="relative inline-block" ref={DropDownMenuRef}>
          <button
            type="button"
            onClick={() => setShow(true)}
            className={`rounded-full px-3.5 py-1 text-sm border transition-all flex items-center justify-center border-primary ${
              show || isActive
                ? "bg-primary text-white font-semibold"
                : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
            }`}
          >
            <span>STATUS</span>
            <ChevronDown/>
          </button>
          {show && (
            <div className="absolute mt-1 py-2 bg-white border border-gray-200 rounded shadow-md z-10">
              <button
                type="button"
                onClick={() => handleStatusSelect("PENDING")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => handleStatusSelect("FAILED")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100`}
              >
                Failed
              </button>
              <button
                type="button"
                onClick={() => handleStatusSelect("COMPLETE")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100`}
              >
                Completed
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const DateFilter = ({ handleDateSelect, isActive = false }) => {
  const [show, setShow] = useState(false);
  const DropDownMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
      setShow(false);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    // if(!datePickerRef.current && datePickerEl.current){
    //   datePickerRef.current = new Datepicker(datepickerEl.current, {
    //     // options
    // });
    // }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative">
        <div className="relative inline-block" ref={DropDownMenuRef}>
          <button
            type="button"
            onClick={() => setShow(true)}
            className={`rounded-full px-3.5 py-1 text-sm border transition-all flex items-center justify-center border-primary ${
              isActive
                ? "bg-primary text-white font-semibold"
                : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
            }`}
          >
            <span className="mr-3">DATE</span>
            <ChevronDown/>

          </button>
          {show && (
            <div className="absolute mt-10 bg-white border border-gray-200 rounded shadow-md z-10 p-4">
              
              <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker onChange={(date) => {
                    const _date = date.toDate()
                    console.log(_date)
                    setSelectedDate(_date)
                  }} onAccept={() =>{
                    setShow(false)
                    handleDateSelect(selectedDate);
                  }} defaultValue={dayjs()} orientation="portrait" />
              </LocalizationProvider>
              </div>
              {/* <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
              <button
                className="mt-6 px-4 py-1 border border-primary rounded-full bg-primary text-white font-semibold"
                onClick={() => {
                  setShow(false)
                  handleDateSelect(selectedDate);
                }}
              >
                Apply
              </button> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const DiscoFilter = ({
  handleDiscoSelect,
  isPartnerAdminPage,
  isActive = false,
}) => {
  const [show, setShow] = useState(false);
  const DropDownMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
      setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {!isPartnerAdminPage && (
        <div className="relative">
          <div className="relative inline-block" ref={DropDownMenuRef}>
            <button
              type="button"
              onClick={() => setShow(true)}
              className={`rounded-full px-3.5 py-1 text-sm border transition-all flex items-center justify-center border-primary ${
                show || isActive
                  ? "bg-primary text-white font-semibold"
                  : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
              }`}
            >
             <span className="mr-3">DISCO</span>
             <ChevronDown/>
            </button>
            {show && (
              <div className="absolute mt-1 py-2 bg-white border border-gray-200 rounded shadow-md z-10 h-40 overflow-y-scroll">
                {[
                  { option: "ABUJA", name: "Abuja" },
                  { option: "BENIN", name: "Benin" },
                  { option: "EKO", name: "Eko" },
                  { option: "ENUGU", name: "Enugu" },
                  { option: "IBADAN", name: "Ibadan" },
                  { option: "IKEJA", name: "Ikeja" },
                  { option: "JOS", name: "Jos" },
                  { option: "KADUNA", name: "Kaduna" },
                  { option: "KANO", name: "Kano" },
                  { option: "PORTHACOURT", name: "PortHarcourt" },
                  { option: "YOLA", name: "Yola" },
                ].map((item) => (
                  <button
                    type="button"
                    onClick={() => {
                      handleDiscoSelect(item.option);
                      setShow(false);
                    }}
                    className={`block w-full text-sm text-left px-4 py-2 hover:bg-gray-100 
                                            `}
                  >
                    {item.option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const BillerFilter = ({
  handleDiscoSelect,
  isPartnerAdminPage,
  isActive = false,
}) => {
  const [show, setShow] = useState(false);
  const DropDownMenuRef = useRef(null);
  const {data , isError , isLoading} = useGetProducts()
  const handleClickOutside = (e) => {
    if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
      setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {!isPartnerAdminPage && (
        <div className="relative">
          <div className="relative inline-block" ref={DropDownMenuRef}>
            <button
              type="button"
              onClick={() => setShow(true)}
              className={`rounded-full px-3.5 py-1 text-sm border transition-all flex items-center justify-center border-primary ${
                show || isActive
                  ? "bg-primary text-white font-semibold"
                  : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
              }`}
            >
             <span className="mr-3">BILLER</span>
             <ChevronDown/>
            </button>
            {show && (
              <div className="absolute min-w-max mt-1 py-2 bg-white border border-gray-200 rounded shadow-md z-10 h-40 overflow-y-scroll">
                {data?.data?.data?.products.map((item) => (item?.category === "ELECTRICITY" ? <button
                    type="button"
                    onClick={() => {
                      handleDiscoSelect(item?.masterProductCode);
                      setShow(false);
                    }}
                    className={`block w-full text-sm text-left px-4 py-2 hover:bg-gray-100`}
                  >
                    {item?.productName} {item?.type ? `- ${item?.type}` : ''}
                  </button> : <button
                  type="button"
                  onClick={() => {
                    handleDiscoSelect(item?.masterProductCode);
                    setShow(false);
                  }}
                  className={`block w-full text-sm text-left px-4 py-2 hover:bg-gray-100`}
                >
                  {item?.productName} - {item?.category}
                </button> 
                )) }
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};


export const PartnerFilter = ({handlePartnerSelect, isCustomer, isActive = false}) => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}partner/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // return response

        return response?.data?.data?.partners?.map((item) => {
          const itemStats = response?.data?.data?.stats?.filter(
            (search) => search.id === item.id
          )[0];
          return {
            partnerImage: item?.entity?.profilePicture,
            companyName: item?.companyName,
            companyAddress:
              item?.address && item?.address !== null ? item?.address : "-",
            partnerId: item?.id,
            email: item?.entity?.email,
            activatedStatus: item?.entity?.status?.activated,
            failedTransaction: itemStats?.failed_Transactions,
            PendingTranscations: itemStats?.pending_Transactions,
            SuccessfulTransaction: itemStats?.success_Transactions,
          };
        });
      } catch (err) {
        throw err;
      }
    },
  });

  const [show, setShow] = useState(false);
  const DropDownMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
      setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative">
        <div className="relative inline-block" ref={DropDownMenuRef}>
          <button
            type="button"
            onClick={() => setShow(true)}
            className={`rounded-full px-3.5 py-1 text-sm border transition-all flex items-center justify-center border-primary ${
              show || isActive
                ? "bg-primary text-white font-semibold"
                : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
            }`}
          >
            <span>{isCustomer ? "Medium" : "PARTNER"}</span>
            <ChevronDown/>
          </button>
          {show && (
            <div className="absolute mt-1 py-2 bg-white border border-gray-200 rounded shadow-md z-10">
             { data?.map(ele => <button
                type="button"
                onClick={() => handlePartnerSelect({
                  companyName : ele?.companyName,
                  partnerId: ele?.partnerId,
                })}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100`}
              >
                {ele?.companyName}
              </button>)}
            </div>
          )}
        </div>
      </div>
    </>
  )

}
