import GreenCheck from "./icons/green-check"
import RedCheck from "./icons/red-check"
import PropTypes from "prop-types";
import { CheckCircle2 , XCircle } from 'lucide-react';

const OrderConfirmation = ({transaction}) => {
        const {
          amount,
          meter,
          disco,
          powerUnit,
          user
        } = transaction;

    return (
      <div className="rounded-xl border border-gray-300 w-[40%] mt-8">
        {/* head section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
            <p className="font-bold">Status</p>
          </div>

          {/* Order Confirmation rows */}
          <div className="flex flex-col space-y-4 px-8 pt-8 pb-4">
            <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
              <div className="mt-2">
                <CheckCircle2 strokeWidth={"2.5px"}  className="text-green-600" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Validate Meter</h1>
                <p className="text-sm">Meter Number - {meter.meterNumber}</p>
                <p className="text-sm">Name - {user.name}</p>
                <p className="text-sm">Address - {user.address}</p>
              </div>
            </div>
            <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
              <div className="mt-2">
                <CheckCircle2 strokeWidth={"2.5px"}  className="text-green-600" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Check if Disco is up</h1>
                <p className="text-sm">{disco}</p>
              </div>
            </div>
            <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
              <div className="mt-2">
                {amount !== '0' ? <CheckCircle2 strokeWidth={"2.5px"}  className="text-green-600" /> : <XCircle strokeWidth={"2.5px"}  className="text-red-600" />}
              </div>
              <div>
                <h1 className="font-bold text-lg">Confirm Payment</h1>
                <p className="text-sm">Amount - ₦{amount}</p>
              </div>
            </div>
            <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
              <div className="mt-2">
                {powerUnit !== null ? <CheckCircle2 strokeWidth={"2.5px"}  className="text-green-600"  /> : <XCircle strokeWidth={"2.5px"}  className="text-red-600" />}
              </div>
              <div>
                <h1 className="font-bold text-lg">Generate Token</h1>
                {powerUnit?.token ? 
                <p className="text-sm">Token generated successfully</p>
                : <p className="text-sm">Token not generated</p>}
              </div>
            </div>
            <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
              <div className="mt-2">
                {powerUnit !== null ? <CheckCircle2 strokeWidth={"2.5px"}  className="text-green-600" /> : <XCircle strokeWidth={"2.5px"}  className="text-red-600" />}
              </div>
              <div>
                <h1 className="font-bold text-lg">Send Token</h1>
                <p className={`text-sm ${powerUnit !== null ? "font-semibold" : ""}`}>{powerUnit !== null ? powerUnit.token : "Token not generated"
                }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

OrderConfirmation.propTypes = {
  transaction: PropTypes.shape({
    amount: PropTypes.string,
    meter: PropTypes.shape({
      meterNumber: PropTypes.string,
    }),
    status: PropTypes.string,
    disco: PropTypes.string,
    powerUnit: PropTypes.shape({
      token: PropTypes.string,
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
    }),
  }),
};

export default OrderConfirmation