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
    accessorKey: "customer name",
    header: "Customer",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "customer phone",
    header: "Phone Number",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "customer email",
    header: "Email",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "meter number",
    header: "Meter",
    cell: (props) => <p>{props.getValue()}</p>,
  },

  {
    accessorKey: "transaction reference",
    header: "Disco Reference",
    cell: (props) => <p> {props.getValue()}</p>,
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
];

export default columns;
