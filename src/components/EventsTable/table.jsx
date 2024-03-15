/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { Pagination } from "../Pagination";

import columns from "./columns";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Search,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { add, addDays } from "date-fns";
import { DateFilter, StatusFilter, DiscoFilter, PartnerFilter, BillerFilter } from "../tableFilters";
import {
  convertToISOWithLastMinute,
  convertToISOWithMidnight,
  convertToISOWithNextDay,
  convertToISOWithPreviousDay,
} from "../../lib/utils";
import { EventTimeline } from "./components";
import ActiveFilter from "../ActiveFilter";
import { getStatusClass } from "../OrderConfirmation/commons";

const VITE_ENV_ADMIN =  import.meta.env.VITE_ENV_ADMIN

export const EventTable = ({
  tableData,
  isPartnerAdminPage,
  isPartnerTable = false,
  setFilter = (item) => null,
  setPagination = () => null,
  pagination = {},
  filter = {},
  totalNumberRecords,
}) => {
  const [data, setData] = useState(tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  let audit_report_base_link = ''

  if(VITE_ENV_ADMIN === 'TEST'){
    audit_report_base_link = 'http://auditreport.accuvend.ng/report/test/'
  }else if(VITE_ENV_ADMIN === 'SANDBOX'){
    audit_report_base_link = 'http://auditreport.accuvend.ng/report/sandbox/'
  }else{
    audit_report_base_link = 'http://auditreport.accuvend.ng/report/'
  }
  
  

  
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);

  const navigate = useNavigate();
  const [accordionSelectedIndex, setAccordionSelectedIndex] = useState(null);

  const pageSize = 8;

  //   table initial state
  const table = useReactTable({
    data,
    columns,
    pageCount: isNaN(totalNumberRecords / pagination?.limit) ? 0 : Math.ceil(totalNumberRecords / pagination?.limit),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    

    state: {
      pagination,
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

 

  // handle filter click
  const handleFilterClick = (filter) => {
    if (filter === "DATE") {
      setIsDateRangeVisible(!isDateRangeVisible);
    } else {
      // Close the date range calendar if clicking on a different filter
      setIsDateRangeVisible(false);
    }
    setActiveFilter(filter);

    console.log(activeFilter);
    console.log("filter", filter);

    // Apply the filter logic here based on the selected filter
    let newFilters = [];

    table.setColumnFilters(newFilters);

    // Reset currentPage to 1 whenever filtering is applied
    setCurrentPage(1);
    setPagination(prevState => ({...prevState , page: 1}))
  };

  const handleStatusSelect = (status) => {
    setActiveFilter("STATUS");
    setFilter({
      ...filter,
      status,
    });
    setPagination(prevState => ({...prevState , page: 1}))
    setActiveFilter(null);
  };

  const handleDiscoSelect = (disco) => {
    setActiveFilter("DISCO");
    setFilter({
      ...filter,
      disco,
    });
    setPagination(prevState => ({...prevState , page: 1}))
    setActiveFilter(null);
  };

  const handlePartnerSelect = (partner) => {
    setActiveFilter("PARTNER");
    setFilter({
      ...filter,
      partnerId : partner,
    });
    setPagination(prevState => ({...prevState , page: 1}))
    setActiveFilter(null);
  }

  // handle date select
  const handleDateSelect = (_selectedDate) => {
    console.log("Selected Date:", _selectedDate);

    // setSelectedDate(_selectedDate)

    setFilter({
      ...filter,
      startDate: new Date(_selectedDate).toISOString().split("T")[0],
      endDate: convertToISOWithNextDay(_selectedDate).split("T")[0],
    });
    setPagination(prevState => ({...prevState , page: 1}))
    setActiveFilter(null);
  };

  //  handle click outside

  const goToPage = (pageNumber) => {
    setPagination(prevState => ({...prevState , page: pageNumber}))
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4 items-center">
          <p className="text-body1 font-semibold">Filter by</p>
          <PartnerFilter isActive={filter?.partnerId} handlePartnerSelect={handlePartnerSelect}/>
          {/* <DiscoFilter isActive={filter?.disco} handleDiscoSelect={handleDiscoSelect}/> */}
          <BillerFilter isActive={filter?.disco} handleDiscoSelect={handleDiscoSelect}/>
          <DateFilter
            handleDateSelect={handleDateSelect}
            isActive={filter?.startDate || filter?.endDate}
          />
          <StatusFilter isActive={filter?.status} handleStatusSelect={handleStatusSelect}/>
        </div>

        {/* seach area */}
        <div className="flex items-center bg-[#F7F7F7] p-1 rounded-[8px]">
          <button className="p-2 rounded-l-md">
            <Search className="w-4 h-4 text-body1" />
          </button>
          <input
            value={filtering}
            onChange={(e) => {
              setFiltering(e.target.value);
              setCurrentPage(1);
              setPagination(prevState => ({...prevState , page: 0}))
            }}
            type="text"
            className="px-2 py-1.5 rounded-r-md bg-inherit text-body1 outline-none focus:outline-none"
            placeholder="Search records"
          />
        </div>
      </div>

      <ActiveFilter filter={filter} setFilter={(value)=>{
        setPagination(prevState => ({...prevState , page: 1}))
        setFilter(value)
        }}/>


      {/* card container */}
      <div>
        {table.getRowModel().rows.map((row) => (
          <div
            className="my-5 py-5 px-3 border-b-2 hover:bg-slate-50"
            key={row.id}
          >
            <div className="flex gap-x-2 mb-3 items-center justify-between">
              <div>
                {" "}
                <span className="font-extrabold">
                  {tableData[row.index]["customer name"]}
                </span>{" "}
                <span className="text-sm mr-4">
                  ( {tableData[row.index]["meter number"]} )
                </span>
                <span className="text-sm mr-4 ">
                  {/* ( {tableData[row.index]["meter number"]} ) */}
                  {row.getVisibleCells().filter((cell) => cell.column.id === "disco").map((cell) => {
                    return <>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}</>
                  })}
                </span>
                <span className={`text-xs font-medium me-2 px-2.5 py-1 rounded-full ${
                  (()=>{
                    const statusColor = getStatusClass(tableData[row.index]["status"])
                    return statusColor
                  })()
                }`}> 
                  {tableData[row.index]["status"]}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  accordionSelectedIndex === row.index
                    ? setAccordionSelectedIndex(null)
                    : setAccordionSelectedIndex(row.index)
                }
                className="flex items-center justify-between py-5 font-medium rtl:text-right text-gray-500 gap-3"
                data-accordion-target="#accordion-flush-body-1"
                aria-expanded="true"
                aria-controls="accordion-flush-body-1"
              >
                <span>
                  {accordionSelectedIndex === row.index ? "Hide" : "Show"}{" "}
                  Information
                </span>
                {accordionSelectedIndex === row.index ? <Minus /> : <Plus />}
              </button>
            </div>
            <div className="mb-3">
              <span>Transaction Audit Report : </span>
              <a className="font-medium text-blue-600 underline" href={`${audit_report_base_link}${tableData[row.index]["transaction reference"]}`} target="_blank">Click here</a>
            </div>
            {(accordionSelectedIndex === row.index) && <>
            
            {row.getVisibleCells().map(
              (cell) =>
                cell.column.id !== "events" &&
                cell.column.id !== "customer name" &&
                cell.column.id !== "meter number" && 
                cell.column.id !== "disco" &&
                (
                  <div
                    className={`flex gap-x-2 text-sm`}
                    key={cell.id}
                  >
                    <span>
                      {cell.column.columnDef.header} -{" "}
                    </span>{" "}
                    <span>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                    
                  </div>
                )
            )}</>}

            {/* {row.getVisibleCells().map((cell) => cell.column.id === 'events' &&  (
                        <div className="mt-7">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    ))} */}

            <div className="mt-7">
              <EventTimeline
                events={tableData[row.index]["events"]}
                originalRow={tableData[row.index]}
                showInfo={(accordionSelectedIndex === row.index)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Display "No data to show" message when table is empty */}
      {table.getRowModel().rows.length === 0 && (
        <div className="text-center mt-4">No data to show</div>
      )}

      {/* Pagination */}
      {table.getRowModel().rows.length > 0 && (
        <Pagination
          currentPage={pagination?.page}
          totalPages={table.getPageCount()}
          goToPage={goToPage}
          getCanPreviousPage={(pagination?.page > 0)} 
          getCanNextPage={pagination?.page < table.getPageCount() }
        />
      )}
    </div>
  );
};

// export default TransactionTable;


