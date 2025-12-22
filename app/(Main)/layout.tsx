import Header from "@/components/header/Header";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-30">
        <Header />
      </header>
      <main className="min-h-screen ">{children}</main>
    </>
  );
}
