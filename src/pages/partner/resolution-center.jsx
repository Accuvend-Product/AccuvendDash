import React, { useState } from "react";
import MainContent from "../../components/MainContent";
import useUserData from "../../hooks/useUserData";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { Plus } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { useMutation, useQuery , useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useGetComplaints  } from "../../api/Complaints.js";
import { SupportTicketTable } from "../../components/SupportTicketTable/table";
const VITE_PORTAL_TYPE = import.meta.env.VITE_PORTAL_TYPE;
const ResolutionCenter = () => {
  const { email, isUserDataLoading , entityId } = useUserData(BASE_URL);
  
  const {ModalProvider: AddComplaintModal, openModal : openAddModal , closeModal} = useModal("New Support Request")
  // get Complaints 

 
  const {
    pagination,
    filters, 
    setFilters, 
    isLoading,
    tableData, 
    setPagination,
    isError,
    refetch,
  } = useGetComplaints(entityId)

  

  // create Complaints 

  const createComplaintMutation = useMutation({
      mutationFn: async ({onSuccessFunction, onFailureFunction, ...newComplaint }) => {
        try{
          const res = await axios.post(`${BASE_URL}complaints/create`, newComplaint ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          
          onSuccessFunction()
          refetch()
          return res
        }catch(err){
          onFailureFunction()
          throw err
        }
       
      }
  })


  // get a single complaint

  return (
    <>
      <>  
      <AddComplaintModal>
        <AddSupportTicketForm closeModal={closeModal} createComplaintMutation={createComplaintMutation} email={email} entityId={entityId}/>
      </AddComplaintModal>
      </>
      <MainContent>
        <div className="w-full mt-10">
          <div className="w-full flex justify-between items-center">
          <div >
            <p class="max-w-lg text-2xl font-semibold leading-normal text-gray-900 mb-2 ">
              Partner Support Center
            </p>
            <p class="text-left text-sm text-gray-500 ">
              {VITE_PORTAL_TYPE === 'PARTNER' ? 'Your One-Stop Destination for Assistance and Guidance': 'Manage all Parnters Enquiries'}
            </p>
          </div>
          {VITE_PORTAL_TYPE === 'PARTNER' ? <button onClick={() => openAddModal()}  type="button" class="px-3 flex gap-x-2 items-center py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <Plus/> Make A Support Request
          </button>:<></>}
          </div>
          <div className="mt-7">
            {/* Table */}
            {/* < */}
            {isLoading ? (
          <div className="h-1/2 w-full flex items-center justify-center">
            <div role="">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        ) : (
          tableData && (
            <>
              {/* Render your cards here */}
              <SupportTicketTable
                filter={filters}
                setFilter={setFilters}
                tableData={tableData}
              />
            
            </>
          )
        )}
          </div>
        </div>
      </MainContent>
    </>
  );
};

export default ResolutionCenter;

const AddSupportTicketForm = ({email , entityId , createComplaintMutation , closeModal}) => {

  const [complainType , setComplainType] = useState('')
  const [message , setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [complaintImage, setComplaintImage] = useState(null)
  const createComplain = async () => {
    

     createComplaintMutation.mutate({
        category : complainType,
        message,
        file : complaintImage,
        entityId , 
        title,
        onSuccessFunction: () => {
          console.log('success')
          toast.success('Ticket was successfully file')
          closeModal()
        }, 
        onFailureFunction: () => {
          console.log('failure')
        toast.error('Ticket could not be added')
        }
      } )
      
      
    }

    const ticketTypes = [
      "Payment Issue",
      "Billing Inquiry",
      "Account Access",
      "Service Disruption",
      "Refund Request",
      "Transaction Dispute",
      "Technical Support",
      "General Inquiry",
      "Feedback or Suggestions",
      "Change of Details",
      "Complaints",
      "Suspicious Activity",
    ];

  return (
    
    <form>
    <div className="flex gap-x-2">
      <div className="mb-6 w-1/2">
        <label
          for="category"
          className="block mb-2 text-sm font-medium text-gray-900  "
        >
          Ticket Category
        </label>
        <select
          value={complainType} // ...force the select's value to match the state variable...
          onChange={e => setComplainType(e.target.value)} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5       "
        >
          <option selected>Choose a complaint</option>
          {ticketTypes?.map(ele =><option value={ele}>{ele}</option>)}
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
    <div className="">
      
      
      <div className="mb-6">
        <label
          for="default-input"
          className="block mb-2 text-sm font-medium text-gray-900  "
        >
         Title
        </label>
        <input
          type="text"
          
          onChange={e => setTitle(e.target.value)} 
          value={title}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
         
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
        onChange={e => setMessage(e.target.value)} 
        value={message}
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
              <span className="font-semibold">Click to upload</span> or
              drag and drop
            </p>
            <p className="text-xs text-blue-500  ">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input value={complaintImage} onChanger={(e) => setComplaintImage(e.target.value)}id="dropzone-file" type="file" className="hidden" max={1}/>
        </label>
      </div>
    </div>
    <div>
      <button
        type="button"
        disabled={createComplaintMutation.isPending}
        onClick={()=> createComplain() }
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   focus:outline-none "
      >
        {createComplaintMutation.isPending ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
          Loading...</> :'Submit Request'}
      </button>
    </div>
  </form>
  );
};
