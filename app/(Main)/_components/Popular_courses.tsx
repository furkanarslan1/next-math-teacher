import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const popularCourse = [
  {
    id: 1,
    title: "Math LGS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 199,
    image: "/hero-image.jpg",
    slug: "lorem1",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde atque placeat sed perspiciatis et praesentium facilis sequi nulla facere explicabo id, sapiente nobis minus minima rerum ipsam vel nesciunt. Neque voluptate harum quam voluptatum beatae, voluptatibus assumenda repellat, magnam mollitia reprehenderit odio pariatur odit asperiores est qui placeat ut temporibus dolorem laudantium iure explicabo. Reprehenderit eius facilis impedit possimus. Repellat possimus quaerat quisquam placeat nobis libero nesciunt vel sint recusandae. Repudiandae, necessitatibus quod sint minus ex velit deleniti quos cumque ipsum pariatur voluptates commodi, accusantium corrupti odio repellat asperiores libero itaque sed alias animi autem. Vero harum qui, nostrum, ea quos vitae totam fuga repellat rem exercitationem iure blanditiis similique. Optio soluta a delectus nulla cum quod pariatur voluptate temporibus, commodi maiores natus, beatae porro cumque sequi molestiae dignissimos consectetur adipisci? Esse mollitia nisi at tempora. Natus, quae. Nobis, beatae. Iusto aliquid odio corporis reiciendis reprehenderit aperiam nulla ut debitis dignissimos facilis! Nihil aut consectetur, adipisci fuga hic accusantium vero porro laborum quia doloribus placeat. Exercitationem debitis aut pariatur reprehenderit molestiae at amet adipisci, itaque alias. Expedita sapiente fugiat est suscipit quaerat accusamus dicta nisi, fuga saepe aperiam labore a ut amet. Tempore officia eligendi magnam ipsum repudiandae. Distinctio, dicta.",
    features: [
      "Personalized Curriculum",
      "Practical Problem-Solving Techniques",
      "Weekly Homework Tracking",
      "Regular Progress Reporting",
      " On-demand Q&A Support via WhatsApp / 24/7 Question Support Line",
      "Exam Anxiety Management",
      "Extensive Resource Library",
      "Practice Exams",
      "Flexible Scheduling",
      "In-person or Online Lesson Options",
      "One-on-One Tutoring or Small Boutique Groups",
    ],
  },
  {
    id: 1,
    title: "Math LGS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 199,
    image: "/hero-image.jpg",
    slug: "lorem1",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde atque placeat sed perspiciatis et praesentium facilis sequi nulla facere explicabo id, sapiente nobis minus minima rerum ipsam vel nesciunt. Neque voluptate harum quam voluptatum beatae, voluptatibus assumenda repellat, magnam mollitia reprehenderit odio pariatur odit asperiores est qui placeat ut temporibus dolorem laudantium iure explicabo. Reprehenderit eius facilis impedit possimus. Repellat possimus quaerat quisquam placeat nobis libero nesciunt vel sint recusandae. Repudiandae, necessitatibus quod sint minus ex velit deleniti quos cumque ipsum pariatur voluptates commodi, accusantium corrupti odio repellat asperiores libero itaque sed alias animi autem. Vero harum qui, nostrum, ea quos vitae totam fuga repellat rem exercitationem iure blanditiis similique. Optio soluta a delectus nulla cum quod pariatur voluptate temporibus, commodi maiores natus, beatae porro cumque sequi molestiae dignissimos consectetur adipisci? Esse mollitia nisi at tempora. Natus, quae. Nobis, beatae. Iusto aliquid odio corporis reiciendis reprehenderit aperiam nulla ut debitis dignissimos facilis! Nihil aut consectetur, adipisci fuga hic accusantium vero porro laborum quia doloribus placeat. Exercitationem debitis aut pariatur reprehenderit molestiae at amet adipisci, itaque alias. Expedita sapiente fugiat est suscipit quaerat accusamus dicta nisi, fuga saepe aperiam labore a ut amet. Tempore officia eligendi magnam ipsum repudiandae. Distinctio, dicta.",
    features: [
      "Personalized Curriculum",
      "Practical Problem-Solving Techniques",
      "Weekly Homework Tracking",
      "Regular Progress Reporting",
      " On-demand Q&A Support via WhatsApp / 24/7 Question Support Line",
      "Exam Anxiety Management",
      "Extensive Resource Library",
      "Practice Exams",
      "Flexible Scheduling",
      "In-person or Online Lesson Options",
      "One-on-One Tutoring or Small Boutique Groups",
    ],
  },
  {
    id: 1,
    title: "Math LGS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 199,
    image: "/hero-image.jpg",
    slug: "lorem1",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde atque placeat sed perspiciatis et praesentium facilis sequi nulla facere explicabo id, sapiente nobis minus minima rerum ipsam vel nesciunt. Neque voluptate harum quam voluptatum beatae, voluptatibus assumenda repellat, magnam mollitia reprehenderit odio pariatur odit asperiores est qui placeat ut temporibus dolorem laudantium iure explicabo. Reprehenderit eius facilis impedit possimus. Repellat possimus quaerat quisquam placeat nobis libero nesciunt vel sint recusandae. Repudiandae, necessitatibus quod sint minus ex velit deleniti quos cumque ipsum pariatur voluptates commodi, accusantium corrupti odio repellat asperiores libero itaque sed alias animi autem. Vero harum qui, nostrum, ea quos vitae totam fuga repellat rem exercitationem iure blanditiis similique. Optio soluta a delectus nulla cum quod pariatur voluptate temporibus, commodi maiores natus, beatae porro cumque sequi molestiae dignissimos consectetur adipisci? Esse mollitia nisi at tempora. Natus, quae. Nobis, beatae. Iusto aliquid odio corporis reiciendis reprehenderit aperiam nulla ut debitis dignissimos facilis! Nihil aut consectetur, adipisci fuga hic accusantium vero porro laborum quia doloribus placeat. Exercitationem debitis aut pariatur reprehenderit molestiae at amet adipisci, itaque alias. Expedita sapiente fugiat est suscipit quaerat accusamus dicta nisi, fuga saepe aperiam labore a ut amet. Tempore officia eligendi magnam ipsum repudiandae. Distinctio, dicta.",
    features: [
      "Personalized Curriculum",
      "Practical Problem-Solving Techniques",
      "Weekly Homework Tracking",
      "Regular Progress Reporting",
      " On-demand Q&A Support via WhatsApp / 24/7 Question Support Line",
      "Exam Anxiety Management",
      "Extensive Resource Library",
      "Practice Exams",
      "Flexible Scheduling",
      "In-person or Online Lesson Options",
      "One-on-One Tutoring or Small Boutique Groups",
    ],
  },
  {
    id: 1,
    title: "Math LGS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 199,
    image: "/hero-image.jpg",
    slug: "lorem1",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde atque placeat sed perspiciatis et praesentium facilis sequi nulla facere explicabo id, sapiente nobis minus minima rerum ipsam vel nesciunt. Neque voluptate harum quam voluptatum beatae, voluptatibus assumenda repellat, magnam mollitia reprehenderit odio pariatur odit asperiores est qui placeat ut temporibus dolorem laudantium iure explicabo. Reprehenderit eius facilis impedit possimus. Repellat possimus quaerat quisquam placeat nobis libero nesciunt vel sint recusandae. Repudiandae, necessitatibus quod sint minus ex velit deleniti quos cumque ipsum pariatur voluptates commodi, accusantium corrupti odio repellat asperiores libero itaque sed alias animi autem. Vero harum qui, nostrum, ea quos vitae totam fuga repellat rem exercitationem iure blanditiis similique. Optio soluta a delectus nulla cum quod pariatur voluptate temporibus, commodi maiores natus, beatae porro cumque sequi molestiae dignissimos consectetur adipisci? Esse mollitia nisi at tempora. Natus, quae. Nobis, beatae. Iusto aliquid odio corporis reiciendis reprehenderit aperiam nulla ut debitis dignissimos facilis! Nihil aut consectetur, adipisci fuga hic accusantium vero porro laborum quia doloribus placeat. Exercitationem debitis aut pariatur reprehenderit molestiae at amet adipisci, itaque alias. Expedita sapiente fugiat est suscipit quaerat accusamus dicta nisi, fuga saepe aperiam labore a ut amet. Tempore officia eligendi magnam ipsum repudiandae. Distinctio, dicta.",
    features: [
      "Personalized Curriculum",
      "Practical Problem-Solving Techniques",
      "Weekly Homework Tracking",
      "Regular Progress Reporting",
      " On-demand Q&A Support via WhatsApp / 24/7 Question Support Line",
      "Exam Anxiety Management",
      "Extensive Resource Library",
      "Practice Exams",
      "Flexible Scheduling",
      "In-person or Online Lesson Options",
      "One-on-One Tutoring or Small Boutique Groups",
    ],
  },
];

export default function Popular_courses() {
  return (
    <section className="max-w-6xl mx-auto bg-black p-4 lg:rounded-lg space-y-4">
      <h1 className="text-white font-bold text-2xl">Popular Courses </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
        {popularCourse.map((course, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-gray-700 text-slate-300 p-4 rounded-lg px-6 text-sm space-y-4">
              <h3 className="text-center font-bold text-white border-b-2 border-white pb-1">
                {course.title}
              </h3>
              <ul className=" flex flex-col items-start gap-2">
                {course.features.map((feature, index) => (
                  <li key={index} className="list-disc ">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="bg-gray-300 w-full px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
            >
              Details
              <ArrowRight />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
