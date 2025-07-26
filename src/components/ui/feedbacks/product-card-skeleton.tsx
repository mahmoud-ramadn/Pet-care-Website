import { Skeleton } from "../skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="bg-white relative rounded-lg overflow-hidden shadow-md">
      <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm">
        <Skeleton className="w-5 h-5 rounded-full" />
      </div>

      <Skeleton className="w-full h-48" />

      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        <Skeleton className="w-full h-10 rounded-md" />
      </div>
    </div>
  )
}
