"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";

export default function AdminNavbar() {
  return (
    <nav className="flex items-center justify-between p-4  ">
      {/* LEFT */}
      <SidebarTrigger />

      {/* RIGHT */}

      <div className="flex items-center gap-4">
        <Link href="/admin">Admin</Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} className="w-56" align="start">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator>
              <DropdownMenuItem>
                <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuSeparator>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
