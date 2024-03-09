import React,{useState} from "react";
import axios from "axios";
import MainContent from "../../components/MainContent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { ProductTable } from "../../components/ProductTable/table";
import { useModal } from "../../hooks/useModal";
import ProductForm from "../../components/products-forms/ProductForm";
import ProductUpdateForm from "../../components/products-forms/ProductUpdateForm";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Product = () => {

  // State to select the Product to be updated 

  const [updateId, setUpdateId] = useState(null)


  // API call to get all products
  const { isLoading, data : tableData, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/master/product`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response;
      } catch (err) {
        throw err;
      }
    },
  });


  // api call to get all vendors 
  const {isLoading: vendorIsLoading, data : vendorData, isError: vendorIsError} = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/master/vendor`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response;
      } catch (err) {
        throw err;
      }
    },
  });


  //create product mutation
  const createProductMutation = useMutation({
    mutationFn: async ({onSuccessFunction, onFailureFunction, ...newProduct }) => {
      try{
        const res = await axios.post(`${BASE_URL}/master/product/create`, newProduct ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        
        onSuccessFunction()
        return res
      }catch(err){
        onFailureFunction()
        throw err
      }
     
    }
})

  //create productComission mutation

  const createProductCommissionMutation = useMutation({
    mutationFn: async ({onSuccessFunction, onFailureFunction, ...newProductComission}) => {
      try{
        const res = await axios.post(`${BASE_URL}/master/vendor-product/create`, newProductComission ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        
        onSuccessFunction()
        return res
      }catch(err){
        onFailureFunction()
        throw err
      }
     
    }
})

  //create product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({onSuccessFunction, onFailureFunction, ...updateProduct }) => {
      try{
        const res = await axios.patch(`${BASE_URL}/master/product/`,updateProduct ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        
        onSuccessFunction()
        return res
      }catch(err){
        onFailureFunction()
        throw err
      }
     
    }
})

  //create productComission mutation

  const updateProductCommissionMutation = useMutation({
    mutationFn: async ({onSuccessFunction, onFailureFunction, ...newProductComission}) => {
      try{
        const res = await axios.patch(`${BASE_URL}/master/vendor-product/`, newProductComission ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        
        onSuccessFunction()
        return res
      }catch(err){
        onFailureFunction()
        throw err
      }
     
    }
})

  const {ModalProvider: AddProductModal, openModal : openAddModal , closeModal: closeAddModal } = useModal('Add New Product')
  const {ModalProvider: UpdateProductModal, openModal : openUpdateModal , closeModal: closeUpdateModal  } = useModal('Update Product')

  return (
    <>
      <AddProductModal>
        <ProductForm  vendorData={vendorData?.data?.data?.vendors} 
          closeModal={closeAddModal} 
          createProductCommissionMutation={createProductCommissionMutation}
          createProductMutation={createProductMutation}
           />
      </AddProductModal>
      <UpdateProductModal>
        <ProductUpdateForm
          vendorData={vendorData?.data?.data?.vendors}
          updateProductCommissionMutation={updateProductCommissionMutation}
          updateProductMutation={updateProductMutation}
          createProductCommissionMutation={createProductCommissionMutation}
          updateId={updateId}
          closeModal={closeUpdateModal}
        
        />
      </UpdateProductModal>
      <MainContent>
        <div className="w-full mt-10">
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="max-w-lg text-2xl font-semibold leading-normal text-gray-900 mb-2 ">
                Products
              </p>
            </div>
              <button
                onClick={() => openAddModal()}
                type="button"
                className="px-3 flex gap-x-2 items-center py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <Plus /> Add A New Product
              </button>
          </div>
          <div className="mt-7">
            {/* Table */}
            
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
          tableData?.data?.data?.products && (
            <>
              {/* Render your cards here */}
              <ProductTable
                setUpdateId={setUpdateId}
                openUpdateModal={openUpdateModal}
                tableData={tableData?.data?.data?.products}
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

export default Product;
