/* eslint-disable react/jsx-key */
"use client";

import React from "react";
import { useTableData } from "./hooks/useTableData";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "./types";
import {
  ArrowBigDown,
  ArrowBigUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  EllipsisVertical,
} from "lucide-react";
import { fuzzyFilter } from "./utils/Table.utils";
import { Input } from "@/components/ui/input";

const Pagination = ({ table }: { table: Table<User> }) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft />
      </Button>
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
      <Button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight />
      </Button>
      <p className="text-sm">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </p>
    </div>
  );
};

const TableHeader = ({ header }: { header: Header<User, unknown> }) => {
  const isSorted = header.column.getIsSorted();

  return (
    <th
      style={{ width: header.getSize(), position: "relative" }}
      colSpan={header.colSpan}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span
            style={{
              position: "absolute",
              right: 4,
              top: 10,
              color: "black",
            }}
            className="menu bg-gray-700 rounded-sm"
          >
            <EllipsisVertical />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-5">
          <DropdownMenuLabel>Sort</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            onClick={header.column.getToggleSortingHandler()}
          >
            {isSorted === "desc" ? "Sort Asc" : "Sort Desc"}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex justify-center gap-1 items-center">
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        {isSorted && (
          <div>
            {isSorted === "desc" && <ArrowBigUp />}
            {isSorted === "asc" && <ArrowBigDown />}
          </div>
        )}
      </div>
    </th>
  );
};

const TableTanstack = () => {
  const { columns, data } = useTableData();
  // console.log(columns, data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    getPaginationRowModel: getPaginationRowModel(),
  });
  // console.log(table);

  return (
    <div className="w-screen">
      <div className="h-[98vh] flex flex-col gap-2 p-2 grow">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Search..."
            className="w-[300px] ml-2"
            onChange={(e) => {
              console.log(e.target.value);

              return table.setGlobalFilter(e.target.value);
            }}
          />
        </div>
        <div className="flex-1 overflow-auto">
          <table style={{ overflow: "auto" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      return <TableHeader key={index} header={header} />;
                    })}
                  </tr>
                );
              })}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              {table.getFooterGroups().map((footerGroup) => {
                return (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((footer, index) => {
                      return (
                        <td key={index}>
                          {footer.isPlaceholder
                            ? null
                            : flexRender(
                                footer.column.columnDef.footer,
                                footer.getContext()
                              )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tfoot>
          </table>
        </div>
        <div>
          <Pagination table={table} />
        </div>
      </div>
    </div>
  );
};

export default TableTanstack;
