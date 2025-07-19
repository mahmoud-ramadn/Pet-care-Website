import { cn } from "@/lib/utils"

export default function BlogsCard({ image, title, className, date, category }: Readonly<BlogCardType>) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer",
        "bg-white dark:bg-gray-800", // Light/dark mode support
        className
      )}
    >
      {/* Image container with hover effect */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* Category tag */}
        {category && (
          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-white bg-primary rounded-full">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold leading-tight mb-1 line-clamp-2">{title}</h3>

        {/* Date */}
        {date && (
          <p className="text-sm opacity-80">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}
