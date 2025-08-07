import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react"

import { useAllPosts } from "@/hooks/user"
import { CommunitySkeleton } from "@/components/ui/feedbacks/community-skeleton"

export default function Community() {
  const { value:post ,loading} = useAllPosts()

  if(loading){
  
return  <CommunitySkeleton count={10}/>
  }
  return (
    <div className="container max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Community Posts</h1>

      {post?.map((item) => (
        <div key={item.post._id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <img
                src={item.post.userImage}
                alt={item.post.userName}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{item.post.userName}</p>
                <p className="text-gray-500 text-xs">
                  {formatDistanceToNow(new Date(item.post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Post Image */}
          {item.post.postImage && (
            <div className="relative aspect-square bg-gray-100">
              <img
                src={item.post.postImage}
                alt={item.post.description || "Post image"}
                
                className="object-cover"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-4">
                <button className="flex items-center">
                  <Heart
                    size={24}
                    fill={item.liked ? "#ef4444" : "none"}
                    color={item.liked ? "#ef4444" : "currentColor"}
                  />
                </button>
                <button className="flex items-center">
                  <MessageCircle size={24} />
                </button>
                <button className="flex items-center">
                  <Share2 size={24} />
                </button>
              </div>
            </div>

            {/* Likes count */}
            {item.post.likesNumber > 0 && (
              <p className="font-semibold text-sm mb-1">
                {item.post.likesNumber} {item.post.likesNumber === 1 ? "like" : "likes"}
              </p>
            )}

            {/* Description */}
            <div className="mb-1">
              <span className="font-semibold mr-2">{item.post.userName}</span>
              <span>{item.post.description}</span>
            </div>

        
              <button className="text-gray-500 text-sm">View all  comments</button>

            {/* Add comment input */}
            <div className="flex items-center mt-3 pt-3 border-t">
              <input type="text" placeholder="Add a comment..." className="flex-1 text-sm outline-none" />
              <button className="text-blue-500 font-semibold text-sm ml-2">Post</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
