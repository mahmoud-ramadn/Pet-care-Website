import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useAtomValue } from "jotai"
import {
  BarChartIcon,
  CalendarIcon,
  HelpCircleIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MailIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react"

import { Link } from "react-router"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar"

import { userInfoAtom } from "@/atoms"

import { Button } from "../button"

export function AppSidebar() {
  const user = useAtomValue(userInfoAtom)
  let userData: LoginUser

  if (typeof user === "string") {
    try {
      userData = JSON.parse(user)
    } catch (err) {
      console.error("Failed to parse user data:", err)
      return <p>{}</p>
    }
  } else {
    userData = user as LoginUser
  }

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Pet</span>
          </div>
          <img src="/public/logo.webp" alt="logo" className=" size-10" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup className="py-4">
          <nav className="space-y-1 px-3">
            <Button variant="outline" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
              <Link to="/" className=" flex  w-full justify-start  item-center gap-3   text-gray-700 hover:bg-gray-100">
                <HomeIcon className="h-4 w-4" />
                Pet care Home
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
              <Link
                to="/admin-dashboard"
                className=" flex  w-full justify-start  item-center gap-3   text-gray-700 hover:bg-gray-100"
              >
                <LayoutDashboardIcon className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
              <Link
                to="/products"
                className=" flex  w-full justify-start  item-center gap-3   text-gray-700 hover:bg-gray-100"
              >
                <ShoppingBagIcon className="h-4 w-4" />
                product
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
              <BarChartIcon className="h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
              <MailIcon className="h-4 w-4" />
              Messages
              <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">3</span>
            </Button>
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
