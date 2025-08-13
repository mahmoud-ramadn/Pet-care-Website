import { Skeleton } from "@/components/ui/skeleton"

// Assuming you're using shadcn/ui or similar

export default function UserProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Section Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-7 w-1/4 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <Skeleton className="h-7 w-1/4 mb-4" />
            <Skeleton className="h-24 rounded-lg" />
          </div>

          <div>
            <Skeleton className="h-7 w-1/4 mb-4" />
            <Skeleton className="h-24 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Moments Section Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <Skeleton className="h-7 w-1/4 mb-6" />
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="flex items-center p-4">
                <Skeleton className="w-10 h-10 rounded-full mr-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              <Skeleton className="w-full h-64 sm:h-96" />

              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex">
                  <Skeleton className="h-5 w-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
