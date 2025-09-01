import { Calendar, CheckCircle, Edit, MoreHorizontal, Star, Trash } from "lucide-react"

import { Suspense, useState } from "react"
import { lazy } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { DeleteReview, updateReview } from "@/apis/writeriewve"

import Loader from "../loader"

const LazyWriteReview = lazy(() => import("@/components/forms/write-review"))

type ReviewItemProps = {
  review?: Review | null
  reload: () => void
}

export function ReviewItem({ review, reload }: ReviewItemProps) {
  const userData: LoginUser | null = JSON.parse(localStorage.getItem("userInfoData") || "null")
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const isOwner = userData?.id === review?.user?._id

  const handleDelete = async () => {
    if (!review?._id || isDeleting) return

    setIsDeleting(true)
    try {
      await DeleteReview(review._id)
      reload()
    } catch (error) {
      console.error("فشل حذف المراجعة:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      if (diffInHours < 1) return "منذ لحظات"
      return `منذ ${diffInHours} ساعة`
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24)
      return `منذ ${days} يوم`
    } else {
      return date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  }

  return (
    <div className="group relative rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 mb-4 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 last:mb-0">
      <div className="flex flex-col xs:flex-row items-start gap-3 md:gap-4 mb-3 md:mb-4">
        {/* Avatar Section */}
        <div className="flex items-start gap-3 w-full xs:w-auto">
          <div className="relative flex-shrink-0">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 ring-2 ring-white shadow-md">
              <AvatarImage src={review?.user?.profileImage} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                {review?.user?.name?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            {isOwner && (
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle className="w-2 h-2 text-white" />
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          {isOwner && (
            <div className="xs:hidden relative ml-auto">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>

              {showActions && (
                <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-10 min-w-[120px]">
                  <button
                    onClick={() => {
                      setOpen(true)
                      setShowActions(false)
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                  >
                    <Edit className="w-3 h-3" />
                    تعديل
                  </button>
                  <button
                    onClick={() => {
                      handleDelete()
                      setShowActions(false)
                    }}
                    disabled={isDeleting}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Trash className="w-3 h-3" />
                    {isDeleting ? "جاري الحذف..." : "حذف"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 w-full">
          {/* User info and date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                {review?.user?.name || "مستخدم مجهول"}
              </h4>
              {isOwner && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">أنت</span>
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              {review?.createdAt && (
                <div className="flex items-center text-xs sm:text-sm text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{formatDate(review.createdAt)}</span>
                </div>
              )}

              {/* Desktop Actions */}
              {isOwner && (
                <div className="hidden xs:block relative">
                  <button
                    onClick={() => setShowActions(!showActions)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>

                  {showActions && (
                    <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-10 min-w-[120px]">
                      <button
                        onClick={() => {
                          setOpen(true)
                          setShowActions(false)
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Edit className="w-3 h-3" />
                        تعديل
                      </button>
                      <button
                        onClick={() => {
                          handleDelete()
                          setShowActions(false)
                        }}
                        disabled={isDeleting}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 disabled:opacity-50"
                      >
                        <Trash className="w-3 h-3" />
                        {isDeleting ? "جاري الحذف..." : "حذف"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
                    i < (review?.rating || 0)
                      ? "text-yellow-500 fill-yellow-500 drop-shadow-sm scale-110"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">({review?.rating || 0}/5)</span>
          </div>

          {/* Review text */}
          {review?.review && (
            <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 mb-3 md:mb-4 border-l-4 border-blue-200">
              <p className="text-gray-800 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">{review.review}</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {open && isOwner && (
        <div className="mt-3 md:mt-4 p-3 md:p-4 bg-blue-50/50 rounded-lg md:rounded-xl border border-blue-100 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Edit className="w-4 h-4 text-blue-600" />
            <h5 className="font-medium text-blue-900 text-sm md:text-base">تعديل المراجعة</h5>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center py-4">
                <Loader className="w-4 h-4 animate-spin" />
              </div>
            }
          >
            <LazyWriteReview
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
          </Suspense>

          <div className="flex justify-end mt-2 md:mt-3">
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-transparent group-hover:border-blue-100 transition-colors duration-300 pointer-events-none"></div>

      {/* Click outside to close actions */}
      {showActions && <div className="fixed inset-0 z-0" onClick={() => setShowActions(false)} />}
    </div>
  )
}
