"use client";
import { CommentType } from "@/types/CommentType";
import React from "react";
import Image from "next/image";

// Swiper Bileşenleri ve Modülleri
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper CSS Dosyaları
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";

export default function Comment_swiper({
  comments,
}: {
  comments: CommentType[];
}) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-12"
      >
        {comments?.map((comment) => (
          <SwiperSlide key={comment.id}>
            <div className="flex flex-col gap-4 items-center text-white">
              {/* IMAGE & USER */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-32 w-32 border-2 border-orange-500 rounded-full p-1">
                  <Image
                    src={comment.user_image}
                    alt={comment.user}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <p className="font-bold text-lg">{comment.user}</p>
              </div>
              <div className="flex text-yellow-500">
                {/* Rate değerine göre yıldız oluşturma */}
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={index < comment.rate ? "currentColor" : "none"}
                    className={index < comment.rate ? "" : "text-gray-300"}
                  />
                ))}
              </div>
              {/* COMMENT */}
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-center shadow-xl">
                <p className="text-sm italic leading-relaxed min-h-15">
                  {comment.comment.length > 90
                    ? `"${comment.comment.slice(0, 90)}..."`
                    : `"${comment.comment}"`}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination noktalarını görünür kılmak için özel stil */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #f97316 !important; /* orange-500 */
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
