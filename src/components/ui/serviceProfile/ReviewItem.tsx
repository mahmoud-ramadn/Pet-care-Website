import { Edit, Star, Trash } from "lucide-react"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { DeleteReview, updateReview } from "@/apis/writeriewve"
import WriteReview from "@/components/forms/write-review"

type ReviewItemProps = {
  review?: Review | null
  reload: () => void
}

export function ReviewItem({ review, reload }: ReviewItemProps) {
  const userData: LoginUser | null = JSON.parse(localStorage.getItem("userInfoData") || "null")
  const [open, setOpen] = useState(false)
  const isOwner = userData?.id === review?.user?._id

  const handleDelete = async () => {
    if (!review?._id) return
    try {
      await DeleteReview(review._id)
      reload()
    } catch (error) {
      console.error("فشل حذف المراجعة:", error)
    }
  }

  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={review?.user?.profileImage} />
          <AvatarFallback>{review?.user?.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium text-base">{review?.user?.name || "مستخدم مجهول"}</p>
            {review?.createdAt && (
              <span className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
            )}
          </div>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < (review?.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>

          {review?.review && <p className="mt-2 text-sm text-gray-800 leading-relaxed">{review.review}</p>}

          {isOwner && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center text-blue-600 hover:underline text-sm"
                >
                  تعديل <Edit className="w-4 h-4 ml-1" />
                </button>

                <button onClick={handleDelete} className="flex items-center text-red-500 hover:underline text-sm">
                  حذف <Trash className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {open && isOwner && (
            <div className="mt-4">
              <WriteReview
                isEdit
                writeReview={async (values) => {
                  if (!review?._id) return
                  try {
                    await updateReview(values, review._id)
                    reload()
                    setOpen(false)
                  } catch (error) {
                    console.error("فشل تحديث المراجعة:", error)
                  }
                }}
                initialValues={{
                  rating: review?.rating,
                  review: review?.review,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
