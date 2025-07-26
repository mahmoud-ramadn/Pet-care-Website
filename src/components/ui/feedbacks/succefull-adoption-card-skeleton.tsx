import { Skeleton } from "../skeleton"

export function SuccessfullAdoptionCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
      <Skeleton className="w-full h-52" />

      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}
