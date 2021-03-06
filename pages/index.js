import Head from "next/head";
import { useMemo } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import cn from "classnames";
import SelectFilter from "@/components/SelectFilter";
import SearchFilter from "@/components/SearchFilter";

const Home = ({ logData }) => {
  const { result } = logData;
  const data = useMemo(() => result.auditLog, [result.auditLog]);

  const columns = useMemo(
    () => [
      {
        Header: "Log ID",
        accessor: "logId", // accessor is the "key" in the data
        Filter: SearchFilter,
      },
      {
        Header: "Application Type",
        accessor: "applicationType",
        Filter: SelectFilter,
      },
      {
        Header: "Application Id",
        accessor: "applicationId",
        Filter: SearchFilter,
      },
      {
        Header: "Action",
        accessor: "actionType",
        Filter: SelectFilter,
      },

      {
        Header: "Date",
        accessor: "creationTimestamp",
      },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: SearchFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    rows,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full p-5">
      <Head>
        <title>Developer Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <table className="w-full " {...getTableProps()}>
        <thead className="">
          {headerGroups.map((headerGroup, index) => (
            <tr className="" key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  className="text-left border-b border-gray-400  cursor-pointer my-4 "
                >
                  <div className="">
                    <div className="flex flex-col  ">
                      <div className="mb-5">
                        {column.canFilter ? column?.render("Filter") : null}
                      </div>

                      <div
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="flex items-center "
                      >
                        {column.render("Header")}

                        <img
                          src="/up.svg"
                          className={cn(
                            "h-4 bg-gray-200 mx-2 p-1  rounded-full  transition delay-75",
                            {
                              "bg-gray-300 ": column.isSorted,
                              "rotate-180": column.isSortedDesc,
                            }
                          )}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="shadow-md pt-5" {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                className="border-b border-gray-400 last:border-0"
                key={rowIndex}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()} className="p-3">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full text-center mt-4  ">
        {pageOptions.map((page, index) => (
          <button
            className={cn("mx-2 font-bold px-2", {
              "text-black bg-gray-200 border-0 rounded-md ":
                index === pageIndex,
              "text-gray-500": index !== pageIndex,
            })}
            onClick={() => gotoPage(index)}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`
  );
  const logData = await res.json();

  // Pass data to the page via props
  return { props: { logData } };
}

export default Home;
