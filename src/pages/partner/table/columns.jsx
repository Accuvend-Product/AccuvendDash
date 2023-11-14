export const columns = [
  {
    accessorKey: "selection",
    header: "",
    cell: (props) => (
      <input
        type="checkbox"
        checked={props.row.isSelected}
        onChange={() => props.row.toggleRowSelected()}
      />
    ),
    width: 30, // Set a width for the checkbox column
  },
  {
    accessorKey: "disco",
    header: "Disco",
    cell: (props) => {
      const disco = props.getValue();
      const imageUrl = props.row.original.image;
      return (
        <div className="flex items-center">
          <img
            src={imageUrl}
            alt={`${disco} logo`}
            className="mr-2"
            style={{ width: "24px", height: "24px" }}
          />
          <p>{disco}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "meter number",
    header: "Meter Number",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "customer name",
    header: "Customer Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "transaction reference",
    header: "Transaction Reference",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "transaction date",
    header: "Transaction Date",
    cell: (props) => {
      const inputDate = props.getValue();

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
    accessorKey: "amount",
    header: "Amount",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => {
      const status = props.getValue();
      let statusClass;

      switch (status) {
        case "active":
          statusClass =
            "bg-green-100 text-green-800 font-bold py-2 px-3  text-xs";
          break;
        case "inactive":
          statusClass = "bg-red-100 text-red-800 font-bold py-2 px-3  text-xs";
          break;
        case "pending":
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