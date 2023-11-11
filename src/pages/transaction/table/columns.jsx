export const columns = [
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

export default columns