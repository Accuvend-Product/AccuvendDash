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
import Replay from "../icons/Replay";
import { ADMIN_ROUTE, PARTNERS_ROUTE, TRANSACTION_ROUTE } from "../../Routes";

export const AdminPartnerTable  = ({ tableData }) => {
    const [data, setData] = useState(tableData);
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [activeFilter, setActiveFilter] = useState("DISCO");
    const [activeStatusFilter, setActiveStatusFilter] = useState(null);
    const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dropdownRef = useRef(null);

    const pageSize = 8;

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
            <div className="flex items-center justify-end mb-4">
                

                {/* seach area */}
                <div className="flex items-center bg-[#F7F7F7] p-1 rounded-[8px]">
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
            <div className="grid grid-cols-3 gap-4">
            {table.getRowModel().rows.map((row) => (
                <a href={`${ADMIN_ROUTE}${PARTNERS_ROUTE}/${'ssssss'}${TRANSACTION_ROUTE}`} className=" block px-3 py-5 bg-white border border-gray-200 rounded-lg shadow" key={row.id}> 
                
                    {row.getVisibleCells().map((cell) => cell.column.id === 'partnerImage'   &&  (

                        <div  className={`flex justify-between text-sm items-center`} key ={cell.id}>
                           <span className="block w-9 h-9">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                           <span>Overview</span>
                        </div>
                    ))}

                    <div className="mt-4 flex flex-col gap-y-3">
                    {row.getVisibleCells().map((cell) => cell.column.id !== 'partnerImage' && cell.column.id !== 'partnerId' &&  (
                        <div key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    ))}
                    </div>
                   

                </a>
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
                        className={`px-1.5 py-1 rounded-l-md text-white bg-primary ${!table.getCanPreviousPage() ? "cursor-not-allowed opacity-50" : ""
                            }`}
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={!table.getCanNextPage()}
                        className={`px-1.5 py-1 rounded-r-md text-white bg-primary ${!table.getCanNextPage() ? "cursor-not-allowed opacity-50" : ""
                            }`}
                    >
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};
