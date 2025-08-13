import { format } from "date-fns"
import { Edit } from "lucide-react"

import { Link, useParams } from "react-router"

import UserProfileSkeleton from "@/components/ui/feedbacks/userProfile-skeleton"

import { useGetMe, useUserMoments } from "@/hooks/user"

export default function UserProfile() {
  const id = useParams().id
  const { value: posts} = useUserMoments(id ?? "")
  const { value, loading: userLoading } = useGetMe()

  if (userLoading) {
    return <UserProfileSkeleton />
  }

  if (!value) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-red-500">Failed to load user data</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-100">
            <img
              src={value?.profileImage || "/default-avatar.jpg"}
              alt={`${value?.name}'s profile`}
              className="object-cover w-full h-full"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/default-avatar.jpg"
              }}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{value?.name}</h1>
                <p className="text-gray-600">{value?.email}</p>
                <p className="text-gray-600">{value?.phoneNumber}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {value?.role}
                </span>
              </div>
              <Link
                to={`/Edit-user/${value?._id}`}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Edit profile"
              >
                <Edit className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Favorite Pets</h2>
          {value?.favPet && value?.favPet.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {value?.favPet.map((petId, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <p className="font-medium">Pet ID: {petId}</p>
                  <Link to={`/pets/${petId}`} className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                    View pet
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border rounded-lg">
              <p className="text-gray-500 italic">No favorite pets yet</p>
              <Link to="/pets" className="text-blue-600 hover:underline mt-2 inline-block">
                Browse pets
              </Link>
            </div>
          )}
        </div>

     

        <div>
          <h2 className="text-xl font-semibold mb-4">My Pets</h2>
          {value?.pet && value?.pet.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {value?.pet.map((petId, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <p className="font-medium">Pet ID: {petId}</p>
                  <Link to={`/pets/${petId}`} className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                    View pet
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border rounded-lg">
              <p className="text-gray-500 italic">No pets registered yet</p>
              <Link to="/pets/register" className="text-blue-600 hover:underline mt-2 inline-block">
                Register a pet
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Moments</h2>

{ posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map(({ post }) => (
              <div key={post._id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center p-4">
                  <img
                    src={post.userImage || "/default-avatar.jpg"}
                    alt={`${post.userName}'s profile`}
                    className="w-10 h-10 rounded-full mr-3"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/default-avatar.jpg"
                    }}
                  />
                  <div>
                    <p className="font-medium">{post.userName}</p>
                    <p className="text-xs text-gray-500">{format(new Date(post.createdAt), "MMM d, yyyy · h:mm a")}</p>
                  </div>
                </div>

                {post.postImage && (
                  <div className="w-full aspect-video max-h-96 relative">
                    <img src={post.postImage} alt="Post content" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-4">
                  <p className="mb-3">{post.description}</p>
                  <div className="flex items-center text-gray-500">
                    <button className="flex items-center mr-4 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {post.likesNumber}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-gray-500 italic">No moments yet</p>
            <Link to="/moments/create" className="text-blue-600 hover:underline mt-2 inline-block">
              Create your first moment
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
