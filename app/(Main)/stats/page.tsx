import { getStudentStats } from "@/app/(Actions)/stats/getStatsAction";
import { Trophy, Target, BookmarkCheck, BarChart3 } from "lucide-react";

export default async function StatsPage() {
  const stats = await getStudentStats();

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <Trophy className="text-yellow-500" size={32} /> My Success Report
        </h1>
        <p className="text-slate-500 mt-2">Track your progress here.</p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Questions"
          value={stats.totalQuestions}
          icon={<BookmarkCheck className="text-blue-600" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Number of Correct Answers"
          value={stats.correctAnswers}
          icon={<Target className="text-green-600" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Success Rate"
          value={`%${stats.accuracy}`}
          icon={<BarChart3 className="text-purple-600" />}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Topic-Based Progression */}
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Topic-Based Performance
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(stats.categoryStats).map(([name, data]: any) => {
          const catAccuracy = Math.round((data.correct / data.total) * 100);
          return (
            <div
              key={name}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-slate-700">{name}</span>
                <span className="text-sm font-black text-blue-600">
                  %{catAccuracy}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    catAccuracy > 70
                      ? "bg-green-500"
                      : catAccuracy > 40
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${catAccuracy}%` }}
                />
              </div>
              <div className="flex justify-between mt-3 text-xs text-slate-400 font-medium">
                <span>{data.total} Questions Solved</span>
                <span>{data.correct} TRUE</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bgColor }: any) {
  return (
    <div
      className={`${bgColor} p-8 rounded-[32px] flex items-center gap-6 transition-transform hover:scale-105 cursor-default`}
    >
      <div className="bg-white p-4 rounded-2xl shadow-sm">{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}
