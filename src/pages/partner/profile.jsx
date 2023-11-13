import { ImagePlus } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar";
import ZenithImage from "../../images/zenith.png"

const PartnerDashboardProfile = () => {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className=" px-8 sm:px-10 md:px-12 border-b border-body1 flex-1 pb-10">
                    <div className="mt-10 space-y-2">
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <p className="text-body1">Take a look at your policies and the new policy to see what is covered</p>
                        <div className="flex ">
                            <button className="px-2 py-1 border bg-gray-200 border-gray-300 font-semibold text-primary rounded-l-md">Profile</button>
                            <button className="px-2 py-1 border-y border-gray-300 text-body1">Preferences</button>
                            <button className="px-2 py-1 border border-gray-300 text-body1 rounded-r-md ">Team members</button>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col px-8 border border-gray-200 rounded-md pb-40">
                        {/* Container div */}
                        <div className="flex flex-col space-y-8 pt-4 pb-14">
                            <div className="grid grid-cols-2">
                                {/* left side */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">Profile Photo</h1>
                                    <p>This image will be displayed on your profile</p>
                                    <button className="flex items-center gap-2 text-primary border border-primary hover:border-transparent hover:text-white hover:bg-primary w-fit px-2 py-1 rounded-md font-semibold">
                                        <ImagePlus className="h-4 w-4" />
                                        Change Photo
                                    </button>
                                </div>

                                {/* right side */}
                                <div className="flex justify-start">
                                    <img src={ZenithImage} alt="Zenith Bank" className="w-32 h-32 rounded-md" />
                                </div>
                            </div>
                            <hr />
                        </div>

                        <div className="flex flex-col space-y-8 pt-4 pb-14">
                            <div className="grid grid-cols-2">
                                {/* left side */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">Personal Information</h1>
                                    <p>Update your personal details here.</p>
                                    <button className="text-white bg-gray-300 w-fit px-3 py-2 rounded-md">
                                        Save Changes
                                    </button>
                                </div>

                                {/* right side */}
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="font-bold">Email Address</label>
                                        <input type="email" id="email" name="email" placeholder="zenithbankplc@gmail.com" className="bg-gray-200 border px-3 py-3 text-sm rounded-md" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="username" className="font-bold">Username</label>
                                        <input type="text" id="username" name="username" placeholder="@Zenithbankplc" value="@Zenithbankplc" className="border px-3 py-3 text-sm rounded-md" />
                                        <div className="flex items-center mt-2 text-green-500 bg-green-100 rounded-full p-1 font-bold text-sm w-fit">
                                            <svg width={25} height={26} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.4081 22.2623C17.4914 22.2623 21.6122 18.1415 21.6122 13.0583C21.6122 7.97504 17.4914 3.85425 12.4081 3.85425C7.32489 3.85425 3.2041 7.97504 3.2041 13.0583C3.2041 18.1415 7.32489 22.2623 12.4081 22.2623ZM16.1669 11.7671C16.5834 11.3856 16.6118 10.7388 16.2303 10.3222C15.8489 9.90572 15.202 9.87731 14.7854 10.2588L11.0097 13.7169L10.0308 12.8204C9.61433 12.4389 8.96743 12.4673 8.58596 12.8839C8.20449 13.3004 8.2329 13.9473 8.64942 14.3287L10.3189 15.8578C10.7098 16.2158 11.3095 16.2158 11.7004 15.8578L16.1669 11.7671Z" fill="#0F973D" style={{ fill: 'color(display-p3 0.0588 0.5922 0.2392)', fillOpacity: 1 }} />
                                            </svg>
                                            <span>Username is available</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="role" className="font-bold">Role</label>
                                        <input type="text" id="role" name="role" placeholder="Partner" className="bg-gray-200 border px-3 py-3 text-sm rounded-md" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PartnerDashboardProfile