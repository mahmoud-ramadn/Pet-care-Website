import { ChevronRight } from "lucide-react"

import { Link } from "react-router-dom"

export function ServiceHeader({ name }: { name?: string }) {
  return (
    <div className="flex items-center text-sm text-gray-500 mb-6">
      <Link to="/">Home</Link>
      <ChevronRight className="w-4 h-4 mx-2" />
      <Link to="/services">Services</Link>
      <ChevronRight className="w-4 h-4 mx-2" />
      <span className="text-primary">{name}</span>
    </div>
  )
}
