import { ArrowRight, Sparkles } from "lucide-react"

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
        "group relative flex flex-col items-center justify-center gap-6 p-8 ",
        "    dark:bg-gradient-to-br from-black  to-blue-700 ",
        "backdrop-blur-sm rounded-2xl border border-blue-200 ",
        " hover:border-primary/30",
        "transition-all duration-500 transform  ",
        "overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-secondary/5",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        className
      )}
    >
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 delay-200">
        <div className="bg-primary/10 backdrop-blur-sm rounded-full p-2 border border-primary/20">
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      </div>

      <div className="relative group/image">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl  shadow-md group-hover:shadow-xl transition-all duration-500 border border-gray-100">
          <img
            className={cn(
              "size-32 object-cover rounded-lg transition-all duration-700",
              "group-hover:scale-110 group-hover:rotate-3 group-hover:brightness-110",
              "shadow-sm group-hover:shadow-lg",
              imageClassName
            )}
            src={image}
            alt={title}
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "/placeholder-animal.jpg"
            }}
          />

          <div className="absolute inset-4 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute inset-4 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 bg-white shadow-lg rounded-full p-2 border-2 border-primary/20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
        </div>
      </div>

      <div className="relative text-center">
        <h3
          className={cn(
            "text-xl font-bold dark:text-white text-gray-800 group-hover:text-primary transition-all duration-300",
            "relative z-10",
            "after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2",
            "after:h-[3px] after:w-0 after:bg-gradient-to-r after:from-primary after:to-secondary",
            "after:transition-all after:duration-500 after:rounded-full",
            "group-hover:after:w-full",
            "before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2",
            "before:h-[1px] before:w-0 before:bg-primary/30",
            "before:transition-all before:duration-700 before:delay-200",
            "group-hover:before:w-[120%]",
            titleClassName
          )}
        >
          {title}
        </h3>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg" />
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <div className="w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-100" />
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-200" />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-secondary/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />

      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 scale-0 group-active:scale-100 transition-transform duration-200 rounded-full" />
      </div>
    </Link>
  )
}
