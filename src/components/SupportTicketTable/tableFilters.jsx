import { useEffect, useState, useRef } from "react";

export const StatusFilter = ({ handleStatusSelect , isActive }) => {
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
            className={`rounded-full px-3.5 py-1 text-sm border transition-all border-primary ${
              show
                ? "bg-primary text-white font-semibold"
                : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
            }`}
          >
            STATUS
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
                onClick={() => handleStatusSelect("CLOSED")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100
                                            `}
              >
                Closed
              </button>
              <button
                type="button"
                onClick={() => handleStatusSelect("OPEN")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 `}
              >
                Open
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const DateFilter = ({ handleDateSelect }) => {
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
};

// export const DiscoFilter = ({ handleDiscoSelect, isPartnerAdminPage }) => {
//   const [show, setShow] = useState(false);
//   const DropDownMenuRef = useRef(null);
//   const handleClickOutside = (e) => {
//     if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
//       setShow(false);
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {!isPartnerAdminPage && (
//         <div className="relative">
//           <div className="relative inline-block" ref={DropDownMenuRef}>
//             <button
//               type="button"
//               onClick={() => setShow(true)}
//               className={`rounded-full px-3.5 py-1 text-sm border transition-all border-primary ${
//                 show
//                   ? "bg-primary text-white font-semibold"
//                   : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
//               }`}
//             >
//               DISCO
//             </button>
//             {show && (
//               <div className="absolute mt-1 py-2 bg-white border border-gray-200 rounded shadow-md z-10 h-40 overflow-y-scroll">
//                 {[
//                   { option: "ABUJA", name: "Abuja" },
//                   { option: "BENIN", name: "Benin" },
//                   { option: "EKO", name: "Eko" },
//                   { option: "ENUGU", name: "Enugu" },
//                   { option: "IBADAN", name: "Ibadan" },
//                   { option: "IKEJA", name: "Ikeja" },
//                   { option: "JOS", name: "Jos" },
//                   { option: "KADUNA", name: "Kaduna" },
//                   { option: "KANO", name: "Kano" },
//                   { option: "PORTHACOURT", name: "PortHarcourt" },
//                   { option: "YOLA", name: "Yola" },
//                 ].map((item) => (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       handleDiscoSelect(item.option);
//                       setShow(false);
//                     }}
//                     className={`block w-full text-sm text-left px-4 py-2 hover:bg-gray-100 
//                                             `}
//                   >
//                     {item.option}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
