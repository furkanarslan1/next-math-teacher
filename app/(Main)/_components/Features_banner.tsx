import { Lightbulb, TrendingUp, UserCheck } from "lucide-react";
import React from "react";

export default function Features_banner() {
  return (
    <div className="grid gird-cols-1 md:grid-cols-3 gap-4 px-16 ">
      <div className="border border-slate-300 rounded-md p-4 bg-orange-500  text-white flex flex-col items-center gap-2">
        <h5 className="font-bold">Personalized Study Plans</h5>
        <UserCheck size={32} strokeWidth={2.5} />
        <p className="text-sm">
          Every student learns differently. I create a special roadmap based on
          your goals and level
        </p>
      </div>
      <div className="border border-slate-300 rounded-md p-4 bg-slate-800  text-white  flex flex-col items-center gap-2">
        <h5 className="font-bold">Focus on New Generation Questions</h5>
        <Lightbulb size={32} strokeWidth={2.5} />
        <p className="text-sm">
          Learn how to solve complex logic and reasoning questions for LGS and
          YKS exams
        </p>
      </div>
      <div className="border border-slate-300 rounded-md p-4 bg-green-500  flex flex-col items-center gap-2">
        <h5 className="font-bold">Progress Tracking</h5>
        <TrendingUp size={32} strokeWidth={2.5} />
        <p className="text-sm">
          track the student's progress and share regular reports with parents
          every month
        </p>
      </div>
    </div>
  );
}
