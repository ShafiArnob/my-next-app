"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { USERS } from "../data";
import { User } from "../types";
import moment from "moment";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISPLAY_COLUMN_SIZE = 100;

const columnHelper = createColumnHelper<User>();

export const useTableData = () => {
  const [data, setData] = useState(USERS);

  const columns = useMemo(
    () => [
      // columnHelper.group({
      //   id: "info",
      //   header: "Info",
      //   columns: [
      //     columnHelper.accessor("name", {
      //       id: "name",
      //       header: "Name",
      //     }),
      //     columnHelper.accessor("birthDate", {
      //       id: "birthDate",
      //       header: "Birth Date",
      //       cell: ({ getValue }) => moment(getValue()).format("DD/MM/YY"),
      //     }),
      //   ],
      // }),
      columnHelper.display({
        id: "selection",
        header: () => (
          <div className="flex justify-center items-center">
            <Checkbox />
          </div>
        ),
        cell: () => (
          <div className="flex justify-center items-center">
            <Checkbox />
          </div>
        ),
      }),
      columnHelper.display({
        id: "expand",
        // header: () => (
        //   <div className="flex justify-center items-center">
        //     <Trash />
        //   </div>
        // ),
        cell: () => (
          <div className="flex justify-center items-center">
            <Button variant="outline" size="icon" aria-label="Delete row">
              <PlusIcon />
            </Button>
          </div>
        ),
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
      }),
      columnHelper.accessor("avatar", {
        id: "avatar",
        header: "Avatar",
        cell: ({ getValue }) => (
          <div className="flex items-center justify-center">
            <img
              alt={getValue()}
              src={getValue()}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
      }),
      columnHelper.accessor("birthDate", {
        id: "birthDate",
        header: "Birth Date",
        cell: ({ getValue }) => moment(getValue()).format("DD/MM/YY"),
      }),
      columnHelper.accessor("age", {
        id: "age",
        header: "age",
        footer: ({ table }) =>
          table.getFilteredRowModel().rows.reduce((acc, val) => {
            acc += Number(val.getValue("age"));
            return acc;
          }, 0),
      }),
      // columnHelper.accessor((user) => `${user.name} ${user.email}`, {
      //   id: "info",
      //   header: "Information",
      //   size: 400,
      // }),

      columnHelper.display({
        id: "delete",
        header: () => (
          <div className="flex justify-center items-center">
            <Trash />
          </div>
        ),
        cell: () => (
          <div className="flex justify-center items-center">
            <Button variant="destructive" size="icon" aria-label="Delete row">
              <Trash />
            </Button>
          </div>
        ),
      }),
    ],
    []
  );

  return { columns, data };
};
