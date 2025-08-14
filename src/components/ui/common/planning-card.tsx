import { ArrowRight, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "../button"

export default function PlanningCard({ icon, title, description, className }: Readonly<PlanningCardType>) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "border border-primary/20 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
        "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20",
        "transition-all duration-500 hover:-translate-y-2",
        "backdrop-blur-sm",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Floating sparkles */}
      <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
      </div>

      <div className="relative z-10 flex items-center flex-col gap-8 justify-center p-8">
        <div className="flex items-center flex-col gap-6 justify-center text-center">
          {/* Enhanced icon container */}
          <div className="relative group/icon">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary/20 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <img className="size-24 transition-transform duration-300 group-hover:rotate-6" src={icon} alt="icon" />
            </div>
          </div>

          {/* Enhanced title */}
          <h4 className="font-bold text-primary text-2xl leading-tight group-hover:text-primary/90 transition-colors duration-300">
            {title}
          </h4>

          {/* Enhanced description */}
          <p className="text-base leading-relaxed text-primary/80 max-w-xs group-hover:text-primary/70 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Enhanced button */}
        <Button
          variant="outline"
          className={cn(
            "relative overflow-hidden group/btn",
            "rounded-full px-8 py-3 text-primary border-2 border-primary/30",
            "hover:border-primary hover:bg-primary hover:text-white",
            "transform transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "shadow-lg hover:shadow-xl",
            "before:absolute before:inset-0",
            "before:bg-gradient-to-r before:from-primary/20 before:to-secondary/20",
            "before:translate-x-[-100%] hover:before:translate-x-0",
            "before:transition-transform before:duration-500"
          )}
        >
          <span className="relative z-10 flex items-center gap-2 font-semibold">
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
        </Button>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  )
}
