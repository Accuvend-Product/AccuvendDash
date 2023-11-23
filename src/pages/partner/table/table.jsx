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
import { Link } from "react-router-dom";

import columns from "../table/columns";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Search,
} from "lucide-react";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { add, addDays } from "date-fns";

const PartnerTransactionTable = ({ tableData }) => {
  const [data, setData] = useState(tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [activeFilter, setActiveFilter] = useState("DISCO");
  const [activeStatusFilter, setActiveStatusFilter] = useState(null);
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);

  const [activeDiscoFilter, setActiveDiscoFilter] = useState(null);
  const dropdownRef = useRef(null);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  //   table initial state

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pageIndex: currentPage - 1,
    },
    state: {
      sorting: sorting,
      globalFilter: filtering,
    //   add filter for sorting the table by date range for transaction date
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

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

    // if (filter === "DATE") {
    // //   setIsDateRangeVisible(!isDateRangeVisible);
    // }

    table.setColumnFilters(newFilters);

    // Reset currentPage to 1 whenever filtering is applied
    setCurrentPage(1);
  };

  const handleStatusSelect = (status) => {
    setActiveFilter("STATUS");
    setActiveStatusFilter(status);

    // Apply the filter logic here based on the selected filter
    let newFilters = [
      {
        id: "status",
        value: status,
      },
    ];

    table.setColumnFilters(newFilters);

    // Reset currentPage to 1 whenever filtering is applied
    setCurrentPage(1);
    // Optionally, you can also close the dropdown after selecting a status
    setActiveFilter(null);
  };

  // handle date select
  const handleDateSelect = (startDate, endDate) => {
    const formattedStartDate = formattedDate(startDate.toISOString());
    const formattedEndDate = formattedDate(
      endDate ? endDate.toISOString() : addDays(new Date(), 1)
    );

    setIsDateRangeVisible(false);

    const newFilters = [
      {
        id: "transaction date", // Make sure this matches the column's accessor key
        value: formattedStartDate,
        operator: ">=",
      },
      {
        id: "transaction date", // Make sure this matches the column's accessor key
        value: formattedEndDate,
        operator: "<=",
      },
    ];

    table.setColumnFilters(newFilters);

    // reset the date range
    setDateRange([
        { 
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ])

    // Reset currentPage to 1 whenever filtering is applied
    setCurrentPage(1);
  };

  //  handle click outside
  const handleClickOutside = (event) => {
    if (
      isDateRangeVisible &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.classList.contains("rdrDateRangeWrapper")
    ) {
      setIsDateRangeVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveFilter(null);
    }
  };

  const goToPage = (pageNumber) => {
    table.setPageIndex(pageNumber - 1); // Subtract 1 since pageIndex is zero-based
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4 items-center">
          <p className="text-body1 font-semibold">Filter by</p>
          <button
            onClick={() => handleFilterClick("DISCO")}
            className={`rounded-full px-4 py-1 border transition-all border-primary ${
              activeFilter === "DISCO"
                ? "bg-primary text-white font-semibold"
                : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
            }`}
          >
            DISCO
          </button>
          <div className="relative">
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => handleFilterClick("DATE")}
                className={`rounded-full px-4 py-1 border transition-all border-primary ${
                  activeFilter === "DATE"
                    ? "bg-primary text-white font-semibold"
                    : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
                }`}
              >
                DATE
              </button>
              {isDateRangeVisible && (
                <div className="absolute mt-10 bg-white border border-gray-200 rounded shadow-md z-10 p-4">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                  />
                  <button
                    className="mt-2 px-4 py-1 border border-primary rounded-full bg-primary text-white font-semibold"
                    onClick={() => {
                      setIsDateRangeVisible(false);
                      handleDateSelect(
                        dateRange[0].startDate,
                        dateRange[0].endDate
                      ); // Call handleDateSelect on Apply button click
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => handleFilterClick("STATUS")}
                className={`rounded-full px-4 py-1 border transition-all border-primary ${
                  activeFilter === "STATUS"
                    ? "bg-primary text-white font-semibold"
                    : "hover:border-transparent hover:bg-primary hover:text-white text-body2 font-semibold"
                }`}
              >
                STATUS
              </button>
              {activeFilter === "STATUS" && (
                <div className="absolute mt-1 py-2 bg-white border border-gray-200 rounded shadow-md z-10">
                  <button
                    type="button"
                    onClick={() => handleStatusSelect("Pending")}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      activeStatusFilter === "Pending" ? "bg-gray-100" : ""
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusSelect("Failed")}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      activeStatusFilter === "Failed" ? "bg-gray-100" : ""
                    }`}
                  >
                    Failed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusSelect("Complete")}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      activeStatusFilter === "Completed" ? "bg-gray-100" : ""
                    }`}
                  >
                    Completed
                  </button>
                </div>
              )}
            </div>
          </div>
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
            }}
            type="text"
            className="px-2 py-1.5 rounded-r-md bg-inherit text-body1 outline-none focus:outline-none"
            placeholder="Search records"
          />
        </div>
      </div>

      <table className="min-w-full border-b border-[#F8F7F7]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-[#F8F7F7] text-body2">
              {headerGroup.headers.map((header, index) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  key={header.id}
                  className={`py-5 px-2 font-bold border-b border-[#F8F7F7] ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${
                    index === headerGroup.headers.length - 1
                      ? "rounded-tr-lg"
                      : ""
                  } text-left`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    {
                      asc: (
                        <ArrowUp className="inline-flex w-4 h-4 ml-1 items-center" />
                      ),
                      desc: (
                        <ArrowDown className="inline-flex w-4 h-4 ml-1 items-center" />
                      ),
                    }[header.column.getIsSorted() ?? null]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className={`border-b border-[#F8F7F7] hover:bg-blue-50`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`py-5 px-2 ${
                    cell.column.id === "status" ? "text-center" : "text-left"
                  }`}
                >
                  <Link
                    to={`/partner/transaction/details/${
                      tableData[cell.row.index]["transaction reference"]
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}

      <Pagination
        currentPage={currentPage}
        totalPages={table.getPageCount()}
        goToPage={goToPage}
        table={table}
      />
    </div>
  );
};

export default PartnerTransactionTable;

const Pagination = ({ currentPage, totalPages, goToPage, table }) => {
  const handlePrevPage = () => {
    goToPage(currentPage - 1);
  };

  const handleNextPage = () => {
    goToPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex justify-between items-center gap-5">
        <span className="mr-2">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            disabled={!table.getCanPreviousPage()}
            className={`px-1.5 py-1 rounded-l-md text-white bg-primary ${
              !table.getCanPreviousPage() ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleNextPage}
            disabled={!table.getCanNextPage()}
            className={`px-1.5 py-1 rounded-r-md text-white bg-primary ${
              !table.getCanNextPage() ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
