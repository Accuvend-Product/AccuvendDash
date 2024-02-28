import GreenCheck from "../icons/green-check";
import RedCheck from "../icons/red-check";
import PropTypes from "prop-types";
import { CheckCircle2, XCircle } from "lucide-react";
import { useMemo } from "react";
import { getIcon , getBgColor , checkEventExist} from "./commons";
import {
  METER_VALIDATION_RECIEVED_FROM_VENDOR,
  POWER_PURCHASE_INITIATED_BY_CUSTOMER,
  TOKEN_RECIEVED_FROM_VENDOR,
  TOKEN_SENT_TO_PARTNER,
  METER_VALIDATION_SENT_PARTNER,
} from "../EventsTable/constants";

const OrderConfirmation = ({ transaction }) => {
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
              checkEventExist(events,METER_VALIDATION_SENT_PARTNER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(true, checkEventExist(events,METER_VALIDATION_SENT_PARTNER))}
            </div>
            <div>
              <h1 className="font-bold text-lg">Validate Meter</h1>
              <p className="text-sm">Meter Number - {meter?.meterNumber}</p>
              <p className="text-sm">Name - {user?.name}</p>
              <p className="text-sm">Address - {user?.address}</p>
            </div>
          </div>
          {/* <div
            className={`${getBgColor(
              checkEventExist(events,METER_VALIDATION_SENT_PARTNER),
              true
            )}  px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(checkEventExist(events,METER_VALIDATION_SENT_PARTNER),true )}
            </div>
            <div>
              <h1 className="font-bold text-lg">Check if Disco is up</h1>
              <p className="text-sm">{disco}</p>
            </div>
          </div> */}
          <div
            className={`${getBgColor(
              checkEventExist(events,METER_VALIDATION_SENT_PARTNER),
              checkEventExist(events,POWER_PURCHASE_INITIATED_BY_CUSTOMER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(events,METER_VALIDATION_SENT_PARTNER),
                checkEventExist(events,POWER_PURCHASE_INITIATED_BY_CUSTOMER)
              )}
            </div>
            <div>
              <h1 className="font-bold text-lg">Confirm Payment</h1>
              <p className="text-sm">
                Amount - ₦{Number(amount)?.toLocaleString()}
              </p>
            </div>
          </div>
          <div
            className={`${getBgColor(
              checkEventExist(events,POWER_PURCHASE_INITIATED_BY_CUSTOMER),
              checkEventExist(events,TOKEN_RECIEVED_FROM_VENDOR)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(events,POWER_PURCHASE_INITIATED_BY_CUSTOMER),
                checkEventExist(events,TOKEN_RECIEVED_FROM_VENDOR)
              )}
            </div>
            <div>
              <h1 className="font-bold text-lg">Generate Token</h1>
              {checkEventExist(events,TOKEN_RECIEVED_FROM_VENDOR) ? (
                <p className="text-sm">Token generated successfully</p>
              ) : (
                <p className="text-sm">
                  Token not generated yet <br />
                  {!checkEventExist(events,TOKEN_RECIEVED_FROM_VENDOR)
                    ? "We are currently retrying the process to obtain a token for you. We appreciate your patience"
                    : ""}
                </p>
              )}
            </div>
          </div>
          <div
            className={`${getBgColor(
              checkEventExist(events,TOKEN_RECIEVED_FROM_VENDOR),
              checkEventExist(events,TOKEN_SENT_TO_PARTNER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(events,TOKEN_RECIEVED_FROM_VENDOR),
                checkEventExist(events,TOKEN_SENT_TO_PARTNER)
              )}
            </div>
            <div>
              <h1 className="font-bold text-lg">Send Token</h1>
              <p
                className={`text-sm ${
                  checkEventExist(events,TOKEN_SENT_TO_PARTNER) ? "font-semibold" : ""
                }`}
              >
                {checkEventExist(events,TOKEN_SENT_TO_PARTNER) ? powerUnit?.token : "Token not sent"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// OrderConfirmation.propTypes = {
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

export default OrderConfirmation;
