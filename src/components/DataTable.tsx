import * as React from "react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type Column<T> = {
  key: string;
  header: React.ReactNode;
  className?: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  cell?: (row: T, index: number) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string | number;
  emptyState?: React.ReactNode;
  className?: string;
  tableMinWidth?: number;
  stickyHeader?: boolean;
  striped?: boolean;
  hover?: boolean;
  fixedWidth?: boolean;
};

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyState = <div className="py-6 text-center text-sm text-zinc-500">No data</div>,
  className = "",
  stickyHeader = false,
  striped = false,
  hover = true,
}: Props<T>) {
  const getKey = (row: T, i: number) => (rowKey ? rowKey(row, i) : i);

  return (
    <div className={cn("w-full max-w-full overflow-x-auto rounded-md border bg-white", className)}>
      <Table
        className={cn("w-full")}
      >
        <TableHeader className={stickyHeader ? "sticky top-0 z-10 bg-white dark:bg-zinc-950" : undefined}>
          <TableRow className="hover:bg-transparent">
            {columns.map((c) => (
              <TableHead key={c.key} className={cn("font-semibold text-black", c.className)}>
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="p-0">
                {emptyState}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow
                key={getKey(row, i)}
                className={cn(
                  "group",
                  striped && i % 2 === 1 && "bg-zinc-50/50 dark:bg-zinc-900/40",
                  !hover && "hover:bg-transparent"
                )}
              >
                {columns.map((c) => {
                  let content: React.ReactNode = null;
                  if (c.cell) content = c.cell(row, i);
                  else if (typeof c.accessor === "function") content = c.accessor(row);
                  else if (typeof c.accessor === "string") content = (row as Record<string, unknown>)[c.accessor] as React.ReactNode;
                  return (
                    <TableCell key={c.key} className={c.className}>
                      {content}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
