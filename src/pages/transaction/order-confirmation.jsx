import GreenCheck from "../../components/icons/green-check"


const OrderConfirmation = () => {
    return (
        <div className="rounded-xl border border-gray-300 w-[40%] mt-8 h-fit">
            {/* head section */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
                    <p className="font-bold">Order Confirmation</p>
                </div>

                {/* Order Confirmation rows */}
                <div className="flex flex-col space-y-4 px-8 pt-8 pb-4">
                    <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                        <div className="mt-2">
                            <GreenCheck />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl">Meter Validated</h1>
                            <p>Meter Number - 8765645</p>
                            <p>Name - John Doe</p>
                            <p>Address - 123a Ajah, Lagos</p>
                        </div>
                    </div>
                    <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                        <div className="mt-2">
                            <GreenCheck />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl">Disco up</h1>
                            <p>IKEDC server up</p>
                        </div>
                    </div>
                    <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                        <div className="mt-2">
                            <GreenCheck />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl">Payment confirmed</h1>
                            <p>Amount - N5,000</p>
                        </div>
                    </div>
                    <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                        <div className="mt-2">
                            <GreenCheck />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl">Token Generated</h1>
                            <p>Token generated successfully</p>
                        </div>
                    </div>
                    <div className="bg-[#F2FBF6] px-4 py-2 rounded-md flex gap-4 items-start ">
                        <div className="mt-2">
                            <GreenCheck />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl">Token sent</h1>
                            <p>41268025179034267819</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmation