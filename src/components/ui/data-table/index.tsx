import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { parseAsInteger } from "nuqs"
import { useQueryStates } from "nuqs"

import { useState } from "react"

// import { DEFAULT_PAGE_SIZE } from "@/lib/constants"
import { cn } from "@/lib/utils"

// import { DataTablePagination } from "@/components/ui/data-table/table-pagination"
import Loader from "@/components/ui/loader"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  isStatic?: boolean
  totalPages?: number
  className?: string
}

export default function DataTable<TData, TValue>({
  className,
  columns,
  data,
  loading = false,
  isStatic = false,
  totalPages = 1,
}: Readonly<Props<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const defaultPagination = {
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  }

  const [pagination, setPagination] = useQueryStates(defaultPagination)

  const onUpdatePagination = (newPagination: Partial<PaginationQueryParams>) => {
    setPagination((prev) => {
      return {
        ...prev,
        ...newPagination,
      }
    })
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(!isStatic && {
        pagination: {
          pageIndex: pagination.page - 1,
          pageSize: pagination.limit,
        },
      }),
    },

    ...(totalPages &&
      !isStatic && {
        pageCount: totalPages,
      }),
    manualPagination: !isStatic,
  })

  const hasRows = Boolean(table.getRowModel().rows?.length)

  return (
    <>
      <ScrollArea
        className={cn(
          "pb-4 mt-6 lg:w-full md:min-w-[740px] sm:w-[600px] min-[570px]:w-[540px] mx-auto md:max-w-full max-w-[400px] ",
          className
        )}
      >
        <Table dir="rtl">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-4">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="relative">
            {hasRows &&
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(index === table.getRowModel().rows.length - 1 && "border-b-0")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {loading && !hasRows && (
              <TableRow className="h-20">
                <TableCell colSpan={columns.length}>
                  <Loader className="size-8 mx-auto" />
                </TableCell>
              </TableRow>
            )}

            {loading && hasRows && (
              <TableRow className="absolute inset-0 flex items-center justify-center bg-primary/20">
                <TableCell colSpan={columns.length}>
                  <Loader className="size-8" />
                </TableCell>
              </TableRow>
            )}

            {!loading && !hasRows && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-lg font-semibold">
                  لا يوجد نتائج
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" className=" h-4 " />
      </ScrollArea>

      {/* <DataTablePagination
        table={table}
        isStatic={isStatic}
        onUpdatePagination={onUpdatePagination}
        pagination={pagination}
      /> */}
    </>
  )
}
