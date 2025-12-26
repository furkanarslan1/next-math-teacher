import React from "react";
import AdminSideBar from "./_components/AdminSideBar";
import AdminNavbar from "./_components/AdminNavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // <SidebarProvider>
    //   <div className="flex">
    //     <AdminSideBar />
    //     <main className="w-full">
    //       <AdminNavbar />
    //       <div className="px-4"> {children}</div>
    //     </main>
    //   </div>
    // </SidebarProvider>

    <SidebarProvider>
      <AdminSideBar />

      <SidebarInset>
        <AdminNavbar />
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
