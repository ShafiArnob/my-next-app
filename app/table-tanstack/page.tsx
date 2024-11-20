/* eslint-disable react/jsx-key */
"use client";

import React from "react";
import { useTableData } from "./hooks/useTableData";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const TableTanstack = () => {
  const { columns, data } = useTableData();
  console.log(columns, data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-screen">
      <div className="h-[98vh] flex flex-col gap-2 p-2 grow">
        <div className="flex items-center"></div>
        <div className="flex-1 overflow-auto">
          <table style={{ overflow: "auto" }}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <th
                          key={index}
                          style={{ width: header.getSize() }}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      );
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
      </div>
    </div>
  );
};

export default TableTanstack;
