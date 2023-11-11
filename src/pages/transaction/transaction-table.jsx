/* eslint-disable react/prop-types */
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import Data from "../../contants/MOCK_DATA"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react";

const columns = [
    {
        accessorKey: 'partner',
        header: 'Partner',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'meter number',
        header: 'Meter Number',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'customer name',
        header: 'Customer Name',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'transaction reference',
        header: 'Transaction Reference',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'transaction date',
        header: 'Transaction Date',
        cell: (props) => {
            const inputDate = props.getValue();
            const dateObject = new Date(inputDate);
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObject);
            return <p>{formattedDate}</p>;
        }
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: (props) => <p>{props.getValue()}</p>
    },
];

const TransactionTable = () => {
    const [data, setData] = useState(Data);
    const [currentPage, setCurrentPage] = useState(1);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pageIndex: currentPage - 1,
        }
    });

    const goToPage = (pageNumber) => {
        table.setPageIndex(pageNumber - 1); // Subtract 1 since pageIndex is zero-based
        setCurrentPage(pageNumber);
    };
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-b border-[#F8F7F7]">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="bg-[#F8F7F7] text-body2">
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    key={header.id}
                                    className={`p-2 font-bold border-b border-[#F8F7F7] ${index === 0 ? 'rounded-tl-lg' : ''} ${index === headerGroup.headers.length - 1 ? 'rounded-tr-lg' : ''} text-left`}
                                >
                                    {flexRender(header.column.columnDef.header)}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-b border-[#F8F7F7]">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="py-5 px-2 text-left">
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

