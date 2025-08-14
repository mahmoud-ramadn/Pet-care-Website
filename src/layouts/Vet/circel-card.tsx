import { ArrowRight, Star, Stethoscope } from "lucide-react"

import { Link } from "react-router"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

export default function CircleCard({ doctorImage, name, description, _id, viewBtm = true }: Readonly<Doctor>) {
  return (
    <div className="group relative flex flex-col gap-6 items-center justify-center p-6 transition-all duration-500 hover:-translate-y-3">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Doctor Image Container */}
      <div className="relative">
        {/* Animated rings */}
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow group-hover:border-primary/40 transition-colors duration-500"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute -inset-2 rounded-full border border-dashed border-secondary/15 animate-spin-slow group-hover:border-secondary/30 transition-colors duration-500"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />

        {/* Gradient border container */}
        <div className="relative p-1 rounded-full bg-gradient-to-br from-primary/20 via-white to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-500">
          <div className="relative overflow-hidden rounded-full bg-white p-1 shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
            <img
              className="size-56 rounded-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              src={doctorImage}
              alt={`Dr. ${name}`}
            />

            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-2 -right-2 bg-white shadow-lg rounded-full p-3 border-2 border-primary/20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <Stethoscope className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute top-2 right-2 bg-green-100 border-2 border-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content Section */}
      <div className="text-center space-y-3 max-w-xs">
        {/* Name with enhanced styling */}
        <div className="space-y-1">
          <h3 className="font-bold text-2xl text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight">
            Dr. {name}
          </h3>

          {/* Rating stars (decorative) */}
          <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </div>

        {/* Description with better styling */}
        <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Enhanced Button */}
      {viewBtm && (
        <div className="relative">
          <Button
            asChild
            className={cn(
              "group/btn relative overflow-hidden",
              "rounded-full px-8 py-4 text-base font-semibold",
              "shadow-lg hover:shadow-xl transition-all duration-300",
              "transform hover:scale-105 active:scale-95",
              "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
              "border-0",
              "before:absolute before:inset-0",
              "before:bg-gradient-to-r before:from-white/20 before:to-transparent",
              "before:translate-x-[-100%] hover:before:translate-x-[100%]",
              "before:transition-transform before:duration-700"
            )}
          >
            <Link to={`${_id}`} className="relative z-10 flex items-center gap-2">
              View Profile
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>

          {/* Button glow effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 -z-10" />
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-secondary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500" />
    </div>
  )
}
