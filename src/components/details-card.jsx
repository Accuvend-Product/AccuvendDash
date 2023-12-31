import PHEDImage from '../images/phed.png';
import PropTypes from 'prop-types';
import ABUJA from "../images/disco-images/ABUJA.jpeg";
import IBADAN from "../images/disco-images/IBADAN.jpeg";
import KANO from "../images/disco-images/KANO.jpeg";
import YOLA from "../images/disco-images/YOLA.jpeg";
import BENIN from "../images/disco-images/BENIN.jpeg";
import IKEJA from "../images/disco-images/IKEJA.jpeg";
import PORTHACOURT from "../images/disco-images/PORTHACOURT.jpeg";
import EKO from "../images/disco-images/EKO.jpeg";
import JOS from "../images/disco-images/JOS.jpeg";
import WHATSAPP_IMAGE_1 from "../images/disco-images/WhatsApp Image 2023-12-14 at 14.06.48 (3).jpeg";
import ENUGU from "../images/disco-images/ENUGU.jpeg";
import KADUNA from "../images/disco-images/KADUNA.jpeg";
import WHATSAPP_IMAGE_2 from "../images/disco-images/WhatsApp Image 2023-12-14 at 14.06.49 (3).jpeg";

const DetailsCard = ({transaction}) => {

    const formatTimeStamp = (_date) => {
        let date = new Date()
        try{
            date = new Date(_date);
        }catch(err){
        }
        const options = {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          };
          const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            date
          );
        return formattedDate
        
    }

    const getImage = (disco) => {
        const logos = {
            ABUJA,
            IBADAN,
            KANO,
            YOLA,
            BENIN,
            IKEJA,
            PORTHACOURT,
            EKO,
            JOS,
            WHATSAPP_IMAGE_1,
            ENUGU,
            KADUNA,
            WHATSAPP_IMAGE_2,
          };

        return logos[disco]
    }

        const {
          transactionTimestamp,
          amount,
          meter,
          status,
          disco,
          powerUnit,
          user,
        } = transaction;   
        let statusClass; 
        switch (transaction?.status.toLowerCase()) {
            case "complete":
                statusClass =
                    "bg-green-100 text-green-800 font-bold py-2 px-3  text-xs";
                break;
            case "failed":
                statusClass = "bg-red-100 text-red-800 font-bold py-2 px-3  text-xs";
                break;
            case "pending":
                statusClass =
                    "bg-yellow-100 text-yellow-800 font-bold py-2 px-3  text-xs";
                break;
            
            default:
                statusClass = "bg-black text-white font-bold py-2 px-3  text-xs";
        }
        return (
        <div className="rounded-xl border border-gray-300 w-[60%] mt-8">
            {/* head section */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
                    <p className="font-bold">Details</p>
                </div>
                {/* Details rows */}
                <div className="flex flex-col space-y-2 px-3">
                    <div className="flex justify-between mt-2 py-2 px-8">
                        <p className="font-bold">Transaction Date</p>
                        <p className="text-gray-500">{formatTimeStamp(transactionTimestamp)}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Customer Name</p>
                        <p className="text-gray-500">{user.name}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Meter number</p>
                        <p className="text-gray-500">{meter.meterNumber}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Transaction Type</p>
                        <p className="text-gray-500">{meter.vendType}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Amount</p>
                        <p className="text-gray-500">₦ {Number(amount)?.toLocaleString()}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Status</p>
                        <p className={`px-2 py-2.5 text-sm  ${statusClass}`}>{status}</p>
                    </div>
                    <hr />
                    {/* <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Payment method</p>
                        <p className="text-gray-500"></p>
                    </div>
                    <hr /> */}
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Disco</p>
                        <div className='flex gap-2 items-center'>
                            <img className='h-6 aspect-auto' src={powerUnit?.discoLogo || getImage(disco)} alt="image" />
                            <p className="text-gray-500">{disco}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Token generated</p>
                        <p className="text-gray-500 font-bold">{powerUnit?.token || 'XXXX'}</p>
                    </div>
                    <hr />
                    <div className="h-10" />
                    <hr />
                </div>
            </div>
        </div>
    );
};

DetailsCard.propTypes = {
  transaction: PropTypes.shape({
    transactionTimestamp: PropTypes.string,
    amount: PropTypes.string,
    partner: PropTypes.string,
    meter: PropTypes.shape({
      meterNumber: PropTypes.string,
      vendType: PropTypes.string,
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

export default DetailsCard;