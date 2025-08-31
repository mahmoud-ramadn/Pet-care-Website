// components/shelters/ShelterReviews.tsx
import { MessageSquare } from "lucide-react"

import { ReviewItem } from "@/components/ui/serviceProfile/ReviewItem"

import { ShilterWritereivew } from "@/apis/writeriewve"
import WriteReview from "@/components/forms/write-review"

interface Props {
  reviews?: any[]
  shelterId: string
  retry: () => void
}

export default function ShelterReviews({ reviews, shelterId, retry }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 grid-cols-1">
      <section className="lg:col-span-3 rounded-2xl bg-white shadow-lg border border-gray-100 my-8 py-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 ml-3 rounded-full"></div>
          مراجعات العملاء
        </h2>

        {reviews?.length ? (
          <div className="space-y-6">
            {reviews?.map((review, idx) => <ReviewItem key={idx} review={review._id ? review : null} reload={retry} />)}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">لا توجد مراجعات حتى الآن</p>
            <p className="text-gray-400 text-sm mt-1">كن أول من يضع مراجعة</p>
          </div>
        )}
      </section>

      <WriteReview
        writeReview={(data) => {
          ShilterWritereivew(data, shelterId)
          retry()
        }}
      />
    </div>
  )
}
