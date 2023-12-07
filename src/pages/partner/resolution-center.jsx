import React from "react";
import MainContent from "../../components/MainContent";
import useUserData from "../../hooks/useUserData";
const BASE_URL = import.meta.env.VITE_BASE_URL
const ResolutionCenter = () => {
    const { email, isUserDataLoading } = useUserData(BASE_URL)
  return (
    <>
      <MainContent>
        <div className="w-full flex justify-center mt-10">
          <div className="rounded-xl border border-gray-300 w-full md:mx-16 ">
            <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
              <p className="font-bold">Filing A New Complaint</p>
            </div>
            <div className="px-8 py-4">
              <form>
                <div className="flex gap-x-2">
                  <div className="mb-6 w-1/2">
                    <label
                      for="countries"
                      className="block mb-2 text-sm font-medium text-gray-900  "
                    >
                      Complaint Category
                    </label>
                    <select
                      id="complaint"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5       "
                    >
                      <option selected>Choose a complaint</option>
                      <option value="Customer Related">Customer Related</option>
                      <option value="Pending Token">Pending Token</option>
                      <option value="Developer Support">
                        Developer Support
                      </option>
                    </select>
                  </div>
                  <div className="mb-6 w-1/2">
                    <label
                      for="default-input"
                      className="block mb-2 text-sm font-medium text-gray-900  "
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="default-input"
                      defaultValue={email}
                      className="bg-gray-50 border border-gray-300 text-gray-400  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5       "
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="message"
                    className="block mb-2 text-sm font-medium text-gray-900  "
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500       "
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
                <div>
                  <div className="flex items-center py-4 justify-center w-1/2">
                    <label
                      for="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50   hover:bg-blue-100    "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-blue-500  "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-blue-500  ">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-blue-500  ">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   focus:outline-none "
                  >
                    Submit Complaint
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MainContent>
    </>
  );
};

export default ResolutionCenter;
