import { Skeleton } from "@/components/ui/skeleton"


export const CommunitySkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="container max-w-2xl mx-auto py-6 px-4">
      <Skeleton className="h-8 w-48 mb-6" /> {/* Title skeleton */}
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          {/* Header skeleton */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-5 w-5" />
          </div>

          {/* Image skeleton */}
          <Skeleton className="aspect-square w-full" />

          {/* Actions skeleton */}
          <div className="p-4 space-y-3">
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>

            <Skeleton className="h-4 w-16" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <Skeleton className="h-3 w-24" />

            <div className="flex items-center pt-3">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-12 ml-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
