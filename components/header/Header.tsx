"use client";
import {
  Facebook,
  Instagram,
  LucideTwitter,
  Twitter,
  TwitterIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Courses", href: "/courses" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="flex justify-around items-center gap-4 h-16 w-full  bg-black">
      <section>
        <h1>John Doe</h1>
      </section>
      <section className="flex items-center gap-4">
        {navLinks.map((nav) => (
          <Link
            key={nav.href}
            href={nav.href}
            className={`hover:border-b-2 hover:border-white transition-all duration-300 ${
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
    </div>
  );
}
