import GreenCheck from "../icons/green-check";
import RedCheck from "../icons/red-check";
import PropTypes from "prop-types";
import { CheckCircle2, XCircle } from "lucide-react";
import { useMemo } from "react";
import { formatTimeStamp } from "./commons";
import { getIcon , getBgColor , checkEventExist , returnEventIfExist} from "./commons";
import {

  //
  PHONENUMBER_VALIDATION_REQUESTED_FROM_PARTNER,
  AIRTIME_SENT_TO_PARTNER,
  AIRTIME_RECEIVED_FROM_VENDOR,
  AIRTIME_PURCHASE_INITIATED_BY_CUSTOMER



} from "../EventsTable/constants";

const OrderConfirmationAirtime = ({ transaction }) => {
  const { amount, meter, disco, powerUnit, user, events } = transaction;

  return (
    <div className="rounded-xl border border-gray-300 w-full md:w-[40%]">
      {/* head section */}
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
          <p className="font-bold">Status</p>
        </div>

        {/* Order Confirmation rows */}
        <div className="flex flex-col gap-y-4 px-8 pt-8 pb-4">
          <div
            className={`${getBgColor(
              true,
              checkEventExist(events,PHONENUMBER_VALIDATION_REQUESTED_FROM_PARTNER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(true, checkEventExist(events,PHONENUMBER_VALIDATION_REQUESTED_FROM_PARTNER))}
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between w-full">
                <h1 className="font-bold text-lg">Validate Phone</h1>
                <date className="text-xs relative top-[1px]">{formatTimeStamp(returnEventIfExist(events,PHONENUMBER_VALIDATION_REQUESTED_FROM_PARTNER)?.eventTimestamp , 'time')}</date>
              </div>
              <p className="text-sm">Phone Number - {user?.phoneNumber}</p>
            </div>
          </div>
          {/* <div
            className={`${getBgColor(
              checkEventExist(events,PHONENUMBER_VALIDATION_REQUESTED_FROM_PARTNER),
              true
            )}  px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(checkEventExist(events,PHONENUMBER_VALIDATION_REQUESTED_FROM_PARTNER),true )}
            </div>
            <div>
              <h1 className="font-bold text-lg">Check if Disco is up</h1>
              <p className="text-sm">{disco}</p>
            </div>
          </div> */}
          <div
            className={`${getBgColor(
              checkEventExist(events,PHONENUMBER_VALIDATION_REQUESTED_FROM_PARTNER),
              checkEventExist(events,AIRTIME_PURCHASE_INITIATED_BY_CUSTOMER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(events,PHONENUMBER_VALIDATION_REQUESTED_FROM_PARTNER),
                checkEventExist(events,AIRTIME_PURCHASE_INITIATED_BY_CUSTOMER)
              )}
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between w-full">
                <h1 className="font-bold text-lg">Confirm Payment</h1>
                <date className="text-xs relative top-[1px]">{formatTimeStamp(returnEventIfExist(events,AIRTIME_PURCHASE_INITIATED_BY_CUSTOMER)?.eventTimestamp , 'time')}</date>
              </div>
              <p className="text-sm">
                Amount - ₦{Number(amount)?.toLocaleString()}
              </p>
            </div>
          </div>
          <div
            className={`${getBgColor(
              checkEventExist(events,AIRTIME_PURCHASE_INITIATED_BY_CUSTOMER),
              checkEventExist(events, AIRTIME_RECEIVED_FROM_VENDOR)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(events,AIRTIME_PURCHASE_INITIATED_BY_CUSTOMER),
                checkEventExist(events, AIRTIME_RECEIVED_FROM_VENDOR)
              )}
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between w-full">
                <h1 className="font-bold text-lg">Generate Airtime</h1>
                <date className="text-xs relative top-[1px]">{formatTimeStamp(returnEventIfExist(events,AIRTIME_RECEIVED_FROM_VENDOR)?.eventTimestamp , 'time')}</date>
              </div>
              {checkEventExist(events, AIRTIME_RECEIVED_FROM_VENDOR) ? (
                <p className="text-sm">Airtime generated successfully</p>
              ) : (
                <p className="text-sm">
                  Token not generated yet <br />
                  {!checkEventExist(events, AIRTIME_RECEIVED_FROM_VENDOR)
                    ? "We are currently retrying the process to obtain a airtime for you. We appreciate your patience"
                    : ""}
                </p>
              )}
            </div>
          </div>
          <div
            className={`${getBgColor(
              checkEventExist(events, AIRTIME_RECEIVED_FROM_VENDOR),
              checkEventExist(events,AIRTIME_SENT_TO_PARTNER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(events, AIRTIME_RECEIVED_FROM_VENDOR),
                checkEventExist(events,AIRTIME_SENT_TO_PARTNER)
              )}
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between w-full">
                <h1 className="font-bold text-lg">Send Airtime</h1>
                <date className="text-xs relative top-[1px]">{formatTimeStamp(returnEventIfExist(events,AIRTIME_SENT_TO_PARTNER)?.eventTimestamp , 'time')}</date>
              </div>
              <p
                className={`text-sm ${
                  checkEventExist(events,AIRTIME_SENT_TO_PARTNER) ? "font-semibold" : ""
                }`}
              >
                {checkEventExist(events,AIRTIME_SENT_TO_PARTNER) ? "" : "Airtime not sent"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// OrderConfirmationAirtime.propTypes = {
//   transaction: PropTypes.shape({
//     amount: PropTypes.string,
//     meter: PropTypes.shape({
//       meterNumber: PropTypes.string,
//     }),
//     status: PropTypes.string,
//     disco: PropTypes.string,
//     powerUnit: PropTypes.shape({
//       token: PropTypes.string,
//     }),
//     user: PropTypes.shape({
//       name: PropTypes.string,
//       address: PropTypes.string,
//     }),
//   }),
// };

export default OrderConfirmationAirtime;
