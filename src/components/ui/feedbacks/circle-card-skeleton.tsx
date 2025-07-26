import { Skeleton } from "../skeleton"

export function CircleCardSkeleton() {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="border-dashed border-2 rounded-full p-0.5 border-white">
        <Skeleton className="size-64 rounded-full" />
      </div>
      <Skeleton className="h-8 w-48" /> {/* Name placeholder */}
      <Skeleton className="h-6 w-64" /> {/* Description placeholder */}
    </div>
  )
}
