import { Star } from "lucide-react"

export default function ReviewCard({ review }: any) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{review.user?.name || "Anonymous"}</h4>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="mt-3 text-gray-300">{review.review}</p>
    </div>
  )
}
