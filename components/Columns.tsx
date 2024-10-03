import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { TableColumnHeader } from "./TableColumnHeader";

export const createColumn = <T extends object>(
  key: keyof T,
  headerName: string
): ColumnDef<T, any> => ({
  accessorKey: key as string,
  header: ({ column }) => (
    <TableColumnHeader column={column} title={headerName} />
  ),
  cell: ({ row }) => {
    const value = row.original[key] as React.ReactNode;
    if (key === "action") {
      const actionValue: any = row.original[key] as any;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="pl-2">
              <div className="flex gap-2 flex-col items-start">
                {actionValue && actionValue.length > 0 ? (
                  actionValue?.map((action: any, index: number) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={action.callback}
                      className="text-xs py-1 hover:bg-transparent h-auto"
                    >
                      {action.label && <span>{action.label}</span>}
                    </Button>
                  ))
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else if (key === "image") {
      return (
        <div className="ml-4 w-16 h-16  rounded-md flex items-center justify-center overflow-hidden">
          <Image
            src={`${(row?.original as any)?.image}`}
            alt={(row.original as any)?.title}
            className="w-full h-full object-cover"
            width={50}
            height={50}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      );
    }
    return <div>{value}</div>;
  },
});
