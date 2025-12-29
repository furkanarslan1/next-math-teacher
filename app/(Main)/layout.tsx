import Header from "@/components/header/Header";
import { createServerSupabase } from "@/lib/supabase/server";
import React from "react";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-30">
        <Header user={user} />
      </header>
      <main className="min-h-screen ">{children}</main>
    </>
  );
}
