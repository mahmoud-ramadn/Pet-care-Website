import { BookOpen, ChevronLeft, ChevronRight, Clock, TrendingUp } from "lucide-react"

import { useMemo, useState } from "react"
import { Helmet } from "react-helmet"

import BlogCard from "@/components/ui/blogs/blog-card"
import BlogSkeleton from "@/components/ui/blogs/blog-skeleton"
import { Button } from "@/components/ui/button"
import UiTitle from "@/components/ui/ui-title"

import { useBlog } from "@/hooks/blogs"

const BLOGS_PER_PAGE = 8 // Number of blogs to show per page

export default function Blogs() {
  const { value: blogs, loading } = useBlog()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination data
  const { paginatedBlogs, totalPages, startIndex, endIndex, totalBlogs } = useMemo(() => {
    if (!blogs) return { paginatedBlogs: [], totalPages: 0, startIndex: 0, endIndex: 0, totalBlogs: 0 }

    const filtered = searchTerm
      ? blogs.filter((blog) => blog.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      : blogs

    const total = filtered.length
    const pages = Math.ceil(total / BLOGS_PER_PAGE)
    const start = (currentPage - 1) * BLOGS_PER_PAGE
    const end = Math.min(start + BLOGS_PER_PAGE, total)
    const paginated = filtered.slice(start, end)

    return {
      paginatedBlogs: paginated,
      totalPages: pages,
      startIndex: start,
      endIndex: end,
      totalBlogs: total,
    }
  }, [blogs, searchTerm, currentPage])

  // Reset to first page when search changes
  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of blogs section
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <Helmet>
        <title>مدونة عالم الحيوانات</title>
        <meta name="description" content="اكتشف أحدث المقالات والنصائح حول رعاية الحيوانات الأليفة والتبني المسؤول" />
      </Helmet>
      <div className="min-h-screen light:bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48 blur-3xl" />
          </div>

          <div className="container relative z-10 py-20">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4" />
                <span>مدونة الحيوانات الأليفة</span>
              </div>

              <UiTitle className="text-5xl lg:text-6xl font-bold text-white drop-shadow-xl">
                مدونة عالم الحيوانات
              </UiTitle>

              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                اكتشف أحدث المقالات والنصائح حول رعاية الحيوانات الأليفة والتبني المسؤول
              </p>

              <div className="flex justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{blogs?.length || 0}</div>
                  <div className="text-blue-200 text-sm">مقال</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1.2K</div>
                  <div className="text-blue-200 text-sm">قارئ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-blue-200 text-sm">رضا</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          {!loading && blogs && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">المقالات الرائجة</h2>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {blogs.slice(0, 3).map((blog, index) => (
                    <div
                      key={blog._id}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 line-clamp-1 text-sm">{blog.description}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>٥ دقائق قراءة</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pagination Info */}
          {!loading && totalBlogs > 0 && (
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                عرض {startIndex + 1} - {endIndex} من {totalBlogs} مقال
              </div>
              <div className="text-sm text-gray-600">
                الصفحة {currentPage} من {totalPages}
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="transform transition-all duration-500 opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                >
                  <BlogSkeleton />
                </div>
              ))
            ) : paginatedBlogs?.length ? (
              paginatedBlogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className="transform transition-all duration-500 opacity-0 animate-fadeIn hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <BlogCard {...blog} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {searchTerm ? "لم نجد مقالات تطابق بحثك" : "لا توجد مقالات متاحة حالياً"}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {searchTerm
                      ? "جرب استخدام كلمات مختلفة أو تصفح الفئات المتاحة"
                      : "سنقوم بإضافة مقالات جديدة قريباً. تابع معنا للحصول على أحدث المحتوى"}
                  </p>
                  {searchTerm && (
                    <Button
                      onClick={() => handleSearchChange("")}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                      مسح البحث
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center mt-12 gap-2">
              {/* Previous Button */}
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <Button
                      onClick={() => handlePageChange(1)}
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 rounded-lg"
                    >
                      1
                    </Button>
                    {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                  </>
                )}

                {/* Pages around current */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === currentPage ||
                      page === currentPage - 1 ||
                      page === currentPage + 1 ||
                      (currentPage <= 2 && page <= 3) ||
                      (currentPage >= totalPages - 1 && page >= totalPages - 2)
                  )
                  .map((page) => (
                    <Button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === page ? "bg-blue-600 hover:bg-blue-700 text-white" : ""
                      }`}
                    >
                      {page}
                    </Button>
                  ))}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                    <Button
                      onClick={() => handlePageChange(totalPages)}
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 rounded-lg"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              {/* Next Button */}
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
                className="px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Custom Styles */}
        <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
      </div>
    </>
  )
}
