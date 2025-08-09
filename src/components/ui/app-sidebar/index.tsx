import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useAtomValue } from "jotai"
import {
  Cog,
  HelpCircleIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react"

import { Link, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar"

import { userInfoAtom } from "@/atoms"

import { Button } from "../button"

export function AppSidebar() {
  const location = useLocation()
  const user = useAtomValue(userInfoAtom)
  let userData: LoginUser

if (!user) {
  return <p>Loading...</p> // أو أي UI لليوزر اللي مش مسجل
}

if (typeof user === "string") {
  try {
    userData = JSON.parse(user)
  } catch (err) {
    console.error("Failed to parse user data:", err)
    return <p>Error loading user</p>
  }
} else {
  userData = user as LoginUser
}

if (!userData || !userData.role) {
  return <p>No user data</p> // أو redirect لصفحة تسجيل الدخول
}



  const isActive = (path: string) => {
    return location.pathname === path
  }


  const navItems = [
    { to: "/", icon: HomeIcon, text: "Pet care Home" },
    { to: "/admin-dashboard", icon: LayoutDashboardIcon, text: "Dashboard" },
    { to: "/products", icon: ShoppingBagIcon, text: "Products" },
    { to: "/services-board", icon: Cog, text: "Services" },
  ]
  const userPage = [
    { to: "/", icon: HomeIcon, text: "Pet care Home" },
    { to: "/orders", icon: LayoutDashboardIcon, text: "orders" },
  ]

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Pet</span>
          </div>
          <img src="/logo.webp" alt="logo" className="size-10" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup className="py-4">
          <nav className="space-y-1 px-3">
            {(userData.role === "admin" ? navItems : userPage).map((item) => (
              <Button
                key={item.to}
                variant={isActive(item.to) ? "default" : "outline"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive(item.to) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Link to={item.to} className="flex w-full justify-start items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </Link>
              </Button>
            ))}
          </nav>
        </SidebarGroup>

        <Separator className="my-2" />

        <SidebarGroup className="py-4">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Team</h3>
          <nav className="space-y-1 px-3">
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
              <UsersIcon className="h-4 w-4" />
              Members
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData?.profileImage} alt={userData?.name} className="object-cover" />
            <AvatarFallback className="bg-gray-100">US</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userData?.name}</p>
            <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HelpCircleIcon className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
