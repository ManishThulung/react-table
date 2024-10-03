"use client";

import { createColumn } from "@/components/Columns";
import { DataTable } from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IPosts {
  userId: string;
  title: string;
  body: string;
  action: any;
}

const columns: ColumnDef<IPosts>[] = [
  createColumn("userId", "userId"),
  createColumn("title", "Title"),
  createColumn("body", "Body"),
  createColumn("action", "Action"),
];

const page = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  async function updatePost(id: string) {
    // call your api to update
    console.log(id, "postId");
  }
  async function deletePost(id: string) {
    // call your api to delete
    console.log(id, "postId");
  }

  const serelizeData = () => {
    if (data) {
      const newData = data?.map((item: any) => {
        return {
          userId: item?.userId,
          title: item?.title,
          body: item?.body,
          action: [
            {
              label: "Update",
              callback: () => updatePost(item?.id),
            },
            {
              label: "Delete",
              callback: () => deletePost(item?.id),
            },
          ],
        };
      });
      return newData;
    }
  };

  const serelizedData = serelizeData();

  return (
    <div>
      {data && (
        <div className="w-full mx-auto py-10">
          <DataTable
            columns={columns}
            data={serelizedData ?? []}
            filterBy="title"
          />
        </div>
      )}
    </div>
  );
};

export default page;
