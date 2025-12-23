import { ShoppingBasketIcon, Star, User } from "lucide-react";
import Image from "next/image";
import React from "react";

const course = {
  id: 1,
  title: "Math LGS Course",
  shortDescription:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
  price: 199,
  image: "/hero-image.jpg",
  slug: "lorem1",
  description:
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde atque placeat sed perspiciatis et praesentium facilis sequi nulla facere explicabo id, sapiente nobis minus minima rerum ipsam vel nesciunt. Neque voluptate harum quam voluptatum beatae, voluptatibus assumenda repellat, magnam mollitia reprehenderit odio pariatur odit asperiores est qui placeat ut temporibus dolorem laudantium iure explicabo. Reprehenderit eius facilis impedit possimus. Repellat possimus quaerat quisquam placeat nobis libero nesciunt vel sint recusandae. Repudiandae, necessitatibus quod sint minus ex velit deleniti quos cumque ipsum pariatur voluptates commodi, accusantium corrupti odio repellat asperiores libero itaque sed alias animi autem. Vero harum qui, nostrum, ea quos vitae totam fuga repellat rem exercitationem iure blanditiis similique. Optio soluta a delectus nulla cum quod pariatur voluptate temporibus, commodi maiores natus, beatae porro cumque sequi molestiae dignissimos consectetur adipisci? Esse mollitia nisi at tempora. Natus, quae. Nobis, beatae. Iusto aliquid odio corporis reiciendis reprehenderit aperiam nulla ut debitis dignissimos facilis! Nihil aut consectetur, adipisci fuga hic accusantium vero porro laborum quia doloribus placeat. Exercitationem debitis aut pariatur reprehenderit molestiae at amet adipisci, itaque alias. Expedita sapiente fugiat est suscipit quaerat accusamus dicta nisi, fuga saepe aperiam labore a ut amet. Tempore officia eligendi magnam ipsum repudiandae. Distinctio, dicta.",
};

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
export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <div className="h-16 bg-black w-full"></div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* IMAGES */}
          <div className="relative h-100 w-full ">
            <Image
              src={course.image}
              alt={course.title}
              className="object-cover rounded-md"
              fill
            />
          </div>
          {/* DETAILS */}

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
            <p className="text-md">{course.description}</p>ü
            <div className="flex items-center justify-around">
              <p>
                Price:{" "}
                <span className="bg-green-500 rounded-md p-1 font-bold">
                  ${course.price}
                </span>
              </p>
              <button className="bg-slate-800 text-white font-bold shadow-md rounded-md px-4 py-2 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                <ShoppingBasketIcon />
                Buy
              </button>
            </div>
          </div>
        </div>
        {/* COMMENTS */}
        <div>
          <h4>Comments</h4>
          <div className="flex flex-col gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
