import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Data from "../../contants/MOCK_DATA"
import { useState } from "react"

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
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

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
                                <td key={cell.id} className="p-2 text-left">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default TransactionTable;