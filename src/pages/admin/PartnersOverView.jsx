import React from "react";
import { AdminPartnerTable } from "../../components/AdminPartnerTable/table";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useModal } from "../../hooks/useModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Plus } from "lucide-react";
import { useTransactionData } from "../../contexts/transaction-context";
import MainContent from "../../components/MainContent";
import { User2 } from "lucide-react";
import { toast } from "react-hot-toast";

const PartnersOverView = () => {
  // Invite Partner Mutation
  const queryClient = useQueryClient();
  const invitePartnerMutation = useMutation({
    mutationFn: async ({
      onSuccessFunction,
      onFailureFunction,
      ...inviteBody
    }) => {
      try {
        const res = await axios.post(`${BASE_URL}partner/invite`, inviteBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        onSuccessFunction();
        return res;
      } catch (err) {
        onFailureFunction();
        throw err;
      }
    },
    onSuccess: () => {
      console.log('failing ')
      window.location.reload(true)
      // queryClient.invalidateQueries({ queryKey: ["partners"] , exact: true });
    },
  });

  const {
    ModalProvider: InvitePartnerModal,
    openModal: openAddModal,
    closeModal,
  } = useModal("Invite Partner");

  const {
    data: tableData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}partner/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // return response

        return response?.data?.data?.partners?.map((item) => {
          const itemStats = response?.data?.data?.stats?.filter(
            (search) => search.id === item.id
          )[0];
          return {
            partnerImage: item?.entity?.profilePicture || <User2 />,
            companyName: item?.companyName,
            companyAddress:
              item?.address && item?.address !== null ? item?.address : "-",
            partnerId: item?.id,
            email: item?.entity?.email,
            activatedStatus: item?.entity?.status?.activated,
            failedTransaction: itemStats?.failed_Transactions,
            PendingTranscations: itemStats?.pending_Transactions,
            SuccessfulTransaction: itemStats?.success_Transactions,
          };
        });
      } catch (err) {
        throw err;
      }
    },
  });
  return (
    <>
      <>
        <InvitePartnerModal>
          <InvitePartnerForm
            invitePartnerMutation={invitePartnerMutation}
            closeModal={closeModal}
          />
        </InvitePartnerModal>
      </>
      <MainContent>
        <div className=" ml-auto py-10">{/* cards */}</div>

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
              <AdminPartnerTable
                tableData={tableData}
                flexLeft={
                  <>
                    <button
                      onClick={() => openAddModal()}
                      type="button"
                      class="px-3 flex gap-x-2 items-center py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      <Plus /> Invite Partner
                    </button>
                  </>
                }
              />
            </>
          )
        )}
      </MainContent>
    </>
  );
};

const InvitePartnerForm = ({ invitePartnerMutation, closeModal }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailRequried, setEmailRequired] = useState(false);
  const [nameRequried, setNameRequired] = useState(false);
  const invitePartner = async () => {
    setEmailRequired(false);
    setNameRequired(false);
    if (email === null || email === "" || !email) {
      setEmailRequired(true);
      return;
    }
    if (name === null || name === "" || !name) {
      setNameRequired(true);
      return;
    }

    invitePartnerMutation.mutate({
      email,
      companyName: name,
      onSuccessFunction: () => {
        console.log("success");
        toast.success("Partner Invite Sent Successfully");
        setEmail("")
        setName("")
        closeModal();
      },
      onFailureFunction: () => {
        console.log("failure");
        toast.error("Partner Invite could not be sent");
      },
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="">
        <div className="mb-6">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900  "
          >
            Partner Email
          </label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {emailRequried && <p class="mt-2 text-sm text-red-600 ">Partner's Email is required</p>}
        </div>

        <div className="mb-6">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900  "
          >
            Partner Name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {nameRequried && <p class="mt-2 text-sm text-red-600 ">Partner's Name is required</p>}
        </div>
      </div>

      <div>
        <button
          type="button"
          disabled={invitePartnerMutation.isPending}
          onClick={() => invitePartner()}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   focus:outline-none "
        >
          {invitePartnerMutation.isPending ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Invite Partner"
          )}
        </button>
      </div>
    </form>
  );
};

export default PartnersOverView;
