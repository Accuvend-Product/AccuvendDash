/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

import columns from "./columns";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Search,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { add, addDays } from "date-fns";

import { ADMIN_ROUTE, PARTNERS_ROUTE, TRANSACTION_ROUTE } from "../../Routes";

import { toast } from "react-hot-toast";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import MainContent from "../../components/MainContent";
import { Trash } from "lucide-react";
import { useModal } from "../../hooks/useModal";

const AdminTileDropDown = ({ partnerData, setShowDetails ,showDetails  }) => {
  const [show, setShow] = useState(false);
  const DropDownMenuRef = useRef(null);
  const [buttonRequest, setButtonRequest] = useState("activate");
  const [activatePartnerIsLoading, setactivatePartnerIsLoading] =
    useState(false);
  //   const [deactivatePartnerIsLoading, setdeactivatePartnerIsLoading] = useState(false);
  const handleClickOutside = (e) => {
    if (DropDownMenuRef.current && !DropDownMenuRef.current.contains(e.target))
      setShow(false);
  };

  const { ModalProvider, openModal, closeModal } = useModal(
    `${
      buttonRequest.charAt(0).toUpperCase() + buttonRequest.slice(1)
    } Partner Confirmation`,
    () => null,
    () => {
      // setDeleteEmail(null);
    }
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleActivatePartner = async (email) => {
    setactivatePartnerIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/activate`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      //   console.log("Invitation response:", response);
      toast.success("Partner activated Successfully ");
    } catch (error) {
      //   console.error("Error sending invitation:", error);
      toast.error("Partner Couldn't be activated");
    } finally {
      closeModal();
      setactivatePartnerIsLoading(false);
    }
    setactivatePartnerIsLoading(false);
  };

  const handleDeactivatePartner = async (email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/deactivate`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Partner deactivated Successfully ");
    } catch (error) {
      toast.error("Partner Couldn't be deactivated");
    } finally {
      closeModal();
      setactivatePartnerIsLoading(false);
    }
    setactivatePartnerIsLoading(false);
  };
  return (
    <>
      <ModalProvider>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-11 h-11 d"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-base font-bold text-gray-900 ">
            Are you sure you want to {buttonRequest} this Partner? This action
            is reversible the partner's access to portals and APIs will be{" "}
            {buttonRequest === "activate" ? "enabled" : "disabled"}. Please
            confirm your decision.
          </h3>
          <button
            onClick={() =>
              buttonRequest === "deactivate"
                ? handleDeactivatePartner(partnerData?.email)
                : handleActivatePartner(partnerData?.email)
            }
            disabled={activatePartnerIsLoading}
            data-modal-hide="popup-modal"
            type="button"
            className={`text-white ${
              buttonRequest === "activate"
                ? "bg-green-600 hover:bg-green-800  focus:ring-green-300"
                : "bg-red-600 hover:bg-red-800  focus:ring-red-300"
            }  focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2`}
          >
            {!activatePartnerIsLoading ? (
              "Yes, I'm sure"
            ) : (
              <>
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
              </>
            )}
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            onClick={() => {
              closeModal();
            }}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  "
          >
            No, cancel
          </button>
        </div>
      </ModalProvider>

      <div className="relative" ref={DropDownMenuRef}>
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  focus:ring-gray-50   "
          type="button"
          onClick={() => setShow((prevState) => !prevState)}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>

        {/* <!-- Dropdown menu --> */}
        {show && (
          <div
            id="dropdownDots"
            className="z-10 absolute end-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44  "
          >
            <ul
              className="py-2 text-sm text-gray-700 "
              aria-labelledby="dropdownMenuIconButton"
            >
              <li>
                <button
                  href="#"
                  onClick={() => {
                    setButtonRequest("activate");
                    openModal();
                  }}
                  className="block px-4 py-2 text-teal-700 text-left w-full hover:bg-gray-100  "
                >
                  Activate
                </button>
              </li>
              <li>
                <button
                  href="#"
                  onClick={() => {
                    setButtonRequest("deactivate");
                    openModal();
                  }}
                  className="block px-4 py-2 text-left text-red-700 w-full hover:bg-gray-100  "
                >
                  Deactivate
                </button>
              </li>
            </ul>
            <div className="py-2">
                <button
                  href="#"
                  onClick={() => {
                    setShowDetails((prevState) => !prevState)
                  }}
                  className="block px-4 py-2 text-black text-left w-full hover:bg-gray-100  "
                >
                  {showDetails ? 'Hide': 'Show'} Partner Info
                </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Admin Table RowComponent

const AdminRow = ({ row, tableData }) => {
  const [showDetails ,setShowDetails] = useState(false)

  return (
    <span
      className=" block px-3 py-5 bg-white border border-gray-200 rounded-lg shadow"
      key={row.id}
    >
      <div className={`flex justify-between text-sm items-center`}>
        <div className="flex items-center gap-x-2">
          {row
            .getVisibleCells()
            .map(
              (cell) =>
                cell.column.id === "partnerImage" && (
                  <span className="block w-9 h-9">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                )
            )}

          <div>
            {row
              .getVisibleCells()
              .map(
                (cell) =>
                  cell.column.id === "companyName" && (
                    <span className="text-bold">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  )
              )}
          </div>
          <div>
            <span
              className={`${
                tableData[row.index]?.activatedStatus === true
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }  text-xs font-medium me-2 px-2.5 py-0.5 rounded-full `}
            >
              {tableData[row.index]["activatedStatus"] === true
                ? "Activated"
                : "Deactivated"}
            </span>
          </div>
        </div>
        <span>
          <AdminTileDropDown setShowDetails={setShowDetails} showDetails={showDetails} partnerData={tableData[row.index]} />
        </span>
      </div>

     {showDetails && <div>
      {row
          .getVisibleCells()
          .map(
            (cell) =>
              (cell.column.id === "email" ||
                cell.column.id === "companyAddress" ||
                cell.column.id === "companyName") && (
                <div key={cell.id}>
                  <span className="font-bold">{cell.column.columnDef.header}:</span> {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              )
          )}
      </div>}

      <div className="mt-4 flex flex-col gap-y-3">
        {row
          .getVisibleCells()
          .map(
            (cell) =>
              (cell.column.id === "PendingTranscations" ||
                cell.column.id === "SuccessfulTransaction" ||
                cell.column.id === "failedTransaction") && (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              )
          )}
      </div>
      <div>
        <a
          className="inline-flex justify-end mt-3 items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={`${ADMIN_ROUTE}${PARTNERS_ROUTE}/${
            tableData[row.index]["partnerId"]
          }${TRANSACTION_ROUTE}`}
        >
          View Transactions
          <svg
            className="w-4 h-4 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </span>
  );
};

export const AdminPartnerTable = ({ tableData, flexLeft = <></> }) => {
  const [data, setData] = useState(tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [activeFilter, setActiveFilter] = useState("DISCO");
  const [activeStatusFilter, setActiveStatusFilter] = useState(null);
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dropdownRef = useRef(null);

  const pageSize = 9;

  //   table initial state
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // initial items per page
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
      pageIndex: currentPage - 1,
    },

    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  //  handle click outside
  const handleClickOutside = (event) => {
    if (
      isDateRangeVisible &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.classList.contains("rdrDateRangeWrapper")
    ) {
      setIsDateRangeVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveFilter(null);
    }
  };

  const goToPage = (pageNumber) => {
    table.setPageIndex(pageNumber - 1); // Subtract 1 since pageIndex is zero-based
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="flex md:flex-row flex-col gap-y-3 items-end md:items-center justify-between self-end mb-4">
        <div>{flexLeft}</div>

        {/* seach area */}
        <div className="flex w-full md:w-auto items-center bg-[#F7F7F7] p-1 rounded-[8px]">
          <button className="p-2 rounded-l-md">
            <Search className="w-4 h-4 text-body1" />
          </button>
          <input
            value={filtering}
            onChange={(e) => {
              setFiltering(e.target.value);
              setCurrentPage(1);
            }}
            type="text"
            className="px-2 py-1.5 rounded-r-md bg-inherit text-body1 outline-none focus:outline-none"
            placeholder="Search records"
          />
        </div>
      </div>
      {/* card container */}
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {table.getRowModel().rows.map((row) => (
          <AdminRow tableData={tableData} row={row} />
        ))}
      </div>

      {/* Display "No data to show" message when table is empty */}
      {table.getRowModel().rows.length === 0 && (
        <div className="text-center mt-4">No data to show</div>
      )}

      {/* Pagination */}
      {table.getRowModel().rows.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={table.getPageCount()}
          goToPage={goToPage}
          table={table}
        />
      )}
    </div>
  );
};



// export default TransactionTable;

export const Pagination = ({ currentPage, totalPages, goToPage, table }) => {
  const handlePrevPage = () => {
    goToPage(currentPage - 1);
  };

  const handleNextPage = () => {
    goToPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex justify-between items-center gap-5">
        <span className="mr-2">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            disabled={!table.getCanPreviousPage()}
            className={`px-1.5 py-1 rounded-l-md text-white bg-primary ${
              !table.getCanPreviousPage() ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleNextPage}
            disabled={!table.getCanNextPage()}
            className={`px-1.5 py-1 rounded-r-md text-white bg-primary ${
              !table.getCanNextPage() ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
