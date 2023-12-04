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

export const EventTable = ({ tableData }) => {
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

    //   format date
    const formattedDate = (inputDate) => {
        // Format the date
        const dateObject = new Date(inputDate);
        const options = { month: "short", day: "numeric", year: "numeric" };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            dateObject
        );
        return formattedDate;
    };

    // handle filter click
    const handleFilterClick = (filter) => {
        if (filter === "DATE") {
            setIsDateRangeVisible(!isDateRangeVisible);
        } else {
            // Close the date range calendar if clicking on a different filter
            setIsDateRangeVisible(false);
        }
        setActiveFilter(filter);

        console.log(activeFilter);
        console.log("filter", filter);

        // Apply the filter logic here based on the selected filter
        let newFilters = [];

        table.setColumnFilters(newFilters);

        // Reset currentPage to 1 whenever filtering is applied
        setCurrentPage(1);
    };

    const handleStatusSelect = (status) => {
        setActiveFilter("STATUS");
        setActiveStatusFilter(status);

        // Apply the filter logic here based on the selected filter
        let newFilters = [
            {
                id: "status",
                value: status,
            },
        ];

        table.setColumnFilters(newFilters);

        // Reset currentPage to 1 whenever filtering is applied
        setCurrentPage(1);
        // Optionally, you can also close the dropdown after selecting a status
        setActiveFilter(null);
    };

    // handle date select
    const handleDateSelect = (selectedDate) => {
        const formattedSelectedDate = formattedDate(selectedDate.toISOString());
        console.log("Selected Date:", selectedDate);

        console.log(formattedSelectedDate);

        setIsDateRangeVisible(false);

        const newFilters = [
            {
                id: "transaction date",
                value: formattedSelectedDate,
                operator: "before"
            },
        ];

        table.setColumnFilters(newFilters);

        // Reset currentPage to 1 whenever filtering is applied
        setCurrentPage(1);
    };

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
            <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4 items-center">
                    <div className="relative">
                        <div className="relative inline-block">
                            <button
                                type="button"
                                onClick={() => handleFilterClick("DATE")}
                                className={`rounded-full px-3.5 py-1 text-sm border transition-all border-primary ${activeFilter === "DATE"
                                        ? "bg-primary text-white font-semibold"
                                        : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
                                    }`}
                            >
                                DATE
                            </button>
                            {isDateRangeVisible && (
                                <div className="absolute mt-10 bg-white border border-gray-200 rounded shadow-md z-10 p-4">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                    />
                                    <button
                                        className="mt-6 px-4 py-1 border border-primary rounded-full bg-primary text-white font-semibold"
                                        onClick={() => {
                                            setIsDateRangeVisible(false);
                                            handleDateSelect(selectedDate);
                                        }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>

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
            <div>
            {table.getRowModel().rows.map((row) => (
                <div className="my-5 py-5 border-b-2" key={row.id}>
                    {row.getVisibleCells().map((cell) => cell.column.id !== 'events' &&  (

                        <div  className={`flex gap-x-2 ${cell.column.id === "customer name" ? "": "text-sm"}`} key ={cell.id}>
                            <span className={`${cell.column.id === "customer name" ? "hidden": ""}`}>{cell.column.columnDef.header} - </span> <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                        </div>
                    ))}

                    {row.getVisibleCells().map((cell) => cell.column.id === 'events' &&  (
                        <div className="mt-7">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    ))}

                </div>
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
