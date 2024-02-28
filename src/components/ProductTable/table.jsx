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
import { Pagination } from "../Pagination";

import columns from "./columns";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Loader,
  Search,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { add, addDays } from "date-fns";
import {
  DateFilter,
  StatusFilter,
  DiscoFilter,
  PartnerFilter,
} from "../tableFilters";
import {
  convertToISOWithLastMinute,
  convertToISOWithMidnight,
  convertToISOWithNextDay,
  convertToISOWithPreviousDay,
} from "../../lib/utils";
import ActiveFilter from "../ActiveFilter";
import LoadingSpinner from "../ui/loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const ProductTable = ({
  tableData,
  isPartnerTable,
  dashboardType,
  setFilter = (item) => null,
  setPagination = () => null,
  pagination = {},
  filter = {},
  totalNumberRecords = 0,
}) => {
  const [data, setData] = useState(tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);

  const navigate = useNavigate();

  /**
   * Pagination
   */

  //   table initial state
  const table = useReactTable({
    data,
    columns,
    pageCount: isNaN(totalNumberRecords / pagination?.limit)
      ? 0
      : Math.ceil(totalNumberRecords / pagination?.limit),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,

    state: {
      pagination,
      sorting: sorting,
      globalFilter: filtering,
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

    table.setColumnFilters(newFilters);

    // Reset currentPage to 1 whenever filtering is applied
    setCurrentPage(1);
    setPagination((prevState) => ({ ...prevState, page: 1 }));
  };

  const handleStatusSelect = (status) => {
    setActiveFilter("STATUS");
    setFilter({
      ...filter,
      status,
    });
    setActiveFilter(null);
    setPagination((prevState) => ({ ...prevState, page: 1 }));
  };

  const handleDiscoSelect = (disco) => {
    setActiveFilter("DISCO");
    setFilter({
      ...filter,
      disco,
    });
    setActiveFilter(null);
    setPagination((prevState) => ({ ...prevState, page: 1 }));
  };

  // handle date select
  const handleDateSelect = (_selectedDate) => {
    console.log("Selected Date:", _selectedDate);

    // setSelectedDate(_selectedDate)

    setFilter({
      ...filter,
      startDate: new Date(_selectedDate).toISOString().split("T")[0],
      endDate: convertToISOWithNextDay(_selectedDate).split("T")[0],
    });
    setPagination((prevState) => ({ ...prevState, page: 1 }));
    setActiveFilter(null);
  };

  //  handle click outside

  const handlePartnerSelect = (partner) => {
    setActiveFilter("PARTNER");
    setFilter({
      ...filter,
      partnerId: partner,
    });
    setPagination((prevState) => ({ ...prevState, page: 1 }));
    setActiveFilter(null);
  };

  const goToPage = (pageNumber) => {
    setPagination((prevState) => ({ ...prevState, page: pageNumber }));
    setCurrentPage(pageNumber);
  };

  return (
    <div className="">
      <div className="flex md:flex-row flex-col gap-y-3 md:items-center justify-between mb-4">
        <div className="flex space-x-4 items-center">
          <p className="text-body1 font-semibold">Filter by</p>
          {/* {!isPartnerTable && (
            <PartnerFilter
              isCustomer={dashboardType === "CUSTOMER"}
              isActive={filter?.partnerId}
              handlePartnerSelect={handlePartnerSelect}
            />
          )}
          <DiscoFilter
            isActive={filter?.disco}
            handleDiscoSelect={handleDiscoSelect}
          />
          <DateFilter
            handleDateSelect={handleDateSelect}
            isActive={filter?.startDate || filter?.endDate}
          />
          <StatusFilter
            isActive={filter?.status}
            handleStatusSelect={handleStatusSelect}
          /> */}
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
            }}
            type="text"
            className="px-2 py-1.5 rounded-r-md bg-inherit text-body1 outline-none focus:outline-none"
            placeholder="Search records"
          />
        </div>
      </div>

      <div className="min-h-[40vh] min-w-full overflow-x-scroll">
        <table className="min-w-full border-b border-[#F8F7F7]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#F8F7F7] text-body2">
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      onClick={header.column.getToggleSortingHandler()}
                      key={header.id}
                      className={`py-3 px-2 font-bold border-b border-[#F8F7F7] ${
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
                  );
                })}
                <th></th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <ProductTableRow row={row} tableData={tableData} />
            ))}
          </tbody>
        </table>
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
          getCanPreviousPage={pagination?.page > 1}
          getCanNextPage={pagination?.page < table.getPageCount()}
        />
      )}
    </div>
  );
};

const ProductTableRow = ({ row, tableData }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <tr
        className={`border-bborder-[#F8F7F7] hover:bg-blue-50 hover:cursor-pointer hover:text-blue-800 hover:underline`}
        key={row.id}
        // onClick={() =>
        //   navigate(
        //     `/transaction/details/${
        //       tableData[row.index]["transaction reference"]
        //     }`
        //   )
        // }
      >
        {row.getVisibleCells().map((cell) => {
          return (
            <td key={cell.id} className={`py-2 px-2 text-left`}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
        <td className="py-2 px-2 text-left">
          <div className="grid grid-cols-2 gap-1">
            <button className="font-medium text-blue-600 hover:underline">
              Edit
            </button>
            <button
              className="font-medium text-blue-600 hover:underline"
              onClick={() => setShowDetails(prevState => !prevState)}
            >
              {!showDetails ? 'View': 'Hide'}
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={12}>
          {showDetails && (
            <ProductCommissionRow ProductId={tableData[row.index]["id"]} />
          )}
        </td>
      </tr>
    </>
  );
};
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ProductCommissionRow = ({ ProductId }) => {
  const { isloading, data, isError } = useQuery({
    queryKey: [`products-${ProductId}`],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/master/product/info?productId=${ProductId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return response?.data?.data?.product?.vendorProducts;
      } catch (err) {
        throw err;
      }
    },
  });

  const TableHeader = [
    { key: "vendorName", Text: "Vendor" },
    { key: "bundleAmount", Text: "Bundle Amount" },
    { key: "commission", Text: "Commission" },
    { key: "bonus", Text: "Bonus" },
    { key: "vendorCode", Text: "Vendor Code" },
    { key: "vendorHttpUrl", Text: "URL" },
    { key: "schemaData", Text: "Schema" },
  ];
  return (
    <>
      {isloading ? (
        <div className="flex items-center justify-center h-56">
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
        </div>
      ) : (
        <div className="px-7">
          <table className="border-b ">
            <thead>
              <tr className="bg-[#d6d6d6] text-body2">
                {TableHeader?.map((item, index) => (
                  <th
                    className={`py-1 px-2 text-sm border-b bg-[#d6d6d6] text-left`}
                  >
                    {item?.Text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((row, index) => (
                <tr key={index}>
                  {TableHeader?.map((cell, index) => {
                    if (cell?.key === "schemaData")
                      return (
                        <td className={`py-2 px-2 text-left`}>
                          <div class="overflow-scroll max-h-full">
                            <pre>
                              <code
                                id="code-block"
                                class="text-sm text-gray-500 whitespace-pre"
                              >
                                {JSON.stringify(row[cell?.key],null,2)}
                              </code>
                            </pre>
                          </div>
                        </td>
                      );
                    if (cell?.key === "vendorHttpUrl")
                    return (
                      <td className={`py-2 px-2 text-left`}>
                        <a className="font-medium text-blue-600 underline cursor-pointer" href={row[cell?.key] ? row[cell?.key] : "null"}>{row[cell?.key] ? row[cell?.key] : "null"}</a>
                      </td>
                    );
                    return (
                      <td className={`py-2 px-2 text-left`}>
                        {row[cell?.key] ? row[cell?.key] : "null"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
