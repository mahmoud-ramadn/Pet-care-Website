import { format } from "date-fns"
import { Calendar, Camera, Crown, Edit, Heart, Mail, Phone, PlusCircle, User } from "lucide-react"

import { Link, useParams } from "react-router"

import UserProfileSkeleton from "@/components/ui/feedbacks/userProfile-skeleton"

import {  useOneUser, useUserMoments } from "@/hooks/user"
import { useEffect } from "react"

export default function UserProfile() {
  const id = useParams().id
  
  const { value, loading: userLoading ,retry} = useOneUser(id??"")
  
  const { value: posts } = useUserMoments(id ?? "")


useEffect(()=>{
  if(id)
retry()

  },[id])

  if (userLoading) {
    return <UserProfileSkeleton />
  }

  if (!value) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center bg-white rounded-3xl shadow-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">عذراً، حدث خطأ</h2>
          <p className="text-red-500 mb-6">فشل في تحميل بيانات المستخدم</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Profile Header Card */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-60" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-50 to-transparent rounded-full translate-y-24 -translate-x-24 opacity-60" />

          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={value?.profileImage || "/default-avatar.jpg"}
                    alt={`${value?.name}'s profile`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/default-avatar.jpg"
                    }}
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                      {value?.name}
                      {value?.role === "admin" && <Crown className="w-8 h-8 text-yellow-500" />}
                    </h1>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{value?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{value?.phoneNumber}</span>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-semibold ${getRoleBadgeStyle(value?.role)}">
                      <User className="w-4 h-4" />
                      {value?.role}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <Link
                    to={`/Edit-user/${value?._id}`}
                    className="group relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    aria-label="تعديل الملف الشخصي"
                  >
                    <Edit className="w-6 h-6 text-white" />
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      تعديل الملف الشخصي
                    </div>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/50 rounded-2xl border border-white/20">
                    <div className="text-2xl font-bold text-blue-600">{value?.favPet?.length || 0}</div>
                    <div className="text-sm text-gray-600">الحيوانات المفضلة</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-2xl border border-white/20">
                    <div className="text-2xl font-bold text-green-600">{value?.pet?.length || 0}</div>
                    <div className="text-sm text-gray-600">حيواناتي</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-2xl border border-white/20">
                    <div className="text-2xl font-bold text-purple-600">{posts?.length || 0}</div>
                    <div className="text-sm text-gray-600">اللحظات</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Favorite Pets */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-rose-50">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Heart className="w-6 h-6 text-pink-600" />
                الحيوانات المفضلة
              </h2>
            </div>
            <div className="p-6">
              {value?.favPet && value?.favPet.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {value?.favPet.slice(0, 3).map((petId, index) => (
                    <div
                      key={index}
                      className="group p-4 border-2 border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-700">Pet ID: {petId}</p>
                        <Link
                          to={`/pets/${petId}`}
                          className="text-pink-600 hover:text-pink-700 font-medium text-sm px-3 py-1 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors"
                        >
                          عرض
                        </Link>
                      </div>
                    </div>
                  ))}
                  {value?.favPet.length > 3 && (
                    <div className="text-center py-2">
                      <span className="text-gray-500 text-sm">وأكثر من {value?.favPet.length - 3} حيوانات أخرى</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-pink-400" />
                  </div>
                  <p className="text-gray-500 mb-4">لم تضف أي حيوانات مفضلة بعد</p>
                  <Link
                    to="/pets"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors text-sm font-medium"
                  >
                    <PlusCircle className="w-4 h-4" />
                    تصفح الحيوانات
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* My Pets */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <User className="w-6 h-6 text-green-600" />
                حيواناتي الأليفة
              </h2>
            </div>
            <div className="p-6">
              {value?.pet && value?.pet.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {value?.pet.slice(0, 3).map((petId, index) => (
                    <div
                      key={index}
                      className="group p-4 border-2 border-gray-100 rounded-2xl hover:border-green-200 hover:bg-green-50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-700">Pet ID: {petId}</p>
                        <Link
                          to={`/pets/${petId}`}
                          className="text-green-600 hover:text-green-700 font-medium text-sm px-3 py-1 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          عرض
                        </Link>
                      </div>
                    </div>
                  ))}
                  {value?.pet.length > 3 && (
                    <div className="text-center py-2">
                      <span className="text-gray-500 text-sm">وأكثر من {value?.pet.length - 3} حيوانات أخرى</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-gray-500 mb-4">لم تسجل أي حيوانات بعد</p>
                  <Link
                    to="/pets/register"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <PlusCircle className="w-4 h-4" />
                    تسجيل حيوان جديد
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Moments Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Camera className="w-6 h-6 text-purple-600" />
                اللحظات المميزة
              </h2>
              <Link
                to="/Community"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <PlusCircle className="w-4 h-4" />
                إضافة لحظة
              </Link>
            </div>
          </div>
          <div className="p-6">
            {posts && posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map(({ post }) => (
                  <article
                    key={post._id}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    {/* Post Header */}
                    <div className="flex items-center p-6 pb-4">
                      <div className="relative">
                        <img
                          src={post.userImage || "/default-avatar.jpg"}
                          alt={`${post.userName}'s profile`}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/default-avatar.jpg"
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="mr-4 flex-1">
                        <p className="font-bold text-gray-800">{post.userName}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <time>{format(new Date(post.createdAt), "MMM d, yyyy · h:mm a")}</time>
                        </div>
                      </div>
                    </div>

                    {/* Post Image */}
                    {post.postImage && (
                      <div className="relative overflow-hidden bg-gray-100">
                        <img
                          src={post.postImage}
                          alt="Post content"
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="p-6 pt-4">
                      <p className="text-gray-700 mb-4 leading-relaxed">{post.description}</p>
                      <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group/like">
                          <Heart className="w-5 h-5 group-hover/like:fill-current" />
                          <span className="font-medium">{post.likesNumber}</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <span>انقر للتفاعل</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد لحظات بعد</h3>
                <p className="text-gray-500 mb-6">ابدأ بمشاركة لحظاتك المميزة مع المجتمع</p>
                <Link
                  to="/moments/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <PlusCircle className="w-5 h-5" />
                  إنشاء أول لحظة
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
