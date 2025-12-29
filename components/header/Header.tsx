"use client";
import { signOutAction } from "@/app/(Actions)/auth/signOutAction";
import {
  Facebook,
  Instagram,
  LucideTwitter,
  Twitter,
  TwitterIcon,
  User2,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Courses", href: "/courses" },
];

export default function Header({ user }: { user: any }) {
  const pathname = usePathname();
  return (
    <div className="flex justify-around items-center gap-4 h-16 w-full  bg-transparent text-white font-bold">
      <section>
        <h1>Jane Doe</h1>
      </section>
      <section className="flex items-center gap-4">
        {navLinks.map((nav) => (
          <Link
            key={nav.href}
            href={nav.href}
            className={`border-b-2 border-transparent hover:border-white transition-all duration-300 ${
              pathname === nav.href ? "border-b-2 border-white" : ""
            }`}
          >
            {nav.name}
          </Link>
        ))}
      </section>
      <section>
        <div className="flex gap-4">
          <Link
            href="/facebook"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <Facebook size={24} color="#1877F2" />
          </Link>
          <Link
            href="/instagram"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <Instagram size={24} color="#E4405F" />
          </Link>
          <Link
            href="/twitter"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <Twitter size={24} color="#000000" />{" "}
          </Link>
        </div>
      </section>

      {/* SIGN IN AND USER INFO */}
      <section>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-white/60 px-4 py-2 rounded-md">
              <User2 size={20} />
              <p>{user.user_metadata?.full_name || user.email}</p>
            </div>
            <button
              className="px-4 py-2 rounded-md bg-red-600 cursor-pointer text-sm"
              onClick={async () => {
                const result = await signOutAction();
                if (result?.error) {
                  toast.error("Logout failed");
                }
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-white/60 px-4 py-2 rounded-md">
            Sign in
          </Link>
        )}
      </section>
    </div>
  );
}
