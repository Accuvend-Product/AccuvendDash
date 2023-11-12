/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import Data from "../table/data"
import columns from "../table/columns"
import { useState } from "react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Search } from "lucide-react";

const TransactionTable = ({ tableData, colums }) => {
    const [data, setData] = useState(Data);
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

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
    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4 items-center">
                    <p className="text-body1 font-semibold">Filter by</p>
                    <button className="rounded-full px-4 py-1 border transition-all border-primary bg-primary text-white hover:bg-white hover:text-body2 font-semibold">PARTNER</button>
                    <button className="rounded-full px-4 py-1 border transition-all border-primary hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold">DATE</button>
                    <button className="rounded-full px-4 py-1 border transition-all border-primary hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold">AMOUNT</button>
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
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="bg-[#F8F7F7] text-body2">
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    onClick={header.column.getToggleSortingHandler()}
                                    key={header.id}
                                    className={`py-5 px-2 font-bold border-b border-[#F8F7F7] ${index === 0 ? 'rounded-tl-lg' : ''} ${index === headerGroup.headers.length - 1 ? 'rounded-tr-lg' : ''} text-left`}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {
                                        {
                                            asc: <ArrowUp className="inline-flex w-4 h-4 ml-1 items-center" />,
                                            desc: <ArrowDown className="inline-flex w-4 h-4 ml-1 items-center" />,
                                        }[header.column.getIsSorted() ?? null]
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-b border-[#F8F7F7]">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={`py-5 px-2 ${cell.column.id === 'status' ? 'text-center' : 'text-left'}`}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

export default TransactionTable;

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

