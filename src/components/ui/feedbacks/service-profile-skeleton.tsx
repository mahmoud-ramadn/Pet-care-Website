import { Skeleton } from "@/components/ui/skeleton"

export function ServiceProfileSkeleton() {
  return (
    <div className="container py-8">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>

          {/* Image Gallery Skeleton */}
          <Skeleton className="aspect-video w-full rounded-xl" />

          {/* About Section Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Details Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pet Preferences Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-48" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>

          {/* Reviews Skeleton */}
          <div className="space-y-3">
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

        {/* Right Column - Booking Card Skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 border rounded-xl p-6 space-y-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>

            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>

            <Skeleton className="h-10 w-full rounded-lg" />

            <div className="pt-6 border-t space-y-3">
              <Skeleton className="h-5 w-32" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3 w-40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
