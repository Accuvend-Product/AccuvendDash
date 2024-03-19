import PropTypes from "prop-types";
import { getBillerImage as getImage } from "../../lib/utils";
import { getStatusClass, formatTimeStamp } from "./commons";
import { useGetBillerImage } from "../../api/getProducts";

const DetailsCardData = ({ transaction }) => {
  const {
    transactionTimestamp,
    amount,
    meter,
    status,
    disco,
    powerUnit,
    user,
    transactionType,
    biller,
  } = transaction;
  
  const statusClass = getStatusClass(status);
  const biller_image = useGetBillerImage(biller);
  return (
    <div className="rounded-xl border border-gray-300 w-full md:w-[60%]">
      {/* head section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
          <p className="font-bold">Details</p>
        </div>
        {/* Details rows */}
        <div className="flex flex-col space-y-2 px-3">
          <div className="flex justify-between mt-2 py-2 px-8">
            <p className="font-bold">Transaction Date</p>
            <p className="text-gray-500">
              {formatTimeStamp(transactionTimestamp)}
            </p>
          </div>
          <hr />
          <div className="flex justify-between  py-2 px-8">
            <p className="font-bold">Phone number</p>
            <p className="text-gray-500">{user?.phoneNumber}</p>
          </div>
          <hr />
          <div className="flex justify-between  py-2 px-8">
            <p className="font-bold">Utility Type</p>
            <p className="text-gray-500">{transactionType}</p>
          </div>
          <hr />
          <div className="flex justify-between  py-2 px-8">
            <p className="font-bold">Amount</p>
            <p className="text-gray-500">
              ₦ {Number(amount)?.toLocaleString()}
            </p>
          </div>
          <hr />
          <div className="flex justify-between  py-2 px-8">
            <p className="font-bold">Status</p>
            <p className={`px-2 py-2.5 text-sm  ${statusClass}`}>{status}</p>
          </div>
          <hr />
          <div className="flex justify-between  py-2 px-8">
            <p className="font-bold">Network</p>
            <div className="flex gap-2 items-center">
              <img className='h-6 aspect-auto'   src={biller_image[0]}
                alt={`${biller_image[1]} logo`} />
            <p className="text-gray-500">{biller_image[1]}</p>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

// DetailsCard.propTypes = {
//   transaction: PropTypes.shape({
//     transactionTimestamp: PropTypes.string,
//     amount: PropTypes.string,
//     partner: PropTypes.string,
//     meter: PropTypes.shape({
//       meterNumber: PropTypes.string,
//       vendType: PropTypes.string,
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

export default DetailsCardData;
