import PHEDImage from '../../images/phed.png';

const DetailsCard = () => {
    return (
        <div className="rounded-xl border border-gray-300 w-[60%] mt-8 h-fit">
            {/* head section */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
                    <p className="font-bold">Details</p>
                </div>
                {/* Details rows */}
                <div className="flex flex-col space-y-2">
                    <div className="flex justify-between mt-2 py-2 px-8">
                        <p className="font-bold">Transaction Date</p>
                        <p className="text-gray-500">2023-10-09</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Customer Name</p>
                        <p className="text-gray-500">John Richie</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Meter number</p>
                        <p className="text-gray-500">MTR-11313</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Transaction Type</p>
                        <p className="text-gray-500">Purchase</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Amount</p>
                        <p className="text-gray-500">N5,000</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Status</p>
                        <p className="px-2 py-2.5 text-sm bg-[#CFFFB9] text-secondary">success</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Payment method</p>
                        <p className="text-gray-500">Zenith bank</p>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Disco</p>
                        <div className='flex gap-2 items-center'>
                            <img src={PHEDImage} alt="image" />
                            <p className="text-gray-500">PHED</p>
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between  py-2 px-8">
                        <p className="font-bold">Token generated</p>
                        <p className="text-gray-500">35635156735642547536425</p>
                    </div>
                    <hr />
                    <div className="h-10" />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;