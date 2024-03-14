import { useGetBillerImage, useGetProducts } from "../../api/getProducts";
import { getBillerImage } from "../../lib/utils";
import { getStatusClass } from "../OrderConfirmation/commons";

export const columns = [
  {
    accessorKey: "partnerName",
    header: "Partner",
    cell: (props) => <p>{props.getValue()}</p>
  },

  {
    accessorKey: "biller",
    header: "Biller",
    cell: (props) => {
      const billerCode = props.getValue();
      const biller_image = useGetBillerImage(billerCode)
      return (
        <div className="flex items-center py-0.5">
          <img
            src={biller_image[0]}
            alt={`${biller_image[1]} logo`}
            className="mr-2 h-9 w-9 object-contain"
          />
          <p className=" capitalize">{biller_image[1]?.toLowerCase()}</p>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "meter number",
  //   header: "Meter",
  //   cell: (props) => <p>{props.getValue()}</p>,
  // },
  {
    accessorKey: "meter number",
    header: "Utility Number",
    cell: (props) => {
      const original_row = props.row.original
      if(original_row?.productType === "AIRTIME" ||original_row?.productType === "DATA"  ) return <p>{original_row["user number"]}</p>
      else return <p>{original_row["meter number"]}</p>
    },
  },
  {
    accessorKey: "productType",
    header: "Utility Type",
    cell: (props) => <p>{props.getValue()}</p>,
  },

  // {
  //   accessorKey: "customer name",
  //   header: "Customer",
  //   cell: (props) => <p>{props.getValue()}</p>,
  // },
  {
    accessorKey: "bank reference",
    header: "Bank Reference",
    cell: (props) => (
      <p>{props.getValue() || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxx"}</p>
    ),
  },
  {
    accessorKey: "transaction reference",
    header: "Disco Reference",
    cell: (props) => (
      <p>{props.getValue() || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxx"}</p>
    ),
  },
  {
    accessorKey: "transaction date",
    header: "Date",
    cell: (props) => {
      const inputDate = props.getValue();

      // Check if inputDate is undefined or not a valid date string
      if (!inputDate || isNaN(new Date(inputDate).getTime())) {
        return <p>Invalid Date</p>; // or handle it in a way that makes sense for your application
      }

      // Format the date
      const dateObject = new Date(inputDate);
      const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        dateObject
      );

      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (props) => (
      <p>₦{Number(props.getValue().slice(1)).toLocaleString()}</p>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => {
      const status = props.getValue();
      let statusClass = getStatusClass(status)
      
      return <p className={statusClass}>{status}</p>;
    },
  },
];

export default columns;
