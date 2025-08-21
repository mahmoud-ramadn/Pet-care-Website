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
import { AlertCircle, Database, Search } from "lucide-react"
import { parseAsInteger } from "nuqs"
import { useQueryStates } from "nuqs"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { DataTablePagination } from "@/components/ui/data-table/table-pagination"
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

interface PaginationQueryParams {
  page: number
  limit: number
}

export default function DataTable<TData, TValue>({
  className,
  columns,
  data,
  loading = false,
  isStatic = false,
  totalPages,
}: Readonly<Props<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const defaultPagination = {
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
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
    <div className="w-full space-y-6" dir="rtl">
      {/* Enhanced Table Container */}
      <div className="relative">
        {/* Table Header with Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-200/60 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/40">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">جدول البيانات</h3>
              <p className="text-sm text-gray-500">
                عرض {hasRows ? table.getRowModel().rows.length : 0} من إجمالي البيانات
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-3">
            {loading && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                جاري التحميل...
              </div>
            )}
            {!loading && hasRows && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                محملة
              </div>
            )}
            {!loading && !hasRows && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                <AlertCircle className="w-3 h-3" />
                لا توجد بيانات
              </div>
            )}
          </div>
        </div>

        {/* Enhanced ScrollArea */}
        <div className="relative bg-white rounded-2xl border border-gray-200/60 shadow-lg shadow-gray-100/50 overflow-hidden">
          {/* Loading Overlay */}
          {loading && hasRows && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
              <div className="flex flex-col items-center gap-3">
                <Loader className="w-8 h-8 text-blue-600" />
                <p className="text-sm text-gray-600 font-medium">جاري تحديث البيانات...</p>
              </div>
            </div>
          )}

          <ScrollArea
            className={cn(
              "w-full",
              "max-w-[calc(100vw-2rem)]",
              "sm:max-w-[calc(100vw-3rem)]", // Small: adjust for larger padding
              "md:max-w-full", // Medium and up: full width
              className
            )}
          >
            <div className="min-w-full">
              <Table className="rtl:text-right">
                {/* Enhanced Table Header */}
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="border-b border-gray-200/60 overflow-hidden  bg-gradient-to-r from-gray-50/50 to-gray-100/30 hover:from-gray-100/60 hover:to-gray-50/40 transition-all duration-200"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className={cn(
                              "py-4 px-4 sm:px-6 font-semibold text-gray-700 bg-gradient-to-b from-transparent to-gray-50/30",
                              "text-right", // RTL alignment
                              "whitespace-nowrap", // Prevent header text wrapping
                              // RTL rounded corners
                              "border-l border-gray-200/40 last:border-l-0" // RTL borders
                            )}
                          >
                            {header.isPlaceholder ? null : (
                              <div className="flex items-center justify-end gap-2 min-h-[1.5rem]">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </div>
                            )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>

                {/* Enhanced Table Body */}
                <TableBody className="relative">
                  {hasRows &&
                    table.getRowModel().rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={cn(
                          "group transition-all duration-200 hover:bg-gradient-to-l from-blue-50/30 via-transparent to-blue-50/30",
                          "border-b border-gray-200/40 last:border-b-0",
                          row.getIsSelected() && "bg-gradient-to-l from-blue-100/50 to-indigo-50/30",
                          // Alternate row styling
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                        )}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              "py-4 px-4 sm:px-6 transition-all duration-200",
                              "text-right", // RTL alignment
                              "border-l border-gray-200/20 last:border-l-0 group-hover:border-blue-200/40", // RTL borders
                              // Responsive text sizing
                              "text-sm sm:text-base"
                            )}
                          >
                            <div className="min-h-[1.25rem] flex items-center justify-end">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}

                  {/* Enhanced Loading State */}
                  {loading && !hasRows && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={columns.length} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center gap-4 py-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                            <Loader className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-gray-700 mb-1">جاري تحميل البيانات</p>
                            <p className="text-sm text-gray-500">يرجى الانتظار لحظة...</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {/* Enhanced Empty State */}
                  {!loading && !hasRows && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={columns.length} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center gap-6 py-12">
                          {/* Empty State Icon */}
                          <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                              <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                              <AlertCircle className="w-3 h-3 text-white" />
                            </div>
                          </div>

                          {/* Empty State Content */}
                          <div className="text-center max-w-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد نتائج</h3>
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                              لم يتم العثور على أي بيانات لعرضها. تحقق من المرشحات أو أعد تحميل الصفحة.
                            </p>
                          </div>

                          {/* Action Suggestions */}
                          <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button
                              onClick={() => window.location.reload()}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              إعادة تحميل
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium text-sm">
                              مسح المرشحات
                            </button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Enhanced ScrollBar */}
            <ScrollBar orientation="horizontal" className="h-3 bg-gray-100 rounded-full" />
          </ScrollArea>
        </div>

        {/* Table Footer Info */}
        {hasRows && (
          <div className="mt-4 px-4 py-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200/60 text-center">
            <p className="text-sm text-gray-600">
              عرض <span className="font-semibold text-gray-800">{table.getRowModel().rows.length}</span> من البيانات
              {totalPages && (
                <span>
                  {" "}
                  • الصفحة <span className="font-semibold">{pagination.page}</span> من{" "}
                  <span className="font-semibold">{totalPages}</span>
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {totalPages && (
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-4">
          <DataTablePagination
            table={table}
            isStatic={isStatic}
            onUpdatePagination={onUpdatePagination}
            pagination={pagination}
          />
        </div>
      )}
    </div>
  )
}
