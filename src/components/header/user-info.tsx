import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { useAtomValue } from "jotai"
import { ChevronDown, LogOut, PillIcon, UserIcon } from "lucide-react"

import { Link } from "react-router-dom"

import { userInfoAtom } from "@/atoms"
import { useLogout } from "@/hooks/auth"

import { Button } from "../ui/button"

const isMobile = typeof window !== "undefined" && window.innerWidth < 768

export default function UserInfo() {
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const logout = useLogout()

  const getInitials = (name?: string) => {
    if (!name) return "US"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="ghost"
          className="flex items-center gap-3 rounded-xl bg-white hover:bg-gray-50 px-3 py-2 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8 rounded-lg border border-gray-200">
            <AvatarImage src={userData?.profileImage} alt={userData?.name} className="object-cover" />
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 font-medium text-gray-700">
              {getInitials(userData?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left text-sm leading-tight">
            <p className="font-semibold text-gray-800 truncate max-w-[120px]">{userData?.name}</p>
            <p className="text-xs text-gray-500 truncate max-w-[120px]">{userData?.email}</p>
          </div>
          <ChevronDown className="ml-1 size-4 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-56 rounded-xl border border-gray-200 shadow-xl bg-white p-1.5 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={8}
        collisionPadding={16}
      >
        <DropdownMenuLabel className="p-3 font-normal hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-lg border border-gray-200">
              <AvatarImage src={userData?.profileImage} alt={userData?.name} className="rounded-lg object-cover" />
              <AvatarFallback className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 font-medium text-gray-700">
                {getInitials(userData?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm overflow-hidden">
              <p className="font-semibold truncate">{userData?.name}</p>
              <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-100 h-[1px]" />

        <DropdownMenuGroup>
          {userData?.role === "admin" ? (
            <DropdownMenuItem asChild>
              <Link
                to="/admin-dashboard"
                className="w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium text-gray-700"
              >
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <UserIcon size={16} />
                </div>
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link
                to="/use-dashboard"
                className="w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium text-gray-700"
              >
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <UserIcon size={16} />
                </div>
                User Dashboard
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium text-gray-700">
            <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
              <PillIcon size={16} />
            </div>
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-gray-100 h-[1px]" />

        <DropdownMenuItem
          onSelect={logout}
          className="px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-red-50 transition-colors cursor-pointer text-sm font-medium text-red-600"
        >
          <div className="p-1.5 bg-red-50 rounded-lg text-red-600">
            <LogOut size={16} />
          </div>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
