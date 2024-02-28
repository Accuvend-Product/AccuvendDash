import React, { useMemo } from 'react'
import { mapProductToObject, useGetProducts } from '../api/getProducts';

 //   format date
 const formattedDate = (inputDate) => {
    // Format the date
    const dateObject = new Date(inputDate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateObject
    );
    return formattedDate;
  };

const ActiveFilter = ({filter , setFilter, isAdmin}) => {
    // get all current products 
    //map item to key using memo
    const {data , isError , isLoading} = useGetProducts()
    const mapProductCodesToName = useMemo(()=>{
        return mapProductToObject(data?.data?.data?.products)
    },[data])
  return (
    <>
    {/* Active Filters Tags */}
    {(filter?.disco || filter?.startDate || filter?.endDate || filter?.status || filter?.partnerId)&& <div className="flex mb-4 gap-3">
                <span>Active Filters</span>

                {filter?.partnerId && <span id="badge-dismiss-dark" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Partner : {filter?.partnerId?.companyName}
                    <button onClick={() => {
                        const _filter = {...filter} 
                        delete _filter?.partnerId
                        setFilter(_filter)
                    }} type="button" className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Remove badge</span>
                    </button>
                </span>}
                
                {filter?.disco && <span id="badge-dismiss-dark" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Disco : {filter?.disco}
                    <button onClick={() =>{
                        const _filter = {...filter} 
                        delete _filter?.disco
                        setFilter(_filter)
                    }} type="button" className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Remove badge</span>
                    </button>
                </span>}

                {filter?.disco && <span id="badge-dismiss-dark" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Biller : {mapProductCodesToName[filter?.disco]}
                    <button onClick={() =>{
                        const _filter = {...filter} 
                        delete _filter?.disco
                        setFilter(_filter)
                    }} type="button" className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Remove badge</span>
                    </button>
                </span>}
                
                { (filter?.startDate || filter?.endDate) && <span id="badge-dismiss-dark" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Date : {formattedDate(new Date(filter?.startDate).toISOString())}
                    <button onClick={() => {
                        const _filter = {...filter} 
                        delete _filter?.startDate
                        delete _filter?.endDate
                        setFilter(_filter)
                    }} type="button" className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Remove badge</span>
                    </button>
                </span>}
                {filter?.status && <span id="badge-dismiss-dark" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Status : {filter?.status}
                    <button onClick={() => {
                        const _filter = {...filter} 
                        delete _filter?.status
                        setFilter(_filter)
                    }} type="button" className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Remove badge</span>
                    </button>
                </span>}

                
            </div>}
    </>
  )
}

export default ActiveFilter