import TokenGenerated from "../icons/token-generated";
import MeterValidated from "../icons/meter-validated";
import Replay from "../icons/replay";
import DiscoUp from "../icons/Disco-up";
import PaymentConfirmed from "../icons/payment-confirmed";
import { Check, PlayCircle } from "lucide-react";
import * as EventConstant from "./constants";
import { getDateTimeString } from "../../lib/utils";
export const columns = [
  {
    accessorKey: "masterProductCode",
    header: "Product Code",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "category",
    header: "Product Category",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "type",
    header: "Product Type",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "productName",
    header: "Product Biller",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created Date",
  //   cell: (props) => {
  //     const inputDate = props.getValue();

  //     // Check if inputDate is undefined or not a valid date string
  //     if (!inputDate || isNaN(new Date(inputDate).getTime())) {
  //       return <p>Invalid Date</p>; // or handle it in a way that makes sense for your application
  //     }

  //     // Format the date
  //     const dateObject = new Date(inputDate);
  //     const options = {
  //       month: "short",
  //       day: "numeric",
  //       year: "numeric",
  //       hour: "numeric",
  //       minute: "numeric",
  //       second: "numeric",
  //     };
  //     const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
  //       dateObject
  //     );

  //     return <p>{formattedDate}</p>;
  //   },
  // },
];

export default columns;
