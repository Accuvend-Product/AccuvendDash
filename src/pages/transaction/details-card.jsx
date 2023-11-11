
const DetailsCard = () => {
    return (
        <div className="rounded-xl border border-gray-300">
            {/* head section */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between bg-[#F7F7F7] p-4">
                    <p className="font-bold">Details</p>
                </div>
                {/* Details rows */}
                <div className="flex flex-col p-4">
                    <div className="flex justify-between mb-4">
                        <p className="font-bold">Transaction Date</p>
                        <p className="text-gray-500">2023-10-09</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;