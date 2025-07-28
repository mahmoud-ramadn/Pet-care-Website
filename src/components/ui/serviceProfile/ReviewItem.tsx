import { Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex items-center gap-3 mb-3">
        <Avatar>
          <AvatarImage src={review.user?.profileImage} />
          <AvatarFallback>{review.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{review.user?.name}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < (review.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">{new Date(review.createdAt || "").toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{review.review}</p>
    </div>
  )
}
