import Link from "next/link";
import { Cog, LayoutDashboard, LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/auth";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "../auth/logout-button";

export async function UserNav() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage
                    src={user?.image}
                    alt={`${user?.username}'s profile image`}
                  />
                  {user?.name && (
                    <AvatarFallback className="bg-transparent">
                      {user?.name[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.role === "ADMIN" && (
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link
                href="https://ecommerce.jaymabioinnovations.com/"
                target="_blank"
                className="flex items-center"
              >
                <LayoutDashboard className="w-4 h-4 mr-3 text-muted-foreground" />
                Manage Store
              </Link>
            </DropdownMenuItem>
          )}
          {user?.role === "ADMIN" && (
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/admin/events" className="flex items-center">
                <Cog className="w-4 h-4 mr-3 text-muted-foreground" />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/profile" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
