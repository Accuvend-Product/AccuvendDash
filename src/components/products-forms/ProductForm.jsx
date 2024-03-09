import { useQuery } from '@tanstack/react-query'
import { Plus, PlusSquare, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { convertZodErrorToObject } from '../../lib/utils';
import { InputErrorMessage } from '../inputs/InputErrorMessage';
import { inputLabelErrorStyle, inputStyle , inputErrorStyle , inputLabelStyle } from '../../lib/styles';
// Product Update and Addition Form
import {z , object , string , ZodError, array, number} from "zod" 
const ProductForm = ({onSubmit = async () => null ,  vendorData = [] , closeModal,
createProductCommissionMutation,
createProductMutation}) => {
    const categories = ['AIRTIME' , 'ELECTRICITY' , 'DATA' , 'CABLE' , 'BETTING' , 'EDUCATION', 'GOVERNMENT', 'WASTE']
    const types = ['POSTPAID' , 'PREPAID']
    

    //input values 
    const [inputValues , setInputValues] = useState({})
    const onChangeValue = (e) => {
        setInputValues((prevState)=>{ return{...prevState , [e.target.getAttribute('name')]: e.target.value } })
    }
    //on change for commissions
    const onChangeCommissionValues = (e , index) => {
        
        setInputValues((prevState)=>{
            const newStateCommission = Array.from(prevState?.commissions)
            newStateCommission[index] = {...newStateCommission[index], [e.target.getAttribute('name')]: e.target.value }
            return{...prevState , commissions: newStateCommission } 
        })
        
    }

    // selecting a VendorId 

    const onChangeVendorId  = (e, index) => {
        console.log(e.target.value, index)
        setInputValues((prevState)=>{
            const newStateCommission = Array.from(prevState?.commissions)
            newStateCommission[index] = {...newStateCommission[index], vendor: e.target.value }
            return{...prevState , commissions: newStateCommission } 
        })
    }

    //input Errors 
    const [inputErrors , setInputErrors] = useState({})

    // add a commission
    const addCommission = () => {
        if (!inputValues?.commissions){ setInputValues((prevState) => { return {...prevState , commissions: []}})}
        setInputValues((prevState) => { return {...prevState , commissions: [...prevState?.commissions, {
            vendor: '',
            commission: "0",
            bonus: "0",
            schemaData: "",
            url: ''
        }]}})  
    }

    // remove a commission
    const removeCommission = (index) => {
        const newCommissions = inputValues?.commissions?.filter((_, i) => i !== index);
        setInputValues((prevState) => { return {...prevState , commissions: newCommissions}})

    }

    // Zod Validation
    const commissionSchema = object({
        vendor: string().refine(value => vendorData.map(item => item?.id).includes(value),{message: "Vendor must be one of: " + vendorData.map(item => item?.name).join(", ")}),
        commission: string().refine(value => !isNaN(parseFloat(value)) && parseFloat(value) >= 0 , {message: "Commission should be a number"}),
        bonus: string().refine(value => !isNaN(parseFloat(value)) && parseFloat(value) >= 0 , {message: "Bonus should be a number"}),
        url: string(),
        schemaData: string().refine((value) => {
            try{
               const item = JSON.parse(value)
               return true
            }catch(err){
                return false
            }
        } , {message: "The schema should be in json format"}),
        

    })
    const productValidationSchema = object({
       productCode: string(),
       productName: string(),
       category: string().refine(value => categories.includes(value),{message: "Category must be one of: " + categories.join(", ")}),
       type: string().refine(value => types.includes(value),{message: "Category must be one of: " + types.join(", ")}),
       commissions: array(commissionSchema).optional()
    })


    // submitting Form 

    const submitForm = async () => {
        setInputErrors({})
        try{
            productValidationSchema.parse(inputValues)
            // Create A Product 
            const result = await createProductMutation.mutateAsync({
                masterProductCode: inputValues.productCode,
                type: inputValues.type,
                productName: inputValues.productName,
                category: inputValues.category,
                onSuccessFunction: () => {
                    console.log('success')
                    toast.success('Product was successfully Added')
                  }, 
                  onFailureFunction: () => {
                    console.log('failure')
                    toast.error('Product could not be added')
                  }
                })
            // Get a Product id 
            const productId = result?.data?.data?.product?.id
            // 
            const schemaData = {} // this a testing placeholder for schemadata
            for(let i = 0 ; i < inputValues.commissions.length; i++){
                await createProductCommissionMutation.mutateAsync({
                    productId,
                    vendorId: inputValues?.commissions[0].vendor,
                    commission: parseFloat(inputValues?.commissions[0].commission),
                    bonus: parseFloat(inputValues?.commissions[0].bonus),
                    vendorHttpUrl: inputValues?.commissions[0].url,
                    schemaData: JSON.parse(inputValues?.commissions[0].schemaData),
                    onSuccessFunction: () => {
                        console.log('success')
                        toast.success(`Commission for Product was successfully Added`)
                      }, 
                      onFailureFunction: () => {
                        console.log('failure')
                        toast.error(`Product Commission for  could not be added`)
                      }
                    })
            }
            console.log(productId)
            closeModal()
            // toast.success('Product Was Added Successfully')
        }catch(err){
            if(err instanceof ZodError){
                console.log(err.format())
                setInputErrors(err.format())
                return
            }
            toast.error('Sorry something went wrong')
        }
    }

    

  return (
    <div>
        <form onSubmit={(e) =>{ 
            e.preventDefault()
            submitForm()
        }}>
        <div className="mb-6">
            <label for="productCode" className={inputErrors["productCode"] ? inputLabelErrorStyle : inputLabelStyle}>Product Code</label>
            <input onChange={(e)=>onChangeValue(e)} value={inputValues.productCode} type="text" name="productCode" className={inputErrors["productCode"] ? inputErrorStyle : inputStyle} />
            { inputErrors["productCode"] ? <InputErrorMessage message={inputErrors["productCode"]["_errors"][0]}/> : ""}
        </div>
        <div className="mb-6">
            <label for="productName" className={inputErrors["productName"] ? inputLabelErrorStyle : inputLabelStyle}>Product Name</label>
            <input onChange={(e)=>onChangeValue(e)} value={inputValues.productName} type="text" name="productName" className={inputErrors["productCode"] ? inputErrorStyle : inputStyle} />
            {inputErrors["productName"]? <InputErrorMessage message={inputErrors["productName"]["_errors"][0]}/>: ""}
        </div>
        <div className="mb-6">
            <label for="category" className={inputErrors["category"] ? inputLabelErrorStyle : inputLabelStyle}>Category</label>
            <select onChange={(e)=>onChangeValue(e)} value={inputValues.category} name="category" className={inputErrors["category"] ? inputErrorStyle : inputStyle}>
                <option>select option</option>
                {categories?.map((category)=><option value={category}>{category}</option>)} 
            </select>
            {inputErrors["category"]? <InputErrorMessage message={inputErrors["category"]["_errors"][0]}/>: ""}
        </div>
        <div className="mb-6">
            <label for="type" className={inputErrors["type"] ? inputLabelErrorStyle : inputLabelStyle}>Type</label>
            <select onChange={(e)=>onChangeValue(e)} value={inputValues.type} name="type" className={inputErrors["type"] ? inputErrorStyle : inputStyle}>
                <option>select option</option>
                {types?.map((type)=><option value={type}>{type}</option>)} 
            </select>
            {inputErrors["type"]? <InputErrorMessage message={inputErrors["type"]["_errors"][0]}/>: ""}
        </div>
            
        <div className='mt-6'>
            {/* Vendor Commissions */}
            <div className='mb-2.5'>Product Comission and Bonus</div>
            {inputValues?.commissions?.map((_,index)=>(<div className='mt-2.5' index={index}>
                <div className='mb-2.5'>
                    <hr/>
                </div>
                <div className='flex flex-row justify-end'>
                    <button onClick={() => removeCommission(index)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center me-2 ">
                        <Trash className='w-3 h-3'/>
                        Remove
                    </button>
                </div>
                <div className="mb-6">
                    <label for="vendor" className={inputErrors["commissions"]?.[index]?.["vendor"] ? inputLabelErrorStyle : inputLabelStyle}>Vendor</label>
                    <select name="vendor" onChange={(e)=>onChangeVendorId(e,index)} value={inputValues.commissions?.[index]?.vendor} className={inputErrors["commissions"]?.[index]?.["vendor"]  ? inputErrorStyle : inputStyle}>
                        <option>select option</option>
                        {vendorData?.map((vendorItem)=><option value={vendorItem?.id}>{vendorItem?.name}</option>)} 
                    </select>
                    {inputErrors["commissions"]?.[index]?.["vendor"]? <InputErrorMessage message={inputErrors["commissions"]?.[index]?.["vendor"]?._errors?.[0]}/>: ""}
                </div>
                <div className="mb-6">
                    <label for="commission" className={inputErrors["commissions"]?.[index]?.["commission"] ? inputLabelErrorStyle : inputLabelStyle}>Commission</label>
                    <input onChange={(e)=>onChangeCommissionValues(e,index)} value={inputValues.commissions?.[index]?.commission} type="text" name="commission" className={inputErrors["commissions"]?.[index]?.["commission"] ? inputErrorStyle : inputStyle} />
                    {inputErrors["commissions"]?.[index]?.["commission"]? <InputErrorMessage message={inputErrors["commissions"]?.[index]?.["commission"]?._errors?.[0]}/>: ""}
                </div>
                <div className="mb-6">
                    <label for="bonus" className={inputErrors["commissions"]?.[index]?.["bonus"] ? inputLabelErrorStyle : inputLabelStyle}>Bonus</label>
                    <input onChange={(e)=>onChangeCommissionValues(e,index)} value={inputValues.commissions?.[index]?.bonus} type="text" name="bonus" className={inputErrors["commissions"]?.[index]?.["bonus"] ? inputErrorStyle : inputStyle} />
                    {inputErrors["commissions"]?.[index]?.["bonus"]? <InputErrorMessage message={inputErrors["commissions"]?.[index]?.["bonus"]?._errors?.[0]}/>: ""}
                </div>
                <div className="mb-6">
                    <label for="url" className={inputErrors["commissions"]?.[index]?.["url"] ? inputLabelErrorStyle : inputLabelStyle}>URL</label>
                    <input onChange={(e)=>onChangeCommissionValues(e,index)} value={inputValues.commissions?.[index]?.url} type="text" name="url" className={inputErrors["commissions"]?.[index]?.["url"] ? inputErrorStyle : inputStyle} />
                    {inputErrors["commissions"]?.[index]?.["url"]? <InputErrorMessage message={inputErrors["commissions"]?.[index]?.["url"]?._errors?.[0]}/>: ""}
                </div>
                {/* Text Area for Schemadata */}
                <div className='mb-6'>
                    <label for="message" className={inputErrors["commissions"]?.[index]?.["schemaData"] ? inputLabelErrorStyle : inputLabelStyle}>Product Schema</label>
                    <textarea onChange={(e)=>onChangeCommissionValues(e,index)} name="schemaData" value={inputValues.commissions?.[index]?.schemaData} rows="4" className={inputErrors["commissions"]?.[index]?.["schemaData"] ? inputErrorStyle : inputStyle} ></textarea>
                    {inputErrors["commissions"]?.[index]?.["schemaData"]? <InputErrorMessage message={inputErrors["commissions"]?.[index]?.["schemaData"]?._errors?.[0]}/>: ""}
                </div>
            </div>))}
            <button onClick={()=>addCommission()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 inline-flex items-center ">
               <Plus/> Add A Vendor Commission
            </button>

            <div className='flex justify-end'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                    Submit Product
                </button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default ProductForm