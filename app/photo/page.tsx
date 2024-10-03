"use client";

import { createColumn } from "@/components/Columns";
import { DataTable } from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

interface IPhoto {
  albumId: string;
  title: string;
  image: string;
  action: any;
}

const columns: ColumnDef<IPhoto>[] = [
  createColumn("albumId", "AlbumId"),
  createColumn("image", "Photo"),
  createColumn("title", "Title"),
  createColumn("action", "Action"),
];

const Photo = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: any = await response.json();
        setData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function updatePhoto(id: string) {
    // call your api to update
    console.log(id, "postId");
  }
  function deletePhoto(id: string) {
    // call your api to delete
    console.log(id, "postId");
  }

  const serelizeData = () => {
    if (data) {
      const newData = data?.map((item: any) => {
        return {
          albumId: item?.albumId,
          title: item?.title,
          image: item?.url,
          action: [
            {
              label: "Update",
              callback: () => updatePhoto(item?.id),
            },
            {
              label: "Delete",
              callback: () => deletePhoto(item?.id),
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

export default Photo;
