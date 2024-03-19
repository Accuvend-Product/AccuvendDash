import React, { useEffect , useLayoutEffect } from "react";
import { useState } from "react";
import { useGetTransactions } from "../../api/Transaction";
import { convertToISOWithNextDay, exportCSVFile , generateCSVContent} from "../../lib/utils";
import { useModal } from "../../hooks/useModal";
import { useMapProducts } from "../../hooks/useMapProducts";


// props.columns in format { accessorKey: string , header: string } 
// props.filter as object 
const ExportToCsvbutton = (props) => {
  const [generatingCsv, setGeneratingCsv] = useState(false);
  const [errorGeneratingCsv, setErrorGeneratingCsv] = useState(null);

  const {
    pagination,
    filters,
    setFilters,
    isLoading,
    tableData,
    setPagination,
    refetch,
    asyncReFetch,
  } = useGetTransactions({}, null, false);
  const mapProducts = useMapProducts()

  useEffect(() => {
    const _date = Date.now();
    if (props.filter?.startDate && props.filter?.endDate) setFilters({...props.filter});
    else
      setFilters({
        ...props.filter,
        startDate: new Date(_date).toISOString().split("T")[0],
        endDate: convertToISOWithNextDay(_date).split("T")[0],
      });
    setPagination({})
  }, [props.filter]);

  const generateCSV = async () => {
    // API call
    setGeneratingCsv(true)
    openModal()
    try{
      const data = await asyncReFetch()
      
      //generate csv content 
      const csvContent2 = generateCSVContent(props.columns?.reduce((acc,prev) => {
        const baseObject = {}
        baseObject[prev.accessorKey] = prev.header
        return {...baseObject , ...acc}
      },{}), data , (value , key) => key === "biller" ? mapProducts[value] : value )
      
      // generating the csv
      const csvContent1 = generateCSVContent(Object.keys(filters).reduce((acc, prev) => {
        const baseObject = {}
        baseObject[prev] = prev
        return {...baseObject , ...acc}
      },{}),[filters])
      

      const fullCsvContent = 'filters'+ '\r\n' +csvContent1 + '\r\n' + 'data' + '\r\n' + csvContent2
      exportCSVFile('transaction-export-'+ new Date().toISOString() , fullCsvContent)


    }catch(error){
      setErrorGeneratingCsv(error)
      console.log(error)
    }
    setGeneratingCsv(false)
  };

  const {openModal , closeModal , ModalProvider } = useModal('Export Data')
  
  return (
    <>
      <>
        <ModalProvider>
          <div>
              {
                errorGeneratingCsv ? <div className="flex flex-col item-center text-center justify-center">
                  Oops Sorry we could'nt generate a csv for 
                </div>:<>
                {
                  generatingCsv ? <div className="flex flex-col item-center text-center justify-center">
                    Please Give us a moment while we generate this data 
                  </div> : <div className="flex flex-col item-center text-center justify-center">
                    Thank you Data has been generated and started downloading 
                  </div>
                } 
                </>
              }
          </div>
        </ModalProvider>
      </>
      <button
        type="button"
        onClick={() => generateCSV()}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
      >
        Export Data
      </button>
    </>
  );
};



export default ExportToCsvbutton;
