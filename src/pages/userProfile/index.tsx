import { format } from "date-fns"
import { useAtomValue } from "jotai"

import { useParams } from "react-router"

import { userInfoAtom } from "@/atoms"
import { useUserMoments } from "@/hooks/user"

export default function UserProfile() {
  const id = useParams().id
  const { value: posts } = useUserMoments(id ?? "")
  const user = useAtomValue(userInfoAtom)

  let userData: LoginUser | null = null

  if (!user) {
    return <div className="p-4 text-center">No user data available</div>
  }

  if (typeof user === "string") {
    try {
      userData = JSON.parse(user)
    } catch (err) {
      console.error("Failed to parse user data:", err)
      return <div className="p-4 text-red-500">Error loading user data</div>
    }
  } else {
    userData = user as LoginUser
  }

  if (!userData) {
    return <div className="p-4 text-center">Loading user data...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <img
              src={userData.profileImage || "/default-avatar.jpg"}
              alt={`${userData.name}'s profile`}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">{userData.phoneNumber}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {userData.role}
            </span>
          </div>
        </div>

        {/* Favorites Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Favorite Pets</h2>
          {userData.favPet && userData.favPet.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userData.favPet.map((petId, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <p>Pet ID: {petId}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No favorite pets yet</p>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Favorite Products</h2>
            {userData.favProduct.length > 0 ? (
              <div>{/* Render favorite products */}</div>
            ) : (
              <p className="text-gray-500">No favorite products yet</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">My Pets</h2>
            {userData.pets.length > 0 ? (
              <div>{/* Render user's pets */}</div>
            ) : (
              <p className="text-gray-500">No pets registered yet</p>
            )}
          </div>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Moments</h2>
        {posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map(({ post }) => (
              <div key={post._id} className="border rounded-lg overflow-hidden">
                {/* Post Header */}
                <div className="flex items-center p-4">
                  <img
                    src={post.userImage || "/default-avatar.jpg"}
                    alt={`${post.userName}'s profile`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{post.userName}</p>
                    <p className="text-xs text-gray-500">{format(new Date(post.createdAt), "MMM d, yyyy · h:mm a")}</p>
                  </div>
                </div>

                {/* Post Image */}
                {post.postImage && (
                  <div className="w-full h-64 sm:h-96 relative">
                    <img src={post.postImage} alt="Post content" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Post Content */}
                <div className="p-4">
                  <p className="mb-3">{post.description}</p>
                  <div className="flex items-center text-gray-500">
                    <span className="flex items-center mr-4">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {post.likesNumber}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No moments yet</p>
        )}
      </div>
    </div>
  )
}
