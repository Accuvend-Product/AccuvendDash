/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Link } from "react-router-dom";

import columns from "../table/columns"
import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Search } from "lucide-react";

import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

const PartnerTransactionTable = ({ tableData }) => {
    console.log(tableData)
    const [data, setData] = useState(tableData);
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
    const [activeFilter, setActiveFilter] = useState(null);
    const dropdownRef = useRef(null);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ]);

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        // Apply the filter logic here based on the selected filter
        // For example, setFiltering(filter) or perform other filtering operations
    };

    const handleDateSelect = (ranges) => {
        setDateRange([ranges.selection]);
        setActiveFilter(null);
        console.log('Selected date range:', ranges.selection);
    };

    const handleStatusSelect = (status) => {
        setActiveFilter('STATUS');
        console.log(`Selected status: ${status}`);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActiveFilter(null);
        }
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pageIndex: currentPage - 1,
        },
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    const goToPage = (pageNumber) => {
        table.setPageIndex(pageNumber - 1); // Subtract 1 since pageIndex is zero-based
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4 items-center">
                    <p className="text-body1 font-semibold">Filter by</p>
                    <button
                        onClick={() => handleFilterClick('DISCO')}
                        className={`rounded-full px-4 py-1 border transition-all border-primary ${activeFilter === 'DISCO' ? 'bg-primary text-white font-semibold' : 'hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold'}`}
                    >
                        DISCO
                    </button>
                    <div className="relative">
                        <div className="relative inline-block" ref={dropdownRef}>
                            <button
                                onClick={() => handleFilterClick('DATE')}
                                className={`rounded-full px-4 py-1 border transition-all border-primary ${activeFilter === 'DATE' ? 'bg-primary text-white font-semibold' : 'hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold'}`}
                            >
                                DATE
                            </button>
                            {activeFilter === 'DATE' && (
                                <div className="absolute mt-10 bg-white border border-gray-200 rounded shadow-md z-10 p-4">
                                    <DateRangePicker
                                        ranges={dateRange}
                                        onChange={handleDateSelect}
                                        minDate={new Date()}
                                        editableDateInputs={true}
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative inline-block" ref={dropdownRef}>
                            <button
                                onClick={() => handleFilterClick('STATUS')}
                                className={`rounded-full px-4 py-1 border transition-all border-primary ${activeFilter === 'STATUS' ? 'bg-primary text-white font-semibold' : 'hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold'}`}
                            >
                                STATUS
                            </button>
                            {activeFilter === 'STATUS' && (
                                <div className="absolute mt-1 py-2 bg-white border border-gray-200 rounded shadow-md z-10">
                                    <button
                                        onClick={() => handleStatusSelect('Pending')}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => handleStatusSelect('Failed')}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Failed
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
                        onChange={(e) => setFiltering(e.target.value)}
                        type="text"
                        className="px-2 py-1.5 rounded-r-md bg-inherit text-body1 outline-none focus:outline-none"
                        placeholder="Search records"
                    />
                </div>
            </div>

            <table className="min-w-full border-b border-[#F8F7F7]">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-[#F8F7F7] text-body2">
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    onClick={header.column.getToggleSortingHandler()}
                                    key={header.id}
                                    className={`py-5 px-2 font-bold border-b border-[#F8F7F7] ${index === 0 ? "rounded-tl-lg" : ""
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
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr className="border-b border-[#F8F7F7]" key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className={`py-5 px-2 font-small ${cell.column.id === "status"
                                        ? "text-center"
                                        : "text-left"
                                        }`}
                                >
                                    <Link
                                        to={`/partner/transaction/details/${tableData[cell.row.index]["transaction reference"]}`}
                                    >{flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}</Link>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}

            <Pagination
                currentPage={currentPage}
                totalPages={table.getPageCount()}
                goToPage={goToPage}
                table={table}
            />
        </div>
    );
};

export default PartnerTransactionTable;

const Pagination = ({ currentPage, totalPages, goToPage, table }) => {
    const handlePrevPage = () => {
        goToPage(currentPage - 1);
    };

    const handleNextPage = () => {
        goToPage(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="flex justify-between items-center gap-5">
                <span className="mr-2">Page {currentPage} of {totalPages}</span>
                <div className="flex items-center">
                    <button
                        onClick={handlePrevPage}
                        disabled={!table.getCanPreviousPage()}
                        className={`px-1.5 py-1 rounded-l-md text-white bg-primary ${!table.getCanPreviousPage() ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={!table.getCanNextPage()}
                        className={`px-1.5 py-1 rounded-r-md text-white bg-primary ${!table.getCanNextPage() ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );

};

