import { Star } from "lucide-react"

import { Skeleton } from "../skeleton"

export function ServicesCardSkeleton() {
  return (
    <div className="rounded-lg shadow-lg bg-white overflow-hidden">
      <Skeleton className="w-full h-48" />

      <div className="p-5 space-y-4">
        {/* Title & price */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>

        {/* City */}
        <Skeleton className="h-4 w-1/2" />

        {/* Description */}
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className={`h-3 ${i === 0 ? "w-full" : i === 1 ? "w-4/5" : "w-3/4"}`} />
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="text-gray-200" fill="currentColor" />
          ))}
          <Skeleton className="ml-2 h-4 w-12" />
        </div>
      </div>
    </div>
  )
}
