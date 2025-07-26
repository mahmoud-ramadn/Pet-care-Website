import { Skeleton } from "../skeleton"

export function PetCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl relative bg-white">
      {/* Heart button skeleton */}
      <div className="absolute top-2 right-2">
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>

      {/* Image placeholder */}
      <Skeleton className="w-full h-48" />

      {/* Content placeholder */}
      <div className="p-3 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
