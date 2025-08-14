import { formatDistanceToNow } from "date-fns"
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send, Share2 } from "lucide-react"

import { useEffect, useState } from "react"
import { Link } from "react-router"

import { CommunitySkeleton } from "@/components/ui/feedbacks/community-skeleton"

import { MakeReact } from "@/apis/user"
import CreatePostForm from "@/components/forms/CreatePost"
import { useAllPosts } from "@/hooks/user"

export default function Community() {
  const { value: posts, loading, retry } = useAllPosts()
  const [DataPosts, setPosts] = useState(posts)

  useEffect(() => {
    setPosts(posts)
  }, [posts])

  if (loading) {
    return <CommunitySkeleton count={10} />
  }

  const handleMakeReact = async (postId: string) => {
    try {
      setPosts((prevPosts) =>
        prevPosts?.map((item) => {
          if (item?.post?._id === postId) {
            const newLiked = !item.liked
            return {
              ...item,
              liked: newLiked,
              post: {
                ...item.post,
                likesNumber: newLiked ? item.post.likesNumber + 1 : item.post.likesNumber - 1,
              },
            }
          }
          return item
        })
      )

      await MakeReact(postId)
    } catch (error) {
      console.error(error)
      retry()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container max-w-2xl mx-auto py-8 px-4">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Community
          </h1>
          <p className="text-gray-600 text-lg">Connect, share, and discover amazing content</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Create Post Form Container */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
          <CreatePostForm onSuccess={retry} />
        </div>

        {/* Enhanced Posts */}
        <div className="space-y-6">
          {DataPosts?.map((item, index) => (
            <article
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 animate-in fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Enhanced Post Header */}
              <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Link to={`/user/${item.post.userId}`}>
                      <img
                        src={item.post.userImage}
                        alt={item.post.userName}
                        width={48}
                        height={48}
                        className="rounded-full object-cover ring-2 ring-gray-100 hover:ring-blue-300 transition-all duration-300"
                      />
                    </Link>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                      {item.post.userName}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {formatDistanceToNow(new Date(item.post.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Enhanced Post Description */}
              {item.post.description && (
                <div className="px-6 pb-4">
                  <div className="bg-gray-50/50 rounded-xl p-4 border-l-4 border-blue-500">
                    <span className="font-semibold text-gray-900 mr-2">{item.post.userName}</span>
                    <span className="text-gray-700 leading-relaxed">{item.post.description}</span>
                  </div>
                </div>
              )}

              {/* Enhanced Post Image */}
              {item.post.postImage && (
                <div className="relative mx-6 mb-4 rounded-xl overflow-hidden bg-gray-100 group">
                  <img
                    src={item.post.postImage}
                    alt={item.post.description || "Post image"}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Enhanced Interaction Section */}
              <div className="px-6 pb-6">
                {/* Action Buttons */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => handleMakeReact(item.post._id)}
                      className="flex items-center space-x-2 group hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                    >
                      <Heart
                        size={26}
                        fill={item.liked ? "#ef4444" : "none"}
                        color={item.liked ? "#ef4444" : "currentColor"}
                        className={`transition-all duration-300 ${item.liked ? "animate-pulse" : "group-hover:scale-110"}`}
                      />
                    </button>
                    <button className="flex items-center space-x-2 group hover:bg-blue-50 p-2 rounded-full transition-all duration-200">
                      <MessageCircle size={26} className="group-hover:scale-110 transition-transform duration-200" />
                    </button>
                    <button className="flex items-center space-x-2 group hover:bg-green-50 p-2 rounded-full transition-all duration-200">
                      <Share2 size={26} className="group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                  <button className="flex items-center space-x-2 group hover:bg-yellow-50 p-2 rounded-full transition-all duration-200">
                    <Bookmark size={24} className="group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>

                {/* Enhanced Likes Count */}
                {item.post.likesNumber > 0 && (
                  <div className="mb-4">
                    <p className="font-bold text-gray-900 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                      {item.post.likesNumber} {item.post.likesNumber === 1 ? "like" : "likes"}
                    </p>
                  </div>
                )}

                {/* Enhanced Comments Section */}
                <button className="text-gray-500 hover:text-gray-700 text-sm font-medium mb-4 hover:underline transition-all duration-200">
                  View all comments
                </button>

                {/* Enhanced Comment Input */}
                <div className="flex items-center bg-gray-50/70 rounded-full px-4 py-3 border border-gray-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300">
                  <input
                    type="text"
                    placeholder="Add a thoughtful comment..."
                    className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 font-medium"
                  />
                  <button className="text-blue-500 hover:text-blue-600 font-bold text-sm ml-3 flex items-center space-x-1 hover:bg-blue-50 px-3 py-1 rounded-full transition-all duration-200">
                    <Send size={16} />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State Enhancement */}
        {DataPosts?.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 border border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <MessageCircle size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No posts yet</h3>
              <p className="text-gray-600 mb-6">Be the first to share something amazing with the community!</p>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
