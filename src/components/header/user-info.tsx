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
import { DotIcon, LogOut, PillIcon, UserIcon } from "lucide-react"

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="ghost"
          className="flex items-center gap-3 rounded-xl bg-white hover:bg-muted px-3 py-2 shadow-sm border border-gray-200"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={userData?.profileImage} alt={userData?.id} />
            <AvatarFallback className="rounded-lg">MR</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left text-sm leading-tight">
            <p className="font-semibold text-gray-800">{userData?.name}</p>
            <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
          </div>
          <DotIcon className="ml-auto size-4 text-muted" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-56 rounded-xl border border-gray-200 shadow-xl bg-gradient-to-br from-white to-gray-50 p-1"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-3 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage src={userData?.profileImage} alt={userData?.name} className="rounded-lg" />
              <AvatarFallback className="rounded-lg">MR</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-semibold">{userData?.name}</p>
              <p className="text-xs text-gray-500">{userData?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {userData?.role === "admin" ? (
            <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer">
              <UserIcon size={16} />
              Admin Dashboard
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer">
              <UserIcon size={16} />
              user Dashboard
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer">
            <PillIcon size={16} />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={logout}
          className="px-3 py-2 rounded-md flex items-center gap-4 hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
