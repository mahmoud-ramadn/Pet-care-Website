import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bell, Cog, Crown, DogIcon, HelpCircleIcon,  LayoutDashboardIcon, LogOut, NewspaperIcon, PawPrint, Settings, ShoppingBagIcon, ShoppingBasket, Star, Stethoscope, Users } from "lucide-react";



import { Link, useLocation } from "react-router-dom";



import { cn } from "@/lib/utils";



import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";



import { useGetMe } from "@/hooks/user";



import { Button } from "../button";





export function AppSidebar() {
  const location = useLocation()
  const { value } = useGetMe()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navItems = [
    {
      to: "/admin-dashboard",
      icon: LayoutDashboardIcon,
      text: "Dashboard",
      badge: "Admin",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      to: "/products",
      icon: ShoppingBagIcon,
      text: "Products",
      badge: null,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      to: "/services-board",
      icon: Cog,
      text: "Services",
      badge: "New",
      gradient: "from-orange-500 to-red-500",
    },
    {
      to: "/table-blogs",
      icon: NewspaperIcon,
      text: "Blogs",
      badge: "New",
      gradient: "from-purple-500 to-green-500",
    },
    {
      to: "/table-users",
      icon: Users,
      text: "Users",
      badge: null,
      gradient: "from-violet-500 to-blue-500",
    },
    {
      to: "/Doctors-table",
      icon: Stethoscope,
      text: "Doctors",
      badge: null,
      gradient: "from-black-500 to-blue-500",
    },
    {
      to: "/All-users-orders",
      icon: ShoppingBasket,
      text: "All Orders",
      badge: null,
      gradient: "from-gray-500 to-red-500",
    },
  ]

  const userPage = [
    {
      to: "/orders",
      icon: LayoutDashboardIcon,
      text: "My Orders",
      badge: null,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      to: "/my-pets",
      icon: DogIcon,
      text: "My Pets",
      badge: null,
      gradient: "from-white-500 to-orange-500",
    },
  ]

  return (
    <Sidebar className="border-r border-gray-200/80 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-sm">
      {/* Enhanced Header */}
      <SidebarHeader className="px-6 py-6 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Logo with enhanced styling */}
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-200/50">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PetCare
              </span>
              <span className="text-xs text-gray-500 -mt-1">Professional</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <SidebarGroup className="py-6">
          <div className="px-6 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
              Navigation
            </h3>
          </div>

          <nav className="space-y-2 px-4">
            {(value?.role === "admin" ? navItems : userPage).map((item) => {
              const active = isActive(item.to)
              return (
                <div key={item.to} className="relative group">
                  <Link to={item.to} className="block">
                    <div
                      className={cn(
                        "relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:-translate-y-0.5",
                        active
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-lg shadow-blue-100/50 border border-blue-200/30"
                          : "text-gray-700 hover:bg-white hover:shadow-md hover:shadow-gray-100/50 border border-transparent"
                      )}
                    >
                      {/* Active indicator */}
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full"></div>
                      )}

                      {/* Icon with gradient background */}
                      <div
                        className={cn(
                          "relative w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-all duration-200",
                          active
                            ? `bg-gradient-to-br ${item.gradient} shadow-lg shadow-blue-200/30`
                            : "bg-gray-100 group-hover:bg-gray-200"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-5 h-5 transition-colors duration-200",
                            active ? "text-white" : "text-gray-600"
                          )}
                        />

                        {/* Shine effect for active items */}
                        {active && (
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-xl"></div>
                        )}
                      </div>

                      {/* Text */}
                      <span
                        className={cn(
                          "font-medium text-sm transition-colors duration-200 flex-1",
                          active ? "text-blue-800" : "text-gray-700 group-hover:text-gray-900"
                        )}
                      >
                        {item.text}
                      </span>

                      {/* Badge */}
                      {item.badge && (
                        <span className="px-2 py-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs font-medium rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </nav>
        </SidebarGroup>

        {/* Enhanced Separator */}
        <div className="px-6 py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Team Section */}
        <SidebarGroup className="py-4">
          <div className="px-6 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-4 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
              Team & Settings
            </h3>
          </div>

          <nav className="space-y-2 px-4">
            <Link to="/team" className="block group">
              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 hover:bg-white hover:shadow-md hover:shadow-gray-100/50 transform hover:scale-[1.01]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-200">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Team Members
                </span>
                <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </Link>

            <Link to="/settings" className="block group">
              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 hover:bg-white hover:shadow-md hover:shadow-gray-100/50 transform hover:scale-[1.01]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-slate-100 flex items-center justify-center group-hover:from-gray-200 group-hover:to-slate-200 transition-all duration-200">
                  <Settings className="w-5 h-5 text-gray-600" />
                </div>
                <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Settings
                </span>
              </div>
            </Link>
          </nav>
        </SidebarGroup>
      </SidebarContent>

      {/* Enhanced Footer */}
      <SidebarFooter className="  p-4 border-t border-gray-200/60 bg-white/80 backdrop-blur-sm">
        <Link
          to={"/"}
          className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className=" rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                <AvatarImage
                  src={value?.profileImage}
                  alt={value?.name}
                  className="object-cover size-8 overflow-hidden rounded-full"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-semibold text-sm">
                  {value?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              {/* Status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>

              {/* Role badge */}
              {value?.role === "admin" && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-800 truncate">{value?.name || "User"}</p>
                {value?.role === "admin" && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
              </div>
              <p className="text-xs text-gray-500 truncate">{value?.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
              >
                <Bell className="h-4 w-4 group-hover:animate-pulse" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              >
                <HelpCircleIcon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
              >
                <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}