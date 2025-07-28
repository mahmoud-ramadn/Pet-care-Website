import { Skeleton } from "@/components/ui/skeleton"

export function ShelterSkeleton() {
  return (
    <div className="container py-8">
      {/* Header Area Skeleton */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Image Gallery Skeleton */}
        <div className="md:w-1/2 space-y-4">
          {/* Main Image Skeleton */}
          <Skeleton className="w-full h-64 md:h-96 rounded-lg" />

          {/* Thumbnail Swiper Skeleton */}
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-md" />
            ))}
          </div>
        </div>

        {/* Shelter Info Skeleton */}
        <div className="md:w-1/2 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-16 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
      </div>

      {/* About Section Skeleton */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Map Section Skeleton */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-96 w-full rounded-lg" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Reviews Section Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-7 w-48" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b pb-6 last:border-0 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  )
}
