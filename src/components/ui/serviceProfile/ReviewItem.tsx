import { Star, Trash } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { DeleteReivew } from "@/apis/writeriewve"

type ReviewItemProps = {
  review?: Review | null
  reload: () => void
}

export function ReviewItem({ review, reload }: ReviewItemProps) {
  const userData: LoginUser | null = JSON.parse(localStorage.getItem("userInfoData") || "null")

  const isOwner = userData?.id === review?.user?._id

  const handleDelete = async () => {
    if (!review?._id) return
    try {
      await DeleteReivew(review?._id)
      reload()
    } catch (error) {
      console.error("فشل حذف المراجعة:", error)
    }
  }

  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex items-center gap-3 mb-3">
        <Avatar>
          <AvatarImage src={review?.user?.profileImage} />
          <AvatarFallback>{review?.user?.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
        </Avatar>

        <div>
          <p className="font-medium">{review?.user?.name || "مستخدم مجهول"}</p>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < (review?.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
            {review?.createdAt && (
              <span className="text-sm text-gray-500 ml-2">{new Date(review?.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>

      {review?.review && <p className="text-gray-700">{review?.review}</p>}
      {}

      {isOwner && (
        <button onClick={handleDelete} className="text-red-500 mt-2 text-sm hover:underline">
          حذف المراجعة <Trash className="inline ml-1 size-4" />
        </button>
      )}
    </div>
  )
}
