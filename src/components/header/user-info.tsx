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
import { ChevronDown, LogOut, PillIcon, UserIcon } from "lucide-react"

import { Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { useLogout } from "@/hooks/auth"
import { useGetMe } from "@/hooks/user"

import { Button } from "../ui/button"
import Loader from "../ui/loader"

const isMobile = typeof window !== "undefined" && window.innerWidth < 768

export default function UserInfo() {
  const { value } = useGetMe()
  const { t } = useTranslation()

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
          className="flex items-center gap-3 rounded-xl   dark:bg-gradient-to-r from-black to to-blue-700 bg-white hover:bg-gray-50  shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
          aria-label={t("userMenu")}
        >
          <Avatar className="h-8 w-8 rounded-lg  overflow-hidden border border-gray-200">
            <AvatarImage src={value?.profileImage} alt={value?.name} className="object-cover  size-full " />
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 size-full font-medium text-gray-700">
              {getInitials(value?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left text-sm leading-tight">
            <p className="font-semibold dark:text-white text-gray-800 truncate max-w-[120px]">{value?.name}</p>
            <p className="text-xs dark:text-white text-gray-500 truncate max-w-[120px]">{value?.email}</p>
          </div>
          <ChevronDown className="ml-1 size-4 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-4">
            <Loader className="w-4 h-4 animate-spin" />
          </div>
        }
      >
        <DropdownMenuContent
          className="min-w-56 rounded-xl border z-10  border-gray-200 shadow-xl dark:bg-gradient-to-r from-black to to-blue-700 bg-white p-1.5 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade"
          side={isMobile ? "bottom" : "right"}
          align="end"
          sideOffset={8}
          collisionPadding={16}
        >
          <DropdownMenuLabel className="p-3 font-normal rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-lg border border-gray-200">
                <AvatarImage
                  src={value?.profileImage}
                  alt={value?.name}
                  className="rounded-lg overflow-hidden h-full w-full object-cover"
                />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 font-medium text-gray-700">
                  {getInitials(value?.name)}
                </AvatarFallback>
              </Avatar>
              <Link to={`/user/${value?._id}`} className="text-sm overflow-hidden">
                <p className="font-semibold  dark:text-white">{value?.name}</p>
                <p className="text-xs text-gray-500 truncate">{value?.email}</p>
              </Link>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-gray-100 h-[1px]" />

          <DropdownMenuGroup>
            {value?.role === "admin" ? (
              <DropdownMenuItem asChild>
                <Link
                  to="/admin-dashboard"
                  className="w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium text-gray-700"
                >
                  <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                    <UserIcon size={16} />
                  </div>
                  {t("adminDashboard")}
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
                  {t("userDashboard")}
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem className="px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium text-gray-700">
              <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                <PillIcon size={16} />
              </div>
              {t("notifications")}
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
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </Suspense>
    </DropdownMenu>
  )
}
