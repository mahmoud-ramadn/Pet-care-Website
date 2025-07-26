import { Skeleton } from "../skeleton"

export function ShelterCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md flex items-stretch gap-6 p-6">
      {/* Image placeholder */}
      <div className="flex-shrink-0 w-32 h-32 overflow-hidden rounded-lg">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="flex flex-col justify-between flex-grow space-y-4">
        {/* Title placeholder */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />

          {/* Rating placeholder */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded-full" />
            ))}
            <Skeleton className="h-4 w-8 ml-1" />
          </div>

          {/* Address and time placeholder */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Button placeholder */}
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
    </div>
  )
}
