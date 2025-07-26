import BlogCard from "@/components/ui/blogs/blog-card"
import BlogSkeleton from "@/components/ui/blogs/blog-skeleton"
import UiTitle from "@/components/ui/ui-title"

import { useBlog } from "@/hooks/blogs"

export default function Blogs() {
  const { value: blogs, loading } = useBlog()

  return (
    <div className="container my-10">
      <UiTitle className="text-center mb-12">Blogs</UiTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [...Array(3)].map((_, i) => <BlogSkeleton key={i} />)
        ) : blogs?.length ? (
          blogs.map((blog) => <BlogCard key={blog._id} {...blog} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
