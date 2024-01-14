import GreenCheck from "./icons/green-check";
import RedCheck from "./icons/red-check";
import PropTypes from "prop-types";
import { CheckCircle2, XCircle } from "lucide-react";
import { useMemo } from "react";
import {
  METER_VALIDATION_RECIEVED_FROM_VENDOR,
  POWER_PURCHASE_INITIATED_BY_CUSTOMER,
  TOKEN_RECIEVED_FROM_VENDOR,
  TOKEN_SENT_TO_PARTNER,
  METER_VALIDATION_SENT_PARTNER,
} from "./EventsTable/constants";

const OrderConfirmation = ({ transaction }) => {
  const { amount, meter, disco, powerUnit, user, events } = transaction;

  const checkEventExist = (event) => {
    const _event = events?.filter((item) => item?.eventType === event);
    if (_event.length > 0) return true;
    else return false;
  };

  const getBgColor = (prevState, CurrenState) => {
    console.log(prevState, CurrenState);
    if (!prevState) {
      return "bg-[#F7F7F7]";
    }
    if (!CurrenState) {
      return "bg-[#FFBF001A]";
    } else {
      return "bg-[#f0fbf5]";
    }
  };

  const getIcon = (prevState, CurrenState) => {
    if (!prevState) {
      return (
        <>
          <span class="relative flex h-6 w-6 items-center justify-center">
            <span class="absolute inline-flex h-full w-full rounded-full bg-slate-300 opacity-50"></span>
            <span class=" relative inline-flex rounded-full h-3 w-3 bg-slate-500"></span>
          </span>
        </>
      );
    }
    if (!CurrenState) {
      return (
        <>
          <span class="relative flex h-6 w-6 items-center justify-center">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffbb00] opacity-75"></span>
            <span class="animate-pulse relative inline-flex rounded-full h-4 w-4 bg-[#ffbb00]"></span>
          </span>
        </>
      );
    } else {
      return <CheckCircle2 strokeWidth={"2.5px"} className="text-green-600" />;
    }
  };

  return (
    <div className="rounded-xl border border-gray-300 w-full md:w-[40%]">
      {/* head section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
          <p className="font-bold">Status</p>
        </div>

        {/* Order Confirmation rows */}
        <div className="flex flex-col space-y-4 px-8 pt-8 pb-4">
          {/* {checkEventExist(METER_VALIDATION_SENT_PARTNER) ? (
              <div
                className={`bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start `}
              >
                <div className="mt-2">
                  <CheckCircle2
                    strokeWidth={"2.5px"}
                    className="text-green-600"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Validate Meter</h1>
                  <p className="text-sm">Meter Number - {meter?.meterNumber}</p>
                  <p className="text-sm">Name - {user?.name}</p>
                  <p className="text-sm">Address - {user?.address}</p>
                </div>
              </div>
            ) : ( */}
          <div
            className={`${getBgColor(
              true,
              checkEventExist(METER_VALIDATION_SENT_PARTNER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(true, checkEventExist(METER_VALIDATION_SENT_PARTNER))}
            </div>
            <div>
              <h1 className="font-bold text-lg">Validate Meter</h1>
              <p className="text-sm">Meter Number - {meter?.meterNumber}</p>
              <p className="text-sm">Name - {user?.name}</p>
              <p className="text-sm">Address - {user?.address}</p>
            </div>
          </div>
          {/* )} */}
          <div
            className={`${getBgColor(
              checkEventExist(METER_VALIDATION_SENT_PARTNER),
              true
            )}  px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(checkEventExist(METER_VALIDATION_SENT_PARTNER),true )}
            </div>
            <div>
              <h1 className="font-bold text-lg">Check if Disco is up</h1>
              <p className="text-sm">{disco}</p>
            </div>
          </div>
          <div
            className={`${getBgColor(
              checkEventExist(METER_VALIDATION_SENT_PARTNER),
              checkEventExist(POWER_PURCHASE_INITIATED_BY_CUSTOMER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(METER_VALIDATION_SENT_PARTNER),
                checkEventExist(POWER_PURCHASE_INITIATED_BY_CUSTOMER)
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
              checkEventExist(POWER_PURCHASE_INITIATED_BY_CUSTOMER),
              checkEventExist(TOKEN_RECIEVED_FROM_VENDOR)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(POWER_PURCHASE_INITIATED_BY_CUSTOMER),
                checkEventExist(TOKEN_RECIEVED_FROM_VENDOR)
              )}
            </div>
            <div>
              <h1 className="font-bold text-lg">Generate Token</h1>
              {powerUnit?.token ? (
                <p className="text-sm">Token generated successfully</p>
              ) : (
                <p className="text-sm">
                  Token not generated yet <br />
                  {!checkEventExist(TOKEN_RECIEVED_FROM_VENDOR)
                    ? "We are currently retrying the process to obtain a token for you. We appreciate your patience"
                    : ""}
                </p>
              )}
            </div>
          </div>
          <div
            className={`${getBgColor(
              checkEventExist(TOKEN_RECIEVED_FROM_VENDOR),
              checkEventExist(TOKEN_SENT_TO_PARTNER)
            )} px-4 py-2 rounded-md flex gap-4 items-start `}
          >
            <div className="mt-2">
              {getIcon(
                checkEventExist(TOKEN_RECIEVED_FROM_VENDOR),
                checkEventExist(TOKEN_SENT_TO_PARTNER)
              )}
            </div>
            <div>
              <h1 className="font-bold text-lg">Send Token</h1>
              <p
                className={`text-sm ${
                  powerUnit !== null ? "font-semibold" : ""
                }`}
              >
                {powerUnit !== null ? powerUnit.token : "Token not generated"}
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
