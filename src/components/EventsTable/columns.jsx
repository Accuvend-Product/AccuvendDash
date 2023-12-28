import TokenGenerated from "../icons/token-generated";
import MeterValidated from "../icons/meter-validated";
import Replay from "../icons/replay";
import DiscoUp from "../icons/Disco-up";
import PaymentConfirmed from '../icons/payment-confirmed'
import { Check, PlayCircle } from "lucide-react";
import { METER_VALIDATION_SENT_PARTNER , TOKEN_SENT_TO_PARTNER , TOKEN_RECIEVED_FROM_VENDOR,  VEND_ELECTRICITY_REQUESTED_FROM_VENDOR,  POWER_PURCHASE_INITIATED_BY_CUSTOMER } from "./constants";
export const columns = [
  
  {
    accessorKey: "events",
    header: "Events",
    cell: (props) => {
      const events = props.getValue();
      const ListOfEvents = [
        {title: "Meter Validated", eventType: METER_VALIDATION_SENT_PARTNER},
        {title: "Disco up", eventType: POWER_PURCHASE_INITIATED_BY_CUSTOMER},
        {title:"Payment Confirmed", eventType: VEND_ELECTRICITY_REQUESTED_FROM_VENDOR},
        {title:"Token Generated", eventType:TOKEN_RECIEVED_FROM_VENDOR  , eventType2 : "TOKEN_SENT" },
        {title:"Token Sent", eventType:TOKEN_SENT_TO_PARTNER },
      ];

      const GetIcon = ({eventItem , ...props}) => {
        let  icon = ''
        switch (eventItem?.eventType) {
          case METER_VALIDATION_SENT_PARTNER:
              icon = <MeterValidated {...props}/>
              break;
          case POWER_PURCHASE_INITIATED_BY_CUSTOMER:
              icon = <DiscoUp {...props}/>
              break;
          case  VEND_ELECTRICITY_REQUESTED_FROM_VENDOR:
              icon =<PaymentConfirmed {...props}/>
              break;
          case TOKEN_RECIEVED_FROM_VENDOR :
              icon = <TokenGenerated {...props}/>
              break;
          case TOKEN_SENT_TO_PARTNER :
              icon = <Check {...props}/>
              break;
      
          default:
              icon = ''
              break;
        }
        return icon
      }

      

      return (
        <div className="flex mb-6 items-start">
          <ol className="flex justify-between items-center w-full"> {/*w-10/12">*/}
            {ListOfEvents?.map((eventItem, index) => {

                const status_color = {
                    "PENDING" : "bg-gray-200",
                    "COMPLETE" : "bg-green-500",
                    "FAILED" : "bg-red-500",
                }
                let currentStatus = events.filter((item)=>item?.eventType == eventItem?.eventType || ( item?.eventType == eventItem?.eventType2))[0]?.status || "PENDING"


                
                
              return (
                <li className="relative w-full">
                  <div className="flex items-center">
                    {
                    <div className={`flex items-center justify-center p-3 w-12 h-12 ${status_color[currentStatus] || 'bg-gray-200'} rounded-full ring-0 ring-white `}>
                        <GetIcon eventItem={eventItem} className={`text-white `}/>
                    </div> }
                    {(eventItem?.eventType !== TOKEN_SENT_TO_PARTNER )&& <div className="flex w-full bg-gray-200 h-0.5 border-dashed border-t-2 border-gray-400"></div>}
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium text-gray-900 text-sm max-w-md">{eventItem?.title}</h3>
                  </div>
                </li>
              );
            })}
          </ol>
          {/* <div className="flex items-center gap-x-7  ">
            <button type="button" className="text-sm cursor-pointer hover:bg-blue-900 bg-blue-800 py-3 px-3 text-white rounded-md">
                Create Ticket
            </button>
            <button type="button" className="w-10 h-10 text-green-500 hover:text-green-800 cursor-pointer">
                <PlayCircle strokeWidth={1.5} className="w-full h-full" />
            </button>
          </div> */}
        </div>
      );
    },
  },
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
