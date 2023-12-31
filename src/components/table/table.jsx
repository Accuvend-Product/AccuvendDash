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
import { Link, useNavigate } from "react-router-dom";

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
import { DateFilter , StatusFilter , DiscoFilter } from "./tableFilters";
import { convertToISOWithLastMinute, convertToISOWithMidnight, convertToISOWithNextDay, convertToISOWithPreviousDay } from "../../lib/utils";

export const TransactionTable = ({ tableData , isPartnerAdminPage , isPartnerTable = false , setFilter = (item) => null , setPagination = () => null , pagination = {} , filter ={} }) => {
    const [data, setData] = useState(tableData);
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [activeFilter, setActiveFilter] = useState(null);
    

    // const [activeStatusFilter, setActiveStatusFilter] = useState(null);
    // const [activeDiscoFilter, setActiveDiscoFilter] = useState(null);
    const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);

    // const dropdownRefStatus = useRef(null);
    // const dropdownRefDisco = useRef(null);
    const navigate = useNavigate()



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
        setFilter({
            ...filter,
            status
        })
        //setActiveStatusFilter(status);

        // Apply the filter logic here based on the selected filter
        // let newFilters = [
        //     {
        //         id: "status",
        //         value: status,
        //     },
        // ];

        

        //removed to enable api filtering
        // table.setColumnFilters(newFilters);

        // // Reset currentPage to 1 whenever filtering is applied
        // setCurrentPage(1);
        // Optionally, you can also close the dropdown after selecting a status
        setActiveFilter(null);
    };

    const handleDiscoSelect = (disco) => {
        setActiveFilter("DISCO");
        setFilter({
            ...filter,
            disco
        })
        // setActiveDiscoFilter(disco)

        // Apply the filter logic here based on the selected filter
        // let newFilters = [
        //     {
        //         id: "disco",
        //         value: disco,
        //     },
        // ];

        //removed to enable api filtering
        // table.setColumnFilters(newFilters);

        // // Reset currentPage to 1 whenever filtering is applied
        // setCurrentPage(1);
        // Optionally, you can also close the dropdown after selecting a status
        setActiveFilter(null);
    };

    // handle date select
    const handleDateSelect = (_selectedDate) => {
        
        console.log("Selected Date:", _selectedDate);

        // setSelectedDate(_selectedDate)

        setFilter({
            ...filter,
            startDate: new Date(_selectedDate).toISOString().split('T')[0] ,
            endDate: convertToISOWithNextDay(_selectedDate).split('T')[0],
        })

        // console.log(formattedSelectedDate);

        // setIsDateRangeVisible(false);

        // const newFilters = [
        //     {
        //         id: "transaction date",
        //         value: formattedSelectedDate,
        //         operator: "before"
        //     },
        // ];

        //removed to enable api filtering
        // table.setColumnFilters(newFilters);

        // // Reset currentPage to 1 whenever filtering is applied
        // setCurrentPage(1);
        setActiveFilter(null);
    };

    //  handle click outside
    


    

    const goToPage = (pageNumber) => {
        table.setPageIndex(pageNumber - 1); // Subtract 1 since pageIndex is zero-based
        setCurrentPage(pageNumber);
    };

    

   

    return (
        <div className="">
            <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4 items-center">
                    <p className="text-body1 font-semibold">Filter by</p>
                    <DiscoFilter isActive={filter?.disco} handleDiscoSelect={handleDiscoSelect}/>
                    <DateFilter handleDateSelect={handleDateSelect} isActive={(filter?.startDate || filter?.endDate)}/>
                    <StatusFilter isActive={filter?.status} handleStatusSelect={handleStatusSelect}/>
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

            {/* Active Filters Tags */}
            {(filter?.disco || filter?.startDate || filter?.endDate || filter?.status)&& <div className="flex mb-4 gap-3">
                <span>Active Filters</span>
                {filter?.disco && <span id="badge-dismiss-dark" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Disco - {filter?.disco}
                    <button onClick={() =>{
                        const _filter = {...filter} 
                        delete _filter?.disco
                        setFilter(_filter)
                    }} type="button" class="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                    <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Remove badge</span>
                    </button>
                </span>}
                { (filter?.startDate || filter?.endDate) && <span id="badge-dismiss-dark" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Date - {formattedDate(new Date(filter?.startDate).toISOString())}
                    <button onClick={() => {
                        const _filter = {...filter} 
                        delete _filter?.startDate
                        delete _filter?.endDate
                        setFilter(_filter)
                    }} type="button" class="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                    <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Remove badge</span>
                    </button>
                </span>}
                {filter?.status && <span id="badge-dismiss-dark" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Status - {filter?.status}
                    <button onClick={() => {
                        const _filter = {...filter} 
                        delete _filter?.status
                        setFilter(_filter)
                    }} type="button" class="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                    <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Remove badge</span>
                    </button>
                </span>}
            </div>}
            
            <div className="min-h-[40vh]">
                <table className="min-w-full border-b border-[#F8F7F7]">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-[#F8F7F7] text-body2">
                                {headerGroup.headers.map((header, index) => {
                                    if(!isPartnerTable && header.column.id === "bank reference"){
                                        return 
                                    }
                                    if(isPartnerTable && header.column.id === "transaction reference"){
                                        return 
                                    }

                                    return (
                                    <th
                                        onClick={header.column.getToggleSortingHandler()}
                                        key={header.id}
                                        className={`py-3 px-2 font-bold border-b border-[#F8F7F7] ${index === 0 ? "rounded-tl-lg" : ""
                                            } ${index === headerGroup.headers.length - 1
                                                ? "rounded-tr-lg"
                                                : ""
                                            } text-left`}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {
                                            {
                                                asc: (
                                                    <ArrowUp className="inline-flex w-4 h-4 ml-1 items-center" />
                                                ),
                                                desc: (
                                                    <ArrowDown className="inline-flex w-4 h-4 ml-1 items-center" />
                                                ),
                                            }[header.column.getIsSorted() ?? null]
                                        }
                                    </th>
                                )})}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                className={`border-b border-[#F8F7F7] hover:bg-blue-50 hover:cursor-pointer hover:text-blue-800 hover:underline`}
                                key={row.id}
                                onClick={()=> navigate(`/transaction/details/${tableData[row.index]["transaction reference"]}`)}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    if(!isPartnerTable && cell.column.id === "bank reference"){
                                        return 
                                    }
                                    if(isPartnerTable && cell.column.id === "transaction reference"){
                                        return 
                                    }

                                    return(
                                        <td
                                            key={cell.id}
                                            className={`py-1 px-2 text-sm ${cell.column.id === "status" ? "text-center" : "text-left"
                                                }`}
                                        >
                                            <Link
                                                to={`/transaction/details/${tableData[cell.row.index]["transaction reference"]}`}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Link>
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
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
