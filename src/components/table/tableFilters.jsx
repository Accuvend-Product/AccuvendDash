import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { ChevronDown } from "lucide-react";
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
            <span cl>STATUS</span>
            <ChevronDown/>
          </button>
          {show && (
            <div className="absolute mt-1 py-2 bg-white border border-gray-200 rounded shadow-md z-10">
              <button
                type="button"
                onClick={() => handleStatusSelect("PENDING")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 
                                            `}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => handleStatusSelect("FAILED")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100
                                            `}
              >
                Failed
              </button>
              <button
                type="button"
                onClick={() => handleStatusSelect("COMPLETE")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 `}
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
