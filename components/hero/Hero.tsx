import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="relative h-150 lg:h-200">
      <Image
        src="/deneme.jpg"
        alt="math-hero"
        className="object-cover object-left "
        fill
      />
      <div className="absolute inset-0 bg-black/30 "></div>
    </div>
  );
}
