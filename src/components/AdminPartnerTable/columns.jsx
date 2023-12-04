import TokenGenerated from "../icons/token-generated";
import MeterValidated from "../icons/meter-validated";
import DiscoUp from "../icons/Disco-up";
import PaymentConfirmed from "../icons/payment-confirmed";
import { Check, CreditCard, Hash, PlayCircle } from "lucide-react";
import Replay from "../icons/Replay";
export const columns = [
  {
    accessorKey: "partnerImage",
    header: "Partner",
    cell: (props) => {
      const imageUrl = props.getValue();
      return (
        <div className="flex items-center w-full h-full p-1">
          <img
            src={imageUrl}
            // alt={`${disco} logo`}
            className="w-full h-full object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "failedTransaction",
    header: "Failed Transaction",
    cell: (props) => {
      
      return (
        <div
          className={`flex justify-between text-sm items-center py-3 px-3 bg-red-100 rounded-sm`}
        >
          <div className="flex gap-x-2 items-center">
            <div className="w-6 h-6 p-1 border-red-500 rounded-sm border-2 ">
              <Replay className="w-full h-full text-red-500" />
            </div>
            
            <span className={`text-sm`} > {props.column.columnDef.header} </span>
          </div>
          <span>{props.getValue()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "NumberOfTranscations",
    header: "Number Of Transcation",
    cell: (props) => {
      
      return (
        <div
          className={`flex justify-between text-sm items-center py-3 px-3 bg-green-100 rounded-sm`}
        >
          <div className="flex gap-x-2 items-center">
            <div className="w-6 h-6 p-1 border-green-500 rounded-sm border-2 ">
              <Hash className="w-full h-full text-green-500"/>
            </div>
            
            <span className={`text-sm`} > {props.column.columnDef.header} </span>
          </div>
          <span>{props.getValue()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "VendedTransaction",
    header: "Vended Transaction",
    cell: (props) => {
      
      return (
        <div
          className={`flex justify-between text-sm items-center py-3 px-3 bg-green-100 rounded-sm`}
        >
          <div className="flex gap-x-2 items-center">
            <div className="w-6 h-6 p-1 border-green-500 rounded-sm border-2 ">
              <CreditCard className="w-full h-full text-green-500" />
            </div>
            
            <span className={`text-sm`} > {props.column.columnDef.header} </span>
          </div>
          <span>{props.getValue()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "partnerId",
    header: "Partner Id",
    cell: (props) => props.getValue(),
  },
];

export default columns;
