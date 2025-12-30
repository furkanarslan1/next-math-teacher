import CommentForm from "@/components/courses/CommentForm";
import { createServerSupabase } from "@/lib/supabase/server";
import { ShoppingBasketIcon, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

// const course = {
//   id: 1,
//   title: "Math LGS Course",
//   shortDescription:
//     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
//   price: 199,
//   image: "/hero-image.jpg",
//   slug: "lorem1",
//   description:
//     " Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde atque placeat sed perspiciatis et praesentium facilis sequi nulla facere explicabo id, sapiente nobis minus minima rerum ipsam vel nesciunt. Neque voluptate harum quam voluptatum beatae, voluptatibus assumenda repellat, magnam mollitia reprehenderit odio pariatur odit asperiores est qui placeat ut temporibus dolorem laudantium iure explicabo. Reprehenderit eius facilis impedit possimus. Repellat possimus quaerat quisquam placeat nobis libero nesciunt vel sint recusandae. Repudiandae, necessitatibus quod sint minus ex velit deleniti quos cumque ipsum pariatur voluptates commodi, accusantium corrupti odio repellat asperiores libero itaque sed alias animi autem. Vero harum qui, nostrum, ea quos vitae totam fuga repellat rem exercitationem iure blanditiis similique. Optio soluta a delectus nulla cum quod pariatur voluptate temporibus, commodi maiores natus, beatae porro cumque sequi molestiae dignissimos consectetur adipisci? Esse mollitia nisi at tempora. Natus, quae. Nobis, beatae. Iusto aliquid odio corporis reiciendis reprehenderit aperiam nulla ut debitis dignissimos facilis! Nihil aut consectetur, adipisci fuga hic accusantium vero porro laborum quia doloribus placeat. Exercitationem debitis aut pariatur reprehenderit molestiae at amet adipisci, itaque alias. Expedita sapiente fugiat est suscipit quaerat accusamus dicta nisi, fuga saepe aperiam labore a ut amet. Tempore officia eligendi magnam ipsum repudiandae. Distinctio, dicta.",
//   features: [
//     "Personalized Curriculum",
//     "Practical Problem-Solving Techniques",
//     "Weekly Homework Tracking",
//     "Regular Progress Reporting",
//     " On-demand Q&A Support via WhatsApp / 24/7 Question Support Line",
//     "Exam Anxiety Management",
//     "Extensive Resource Library",
//     "Practice Exams",
//     "Flexible Scheduling",
//     "In-person or Online Lesson Options",
//     "One-on-One Tutoring or Small Boutique Groups",
//   ],
// };

const comments = [
  {
    id: 1,
    name: "Furkan Arslan",
    rate: 5,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem tempora dolorum necessitatibus blanditiis? Recusandae assumenda dicta nisi dolorum laborum?",
  },
  {
    id: 2,
    name: "Michel",
    rate: 4,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem tempora dolorum necessitatibus blanditiis? Recusandae assumenda dicta nisi dolorum laborum?",
  },
  {
    id: 3,
    name: "Jennifer",
    rate: 4,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem tempora dolorum necessitatibus blanditiis? Recusandae assumenda dicta nisi dolorum laborum?",
  },
  {
    id: 4,
    name: "Jhone",
    rate: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem tempora dolorum necessitatibus blanditiis? Recusandae assumenda dicta nisi dolorum laborum?",
  },
];
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createServerSupabase();

  const { data: course, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      comments (
        id,
        content,
        rating,
        created_at,
        profiles (
          full_name,
          avatar_url
        )
      )
    `
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Sorgu hatası:", error);
    return <div>Hata oluştu.</div>;
  }

  if (!course) {
    return notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allComments = course.comments || [];
  console.log("Gelen yorum datası:", JSON.stringify(allComments, null, 2));

  return (
    <div>
      <div className="h-16 bg-black w-full"></div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* IMAGES */}
          <div className="relative h-100 w-full ">
            <Image
              src={course.image_url}
              alt={course.title}
              className="object-cover rounded-md"
              fill
            />
          </div>
          {/* DETAILS */}

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
            <ul
              style={{}}
              className="text-md flex flex-col items-start ps-6 gap-4  bg-gray-200 p-4 rounded-lg shadow-md"
            >
              {course.features.map((feature: string, index: number) => (
                <li key={index} className="list-disc font-bold">
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center">
                <p>Price:</p>
                <div>
                  {course.discount_percentage ? (
                    <div className="flex items-center gap-2">
                      <span className="line-through">${course.price}</span>
                      <span className="text-md font-bold text-green-600">
                        $
                        {(
                          course.price -
                          (course.price * course.discount_percentage) / 100
                        ).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    course.price
                  )}
                </div>
              </div>

              <button className="bg-slate-800 text-white font-bold shadow-md rounded-md px-4 py-2 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                <ShoppingBasketIcon />
                Buy
              </button>
            </div>
          </div>
        </div>
        {/* DESCRİPTION */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">Descripton:</h4>
          <p className="text-sm">{course.description}</p>
        </div>
        {/* COMMENTS */}
        <div className="space-y-4">
          <h4 className="font-bold">Comments</h4>
          {user ? (
            <CommentForm courseId={course.id} />
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg text-gray-800 text-sm">
              Please{" "}
              <Link href="/login" className="underline font-bold">
                login
              </Link>{" "}
              to leave a review.
            </div>
          )}
          {/* <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-200 p-4 rounded-md shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2">
                  <p>
                    <User />
                  </p>
                  <p>{comment.name}</p>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={`${
                        star <= comment.rate
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-gray-500">
                    ({comment.rate}/5)
                  </span>
                </div>
                <p className="text-sm">
                  {comment.comment.length > 200
                    ? comment.comment.slice(0, 200)
                    : comment.comment}
                </p>
              </div>
            ))}
          </div> */}

          <div className="grid gap-6">
            {allComments.length > 0 ? (
              allComments.map((comment: any) => (
                <div
                  key={comment.id}
                  className="bg-gray-50 p-6 rounded-xl space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                        {comment.profiles?.avatar_url ? (
                          <img src={comment.profiles.avatar_url} alt="avatar" />
                        ) : (
                          <User className="p-2 w-full h-full text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm">
                          {comment.profiles?.full_name || "Anonymous Student"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {/* Stars*/}
                    <div className="flex text-yellow-400">
                      {[...Array(comment.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No reviews yet. Be the first!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
