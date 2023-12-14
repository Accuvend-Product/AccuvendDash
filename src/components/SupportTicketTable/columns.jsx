export const columns = [
    
    
    {
        accessorKey: "title",
        header: "Title",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: (props) => {
            const inputDate = props.getValue();
            console.log(inputDate)

            // Check if inputDate is undefined or not a valid date string
            if (!inputDate || isNaN(new Date(inputDate).getTime())) {
                return <p>Invalid Date</p>; // or handle it in a way that makes sense for your application
            }

            // Format the date
            const dateObject = new Date(inputDate);
            const options = { month: "short", day: "numeric", year: "numeric" };
            const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
                dateObject
            );

            return <p>{formattedDate}</p>;
        },
    },
   

    {
        accessorKey: "message",
        header: "Message",
        cell: (props) => <p>{
            props.getValue() }</p>,
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: (props) => {
            const status = props.getValue();
            let statusClass;

            switch (status) {
                case "OPEN":
                    statusClass =
                        "bg-green-100 text-green-800 font-bold py-2 px-3  text-xs";
                    break;
                case "CLOSED":
                    statusClass = "bg-red-100 text-red-800 font-bold py-2 px-3  text-xs";
                    break;
                case "PENDING":
                    statusClass =
                        "bg-yellow-100 text-yellow-800 font-bold py-2 px-3  text-xs";
                    break;
                default:
                    statusClass = "bg-black text-white font-bold py-2 px-3  text-xs";
            }

            return <p className={statusClass}>{status}</p>;
        },
    },
];

export default columns