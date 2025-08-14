import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

type SquareType = {
  title: string
  image: string
  className?: string
  path?: string
  titleClassName?: string
  imageClassName?: string
}

export default function SquareNavigation({
  title,
  image,
  className,
  path,
  titleClassName,
  imageClassName,
}: Readonly<SquareType>) {
  return (
    <Link
      to={path || "#"}
      className={cn(
        `group relative flex flex-col items-center justify-center gap-4 p-6
        backdrop-blur-sm rounded-xl shadow-sm
        transition-all duration-300 hover:shadow-lg
        border border-gray-100`,
        className
      )}
    >
      <div className="relative rounded-lg">
        <img
          className={cn(
            "w-36 h-36 object-cover transition-transform duration-500 ",
            imageClassName
          )}
          src={image}
          alt={title}
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/placeholder-animal.jpg"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3
        className={cn(
          "text-xl font-semibold text-gray-800 relative",
          "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0",
          "after:bg-amber-400 after:transition-all after:duration-300",
          "group-hover:after:w-full",
          titleClassName
        )}
      >
        {title}
      </h3>
    </Link>
  )
}
