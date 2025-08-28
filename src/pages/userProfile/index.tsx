import { format } from "date-fns"
import { Calendar, Camera, Crown, Edit, Heart, Mail, Phone, PlusCircle, User } from "lucide-react"

import { useEffect } from "react"
import { Link, useParams } from "react-router"

import UserProfileSkeleton from "@/components/ui/feedbacks/userProfile-skeleton"

import { useOneUser, useUserMoments } from "@/hooks/user"

const getRoleBadgeStyle = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "moderator":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-blue-100 text-blue-800 border-blue-200"
  }
}

export default function UserProfile() {
  const id = useParams().id

  const { value, loading: userLoading, retry } = useOneUser(id ?? "")
  const { value: posts } = useUserMoments(id ?? "")

  useEffect(() => {
    if (id) retry()
  }, [id])

  if (userLoading) {
    return <UserProfileSkeleton />
  }

  if (!value) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">عذراً، حدث خطأ</h2>
          <p className="text-red-500 mb-6 text-sm sm:text-base">فشل في تحميل بيانات المستخدم</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6 sm:space-y-8">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-100 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-16 sm:-translate-y-32 translate-x-16 sm:translate-x-32 opacity-60" />
          <div className="absolute bottom-0 left-0 w-24 sm:w-48 h-24 sm:h-48 bg-gradient-to-tr from-purple-50 to-transparent rounded-full translate-y-12 sm:translate-y-24 -translate-x-12 sm:-translate-x-24 opacity-60" />

          <div className="relative p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
              {/* Profile Image */}
              <div className="relative group mx-auto lg:mx-0">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl overflow-hidden border-3 sm:border-4 border-white shadow-lg sm:shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={value?.profileImage || "/default-avatar.jpg"}
                    alt={`${value?.name}'s profile`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/default-avatar.jpg"
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0 w-full lg:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 sm:mb-6">
                  <div className="space-y-3 text-center lg:text-right">
                    {/* Name and Crown */}
                    <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{value?.name}</h1>
                      {value?.role === "admin" && (
                        <Crown className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-500" />
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-gray-600">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        <span className="font-medium text-xs sm:text-sm lg:text-base break-all">{value?.email}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-gray-600">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        <span className="font-medium text-xs sm:text-sm lg:text-base">{value?.phoneNumber}</span>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="flex justify-center lg:justify-start">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border rounded-full text-xs sm:text-sm font-semibold ${getRoleBadgeStyle(value?.role)}`}
                      >
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        {value?.role}
                      </div>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <Link
                    to={`/Edit-user/${value?._id}`}
                    className="group relative p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl sm:rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto sm:mx-0"
                    aria-label="تعديل الملف الشخصي"
                  >
                    <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    <div className="absolute top-12 sm:top-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      تعديل الملف الشخصي
                    </div>
                  </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-white/50 rounded-xl sm:rounded-2xl border border-white/20">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                      {value?.favPet?.length || 0}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">الحيوانات المفضلة</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-white/50 rounded-xl sm:rounded-2xl border border-white/20">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                      {value?.pet?.length || 0}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">حيواناتي</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-white/50 rounded-xl sm:rounded-2xl border border-white/20">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">{posts?.length || 0}</div>
                    <div className="text-xs sm:text-sm text-gray-600">اللحظات</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Favorite Pets Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="relative p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-pink-300 rounded-full -translate-y-10 sm:-translate-y-16 translate-x-10 sm:translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-rose-300 rounded-full translate-y-6 sm:translate-y-8 -translate-x-6 sm:-translate-x-8"></div>
              </div>

              <div className="relative">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3 mb-1">
                  <div className="p-1.5 sm:p-2 bg-pink-100 rounded-lg sm:rounded-xl">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-pink-600" />
                  </div>
                  الحيوانات المفضلة
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm">حيواناتك الأليفة المميزة</p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {value?.favPet && value?.favPet.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {value?.pet.slice(0, 3).map((petId, index) => (
                      <div
                        key={index}
                        className="group relative p-3 sm:p-4 lg:p-5 border-2 border-gray-100 rounded-xl sm:rounded-2xl hover:border-pink-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-white to-gray-50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/0 via-pink-50/20 to-rose-50/30 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative flex items-center gap-3 sm:gap-4 lg:gap-6">
                          {/* Pet Image */}
                          <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-3 border-white shadow-md sm:shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                              <img src={petId.petImage} alt={petId.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                              <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-white fill-current" />
                            </div>
                          </div>

                          {/* Pet Info */}
                          <div className="flex-grow min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                              <div className="space-y-1 sm:space-y-2 flex-grow">
                                <h3 className="font-bold text-sm sm:text-base lg:text-xl text-gray-800 group-hover:text-pink-700 transition-colors truncate">
                                  {petId.name}
                                </h3>

                                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-2 lg:gap-3">
                                  <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 bg-blue-100 rounded-full">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-xs sm:text-sm font-medium text-blue-700">
                                      النوع: {petId?.type}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 bg-green-100 rounded-full">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs sm:text-sm font-medium text-green-700">
                                      الوزن: {petId?.weight} كجم
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Action Button */}
                              <Link
                                to={""}
                                className="flex items-center justify-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg sm:rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-medium text-xs sm:text-sm shadow-md sm:shadow-lg hover:shadow-xl transform hover:scale-105 group/btn whitespace-nowrap"
                              >
                                <span className="hidden sm:inline">عرض التفاصيل</span>
                                <span className="sm:hidden">عرض</span>
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* More pets indicator */}
                  {value?.favPet.length > 3 && (
                    <div className="relative text-center py-2 sm:py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-white">
                        <div className="flex -space-x-0.5 sm:-space-x-1">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full border-1 sm:border-2 border-white flex items-center justify-center"
                            >
                              <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-white fill-current" />
                            </div>
                          ))}
                        </div>
                        <span className="text-gray-600 font-medium text-xs sm:text-sm">
                          وأكثر من <span className="text-pink-600 font-bold">{value?.favPet.length - 3}</span> حيوانات
                          أخرى
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-8 sm:py-12 lg:py-16 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-8 sm:w-16 h-8 sm:h-16 border-2 border-pink-300 rounded-full"></div>
                    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-6 sm:w-12 h-6 sm:h-12 border-2 border-rose-300 rounded-full"></div>
                    <div className="absolute top-8 sm:top-16 right-8 sm:right-16 w-3 sm:w-6 h-3 sm:h-6 bg-pink-200 rounded-full"></div>
                  </div>

                  <div className="relative space-y-4 sm:space-y-6">
                    <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center shadow-inner animate-pulse">
                      <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-700">لا توجد حيوانات مفضلة</h3>
                      <p className="text-gray-500 max-w-sm mx-auto text-sm sm:text-base">
                        ابدأ بإضافة حيواناتك المفضلة لتراها هنا وتتابع أخبارهم
                      </p>
                    </div>

                    <Link
                      to={""}
                      className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl sm:rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                    >
                      <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90" />
                      <span>تصفح الحيوانات</span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* My Pets Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                حيواناتي الأليفة
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              {value?.pet && value?.pet.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {value?.pet.slice(0, 3).map((petId, index) => (
                    <div
                      key={index}
                      className="group p-3 sm:p-4 border-2 border-gray-100 rounded-xl sm:rounded-2xl hover:border-green-200 hover:bg-green-50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-700 text-sm sm:text-base truncate">Pet ID: {petId._id}</p>
                        <Link
                          to={""}
                          className="text-green-600 hover:text-green-700 font-medium text-xs sm:text-sm px-2 sm:px-3 py-1 bg-green-100 rounded-lg hover:bg-green-200 transition-colors whitespace-nowrap"
                        >
                          عرض
                        </Link>
                      </div>
                    </div>
                  ))}
                  {value?.pet.length > 3 && (
                    <div className="text-center py-2">
                      <span className="text-gray-500 text-xs sm:text-sm">
                        وأكثر من {value?.pet.length - 3} حيوانات أخرى
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                  </div>
                  <p className="text-gray-500 mb-4 text-sm sm:text-base">لم تسجل أي حيوانات بعد</p>
                  <Link
                    to="/pets/register"
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors text-xs sm:text-sm font-medium"
                  >
                    <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    تسجيل حيوان جديد
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Moments Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                اللحظات المميزة
              </h2>
              <Link
                to="/Community"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg sm:rounded-xl hover:bg-purple-700 transition-colors text-xs sm:text-sm font-medium"
              >
                <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                إضافة لحظة
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {posts && posts.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {posts.map(({ post }) => (
                  <article
                    key={post._id}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    <div className="flex items-center p-4 sm:p-6 pb-3 sm:pb-4">
                      <div className="relative ">
                        <img
                          src={post.userImage || "/default-avatar.jpg"}
                          alt={`${post.userName}'s profile`}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full aspect-[3/10]  border-2 border-white shadow-lg"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/default-avatar.jpg"
                          }}
                        />
                        <div className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm sm:text-base truncate">{post.userName}</p>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <time className="truncate">{format(new Date(post.createdAt), "MMM d, yyyy · h:mm a")}</time>
                        </div>
                      </div>
                    </div>

                    {post.postImage && (
                      <div className="relative overflow-hidden bg-gray-100">
                        <img
                          src={post.postImage}
                          alt="Post content"
                          className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="p-4 sm:p-6 pt-3 sm:pt-4">
                      <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <button className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-200 group/like">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover/like:fill-current" />
                          <span className="font-medium text-sm sm:text-base">{post.likesNumber}</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                          <span>انقر للتفاعل</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">لا توجد لحظات بعد</h3>
                <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
                  ابدأ بمشاركة لحظاتك المميزة مع المجتمع
                </p>
                <Link
                  to="/moments/create"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
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
