/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar";
import ZenithImage from "../../images/zenith.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/ui/loading";
import MainContent from "../../components/MainContent";
import { PARTNER_DASHBOARD_ROUTE , PREFERENCES_ROUTE } from "../../Routes";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const PartnerDashboardProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedImageLink, setUploadedImageLink] = useState(null);
    const [email, setEmail] = useState("");
    const [isUserDataLoading, setIsUserDataLoading] = useState(true); // New state for user data loading

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}auth/loggeduser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.status === "success") {
                const userData = response.data.data.partner;
                setEmail(userData.email);
                if (userData.profilePicture) {
                    setUploadedImageLink(userData.profilePicture);
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            // Set loading state to false once user data is fetched or in case of error
            setIsUserDataLoading(false);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleImageUpload = async () => {
        try {
            if (selectedImage) {
                setIsLoading(true);

                const formData = new FormData();
                formData.append("profile_picture", selectedImage);

                const response = await axios.patch(
                    `${BASE_URL}profile/profilepicture`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (response.data.status === "success") {
                    toast.success("Profile image updated successfully")
                    setUploadedImageLink(response.data.data.imageLink);
                    console.log(response.data.data.imageLink);
                }

                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error uploading profile picture:", error);
            toast.error("Error uploading profile picture:", error);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleImageUpload();
    };

    return (
        <>
             
            
            <MainContent>
                    <div className="mt-10 space-y-2">
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <p className="text-body1">
                            Take a look at your policies and the new policy to see what is
                            covered
                        </p>
                        <div className="flex ">
                            <Link
                                to="/partner-dashboard/profile"
                                className="px-2 py-1 border bg-gray-200 border-gray-300 font-semibold text-primary rounded-l-md"
                            >
                                Profile
                            </Link>
                            <Link
                                to={`${PARTNER_DASHBOARD_ROUTE }${PREFERENCES_ROUTE}`}
                                className="px-2 py-1 border-y border-gray-300 text-body1"
                            >
                                Preferences
                            </Link>
                            <Link
                                to="/partner-dashboard/team-settings"
                                className="px-2 py-1 border border-gray-300 text-body1 rounded-r-md "
                            >
                                Team members
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col px-8 border border-gray-200 rounded-md pb-40">
                        {/* Container div */}
                        {/* Show loading screen when user data is loading */}
                        {isUserDataLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <div className="flex flex-col space-y-8 pt-4 pb-14">
                                    <div className="grid grid-cols-2">
                                        {/* left side */}
                                        <div className="flex flex-col gap-2">
                                            <h1 className="font-bold">Profile Photo</h1>
                                            <p>This image will be displayed on your profile</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="profileImage"
                                                name="profileImage"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="profileImage"
                                                className="flex items-center gap-2 text-primary border border-primary hover:border-transparent hover:text-white hover:bg-primary w-fit px-2 py-1 rounded-md font-semibold"
                                            >
                                                <ImagePlus className="h-4 w-4" />
                                                Change Photo
                                            </label>
                                        </div>

                                        {/* right side */}
                                        {selectedImage ? (
                                            <div className="flex items-center mt-2">
                                                <img
                                                    src={URL.createObjectURL(selectedImage)}
                                                    alt="Selected Profile"
                                                    className="w-32 h-32 rounded-md"
                                                />
                                                <button
                                                    // onClick={handleImageUpload}
                                                    type="submit"
                                                    className="ml-2 text-white bg-gray-300 w-fit px-3 py-2 rounded-md text-3xl"
                                                >
                                                    {isLoading ? "Uploading..." : "Upload"}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-start">
                                                {uploadedImageLink ? (
                                                    <img
                                                        src={uploadedImageLink}
                                                        alt="Uploaded Profile"
                                                        className="w-32 h-32 rounded-md"
                                                    />
                                                ) : (
                                                    <img
                                                        src={ZenithImage}
                                                        alt="Zenith Bank"
                                                        className="w-32 h-32 rounded-md"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <hr />
                                </div>
                            </form>

                        )}

                       
                    </div>
            </MainContent>
            
        </>
    );
};

export default PartnerDashboardProfile;
