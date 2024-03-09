import { useQuery } from "@tanstack/react-query";
import { Plus, PlusSquare, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { convertZodErrorToObject } from "../../lib/utils";
import { InputErrorMessage } from "../inputs/InputErrorMessage";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import {
  inputLabelErrorStyle,
  inputStyle,
  inputErrorStyle,
  inputLabelStyle,
} from "../../lib/styles";
// Product Update and Addition Form
import { z, object, string, ZodError, array, number } from "zod";
const ProductUpdateForm = ({
  onSubmit = async () => null,
  vendorData = [],
  closeModal,
  updateProductCommissionMutation,
  createProductCommissionMutation,
  updateProductMutation,
  updateId,
}) => {
  const categories = [
    "AIRTIME",
    "ELECTRICITY",
    "DATA",
    "CABLE",
    "BETTING",
    "EDUCATION",
    "GOVERNMENT",
    "WASTE",
  ];
  const types = ["POSTPAID", "PREPAID"];

  // Getting the Data for the to be updated

  const { isloading, data, isError } = useQuery({
    queryKey: [`product-${updateId}`],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/master/product/info?productId=${updateId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response?.data?.data?.product
        return data;
      } catch (err) {
        console.log('----', err)
        throw err;
      }
    },
  });

  useEffect(()=>{
    setInputValues({
        productCode: data?.masterProductCode,
        category: data?.category,
        productName: data?.productName,
        type: data?.type,
    
        commissions: data?.vendorProducts.map((item)=>{
            return {
                vendorProductId: item?.id,
                vendor: item?.vendorId,
                commission: item?.commission?.toString(),
                bonus: item?.bonus?.toString(),
                url: item?.vendorHttpUrl,
                schemaData: JSON.stringify(item?.schemaData || "")
            }
        })
        
    }) 

  },[data])

  //input values
  const [inputValues, setInputValues] = useState({});
  const onChangeValue = (e) => {
    setInputValues((prevState) => {
      return { ...prevState, [e.target.getAttribute("name")]: e.target.value };
    });
  };
  //on change for commissions
  const onChangeCommissionValues = (e, index) => {
    setInputValues((prevState) => {
      const newStateCommission = Array.from(prevState?.commissions);
      newStateCommission[index] = {
        ...newStateCommission[index],
        [e.target.getAttribute("name")]: e.target.value,
      };
      return { ...prevState, commissions: newStateCommission };
    });
  };

  // selecting a VendorId

  const onChangeVendorId = (e, index) => {
    console.log(e.target.value, index);
    setInputValues((prevState) => {
      const newStateCommission = Array.from(prevState?.commissions);
      newStateCommission[index] = {
        ...newStateCommission[index],
        vendor: e.target.value,
      };
      return { ...prevState, commissions: newStateCommission };
    });
  };

  //input Errors
  const [inputErrors, setInputErrors] = useState({});

  // add a commission
  const addCommission = () => {
    if (!inputValues?.commissions) {
      setInputValues((prevState) => {
        return { ...prevState, commissions: [] };
      });
    }
    setInputValues((prevState) => {
      return {
        ...prevState,
        commissions: [
          ...prevState?.commissions,
          {
            vendor: "",
            commission: "0",
            bonus: "0",
            schemaData: "",
            url: "",
          },
        ],
      };
    });
  };

  // remove a commission
  const removeCommission = (index) => {
    const newCommissions = inputValues?.commissions?.filter(
      (_, i) => i !== index
    );
    setInputValues((prevState) => {
      return { ...prevState, commissions: newCommissions };
    });
  };

  // Zod Validation
  const commissionSchema = object({
    vendor: string().refine(
      (value) => vendorData.map((item) => item?.id).includes(value),
      {
        message:
          "Vendor must be one of: " +
          vendorData.map((item) => item?.name).join(", "),
      }
    ),
    commission: string().refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0 , {
      message: "Commission should be a number",
    }),
    bonus: string().refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0, {
      message: "Bonus should be a number",
    }),
    url: string(),
    schemaData: string().refine(
      (value) => {
        try {
          const item = JSON.parse(value);
          return true;
        } catch (err) {
          return false;
        }
      },
      { message: "The schema should be in json format" }
    ),
  });
  const productValidationSchema = object({
    productCode: string(),
    productName: string(),
    category: string().refine((value) => categories.includes(value), {
      message: "Category must be one of: " + categories.join(", "),
    }),
    type: string().refine((value) => types.includes(value), {
      message: "Category must be one of: " + types.join(", "),
    }),
    commissions: array(commissionSchema).optional(),
  });

  // submitting Form

  const submitForm = async () => {
    setInputErrors({});
    try {
      productValidationSchema.parse(inputValues);
      // Create A Product
      const result = await updateProductMutation.mutateAsync({
        productId: updateId,
        masterProductCode: inputValues.productCode,
        type: inputValues.type,
        productName: inputValues.productName,
        category: inputValues.category,
        onSuccessFunction: () => {
          console.log("success");
          toast.success("Product was successfully Added");
        },
        onFailureFunction: () => {
          console.log("failure");
          toast.error("Product could not be added");
        },
      });
      // Get a Product id
      const productId = result?.data?.data?.product?.id;
      //
      const schemaData = {}; // this a testing placeholder for schemadata
      for (let i = 0; i < inputValues.commissions.length; i++) {

        if(inputValues?.commissions[0]?.vendorProductId){
            await updateProductCommissionMutation.mutateAsync({
                vendorProductId : inputValues?.commissions[0]?.vendorProductId ,
                productId,
                vendorId: inputValues?.commissions[0].vendor,
                commission: parseFloat(inputValues?.commissions[0].commission),
                bonus: parseFloat(inputValues?.commissions[0].bonus),
                vendorHttpUrl: inputValues?.commissions[0].url,
                schemaData: JSON.parse(inputValues?.commissions[0].schemaData),
                onSuccessFunction: () => {
                  console.log("success");
                  toast.success(`Commission for Product was successfully Added`);
                },
                onFailureFunction: () => {
                  console.log("failure");
                  toast.error(`Product Commission for  could not be added`);
                },
              });
        }else{
        await createProductCommissionMutation.mutateAsync({
          productId,
          vendorId: inputValues?.commissions[0].vendor,
          commission: parseFloat(inputValues?.commissions[0].commission),
          bonus: parseFloat(inputValues?.commissions[0].bonus),
          vendorHttpUrl: inputValues?.commissions[0].url,
          schemaData: JSON.parse(inputValues?.commissions[0].schemaData),
          onSuccessFunction: () => {
            console.log("success");
            toast.success(`Commission for Product was successfully Added`);
          },
          onFailureFunction: () => {
            console.log("failure");
            toast.error(`Product Commission for  could not be added`);
          },
        });
        }
      }
      console.log(productId);
      closeModal();
      // toast.success('Product Was Added Successfully')
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err.format());
        setInputErrors(err.format());
        return;
      }
      toast.error("Sorry something went wrong");
    }
  };

  return (
    <div className="relative">
      {/* loading */}
      {isloading && <div className="flex items-center justify-center absolute inset-0">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
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
          <span className="sr-only">Loading...</span>
        </div>
      </div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <div className="mb-6">
          <label
            for="productCode"
            className={
              inputErrors["productCode"]
                ? inputLabelErrorStyle
                : inputLabelStyle
            }
          >
            Product Code
          </label>
          <input
            onChange={(e) => onChangeValue(e)}
            value={inputValues.productCode}
            type="text"
            name="productCode"
            className={
              inputErrors["productCode"] ? inputErrorStyle : inputStyle
            }
          />
          {inputErrors["productCode"] ? (
            <InputErrorMessage
              message={inputErrors["productCode"]["_errors"][0]}
            />
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            for="productName"
            className={
              inputErrors["productName"]
                ? inputLabelErrorStyle
                : inputLabelStyle
            }
          >
            Product Name
          </label>
          <input
            onChange={(e) => onChangeValue(e)}
            value={inputValues.productName}
            type="text"
            name="productName"
            className={
              inputErrors["productCode"] ? inputErrorStyle : inputStyle
            }
          />
          {inputErrors["productName"] ? (
            <InputErrorMessage
              message={inputErrors["productName"]["_errors"][0]}
            />
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            for="category"
            className={
              inputErrors["category"] ? inputLabelErrorStyle : inputLabelStyle
            }
          >
            Category
          </label>
          <select
            onChange={(e) => onChangeValue(e)}
            value={inputValues.category}
            name="category"
            className={inputErrors["category"] ? inputErrorStyle : inputStyle}
          >
            <option>select option</option>
            {categories?.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          {inputErrors["category"] ? (
            <InputErrorMessage
              message={inputErrors["category"]["_errors"][0]}
            />
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            for="type"
            className={
              inputErrors["type"] ? inputLabelErrorStyle : inputLabelStyle
            }
          >
            Type
          </label>
          <select
            onChange={(e) => onChangeValue(e)}
            value={inputValues.type}
            name="type"
            className={inputErrors["type"] ? inputErrorStyle : inputStyle}
          >
            <option>select option</option>
            {types?.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
          {inputErrors["type"] ? (
            <InputErrorMessage message={inputErrors["type"]["_errors"][0]} />
          ) : ("")}
        </div>

        <div className="mt-6">
          {/* Vendor Commissions */}
          <div className="mb-2.5">Product Comission and Bonus</div>
          {inputValues?.commissions?.map((_, index) => (
            <div className="mt-2.5" index={index}>
              <div className="mb-2.5">
                <hr />
              </div>
              <div className="flex flex-row justify-end">
                <button
                  onClick={() => removeCommission(index)}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center me-2 "
                >
                  <Trash className="w-3 h-3" />
                  Remove
                </button>
              </div>
              <div className="mb-6">
                <label
                  for="vendor"
                  className={
                    inputErrors["commissions"]?.[index]?.["vendor"]
                      ? inputLabelErrorStyle
                      : inputLabelStyle
                  }
                >
                  Vendor
                </label>
                <select
                  name="vendor"
                  onChange={(e) => onChangeVendorId(e, index)}
                  value={inputValues.commissions?.[index]?.vendor}
                  className={
                    inputErrors["commissions"]?.[index]?.["vendor"]
                      ? inputErrorStyle
                      : inputStyle
                  }
                >
                  <option>select option</option>
                  {vendorData?.map((vendorItem) => (
                    <option value={vendorItem?.id}>{vendorItem?.name}</option>
                  ))}
                </select>
                {inputErrors["commissions"]?.[index]?.["vendor"] ? (
                  <InputErrorMessage
                    message={
                      inputErrors["commissions"]?.[index]?.["vendor"]
                        ?._errors?.[0]
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="mb-6">
                <label
                  for="commission"
                  className={
                    inputErrors["commissions"]?.[index]?.["commission"]
                      ? inputLabelErrorStyle
                      : inputLabelStyle
                  }
                >
                  Commission
                </label>
                <input
                  onChange={(e) => onChangeCommissionValues(e, index)}
                  value={inputValues.commissions?.[index]?.commission}
                  type="text"
                  name="commission"
                  className={
                    inputErrors["commissions"]?.[index]?.["commission"]
                      ? inputErrorStyle
                      : inputStyle
                  }
                />
                {inputErrors["commissions"]?.[index]?.["commission"] ? (
                  <InputErrorMessage
                    message={
                      inputErrors["commissions"]?.[index]?.["commission"]
                        ?._errors?.[0]
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="mb-6">
                <label
                  for="bonus"
                  className={
                    inputErrors["commissions"]?.[index]?.["bonus"]
                      ? inputLabelErrorStyle
                      : inputLabelStyle
                  }
                >
                  Bonus
                </label>
                <input
                  onChange={(e) => onChangeCommissionValues(e, index)}
                  value={inputValues.commissions?.[index]?.bonus}
                  type="text"
                  name="bonus"
                  className={
                    inputErrors["commissions"]?.[index]?.["bonus"]
                      ? inputErrorStyle
                      : inputStyle
                  }
                />
                {inputErrors["commissions"]?.[index]?.["bonus"] ? (
                  <InputErrorMessage
                    message={
                      inputErrors["commissions"]?.[index]?.["bonus"]
                        ?._errors?.[0]
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="mb-6">
                <label
                  for="url"
                  className={
                    inputErrors["commissions"]?.[index]?.["url"]
                      ? inputLabelErrorStyle
                      : inputLabelStyle
                  }
                >
                  URL
                </label>
                <input
                  onChange={(e) => onChangeCommissionValues(e, index)}
                  value={inputValues.commissions?.[index]?.url}
                  type="text"
                  name="url"
                  className={
                    inputErrors["commissions"]?.[index]?.["url"]
                      ? inputErrorStyle
                      : inputStyle
                  }
                />
                {inputErrors["commissions"]?.[index]?.["url"] ? (
                  <InputErrorMessage
                    message={
                      inputErrors["commissions"]?.[index]?.["url"]?._errors?.[0]
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              {/* Text Area for Schemadata */}
              <div className="mb-6">
                <label
                  for="message"
                  className={
                    inputErrors["commissions"]?.[index]?.["schemaData"]
                      ? inputLabelErrorStyle
                      : inputLabelStyle
                  }
                >
                  Product Schema
                </label>
                <textarea
                  onChange={(e) => onChangeCommissionValues(e, index)}
                  name="schemaData"
                  value={inputValues.commissions?.[index]?.schemaData}
                  rows="4"
                  className={
                    inputErrors["commissions"]?.[index]?.["schemaData"]
                      ? inputErrorStyle
                      : inputStyle
                  }
                ></textarea>
                {inputErrors["commissions"]?.[index]?.["schemaData"] ? (
                  <InputErrorMessage
                    message={
                      inputErrors["commissions"]?.[index]?.["schemaData"]
                        ?._errors?.[0]
                    }
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
          <button
            onClick={() => addCommission()}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 inline-flex items-center "
          >
            <Plus /> Add A Vendor Commission
          </button>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdateForm;
