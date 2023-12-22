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
      // const ListOfEvents_old = [
      //   {title: "Meter Validated", id: 'Validate meter'},
      //   {title: "Disco up", id: "Disco up"},
      //   {title:"Payment Confirmed", id:"Payment Confirmed"},
      //   {title:"Token Generated", id:"Token Generated"},
      //   {title:"Token Sent", id:"Token Sent"},
      // ];
      const ListOfEvents = [
        {title: "Meter Validated", eventType: METER_VALIDATION_SENT_PARTNER},
        {title: "Disco up", eventType: POWER_PURCHASE_INITIATED_BY_CUSTOMER},
        {title:"Payment Confirmed", eventType: VEND_ELECTRICITY_REQUESTED_FROM_VENDOR},
        {title:"Token Generated", eventType:TOKEN_RECIEVED_FROM_VENDOR  , eventType2 : "TOKEN_SENT" },
        {title:"Token Sent", eventType:TOKEN_SENT_TO_PARTNER },
      ];

      const GetIcon = ({eventItem , ...props}) => {
        let  icon = ''
        // switch (eventItem?.title) {
        //     case "Meter Validated":
        //         icon = <MeterValidated {...props}/>
        //         break;
        //     case "Disco up":
        //         icon = <DiscoUp {...props}/>
        //         break;
        //     case "Payment Confirmed":
        //         icon =<PaymentConfirmed {...props}/>
        //         break;
        //     case "Token Generated":
        //         icon = <TokenGenerated {...props}/>
        //         break;
        //     case "Token Sent":
        //         icon = <Check {...props}/>
        //         break;
        
        //     default:
        //         icon = ''
        //         break;
        // }
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

                // currentStatus =  currentStatus === "PENDING" ? currentStatus : currentStatus[0]?.status
                // let nextIndex = index + 1
                // let nextStatus = events.filter((item)=> item?.eventText == ListOfEvents[nextIndex])[0] ? "" : "PENDING"
                // nextStatus = nextStatus === "PENDING" ? nextStatus : nextStatus[0]?.status

                
                
              return (
                <li className="relative w-full">
                  <div className="flex items-center">
                    {/* {  currentStatus === "FAILED" ? <>
                    <div class="flex items-center">
                        <div class="z-10 flex items-center justify-center w-12 h-12 bg-red-200 rounded-full ring-0 ring-white  sm:ring-8  shrink-0">
                            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-red-300 ">
                                <div class="flex w-5 h-5  rounded-full bg-red-500 ">
                                
                                </div> 
                            </div>
                        </div>
                    </div>
                    </> :  */
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
    accessorKey: "meter number",
    header: "Meter",
    cell: (props) => <p>{props.getValue()}</p>,
  },

  {
    accessorKey: "transactionId",
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
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        dateObject
      );

      return <p>{formattedDate}</p>;
    },
  },
  // {
  //     accessorKey: "amount",
  //     header: "Amount",
  //     cell: (props) => (
  //         <p>₦{Number(props.getValue().slice(1,)).toLocaleString()}</p>
  //     ),
  // },

  // {
  //     accessorKey: "status",
  //     header: "Status",
  //     cell: (props) => {
  //         const status = props.getValue();
  //         let statusClass;

  //         switch (status) {
  //             case "complete":
  //                 statusClass =
  //                     "bg-green-100 text-green-800 font-bold py-2 px-3  text-xs";
  //                 break;
  //             case "failed":
  //                 statusClass = "bg-red-100 text-red-800 font-bold py-2 px-3  text-xs";
  //                 break;
  //             case "pending":
  //                 statusClass =
  //                     "bg-yellow-100 text-yellow-800 font-bold py-2 px-3  text-xs";
  //                 break;
  //             default:
  //                 statusClass = "bg-black text-white font-bold py-2 px-3  text-xs";
  //         }

  //         return <p className={statusClass}>{status}</p>;
  //     },
  // },
];

export default columns;
