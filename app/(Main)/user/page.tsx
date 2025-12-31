import { createServerSupabase } from "@/lib/supabase/server";
import {
  Calendar,
  Edit2,
  Mail,
  User,
  MapPin,
  Phone,
  School,
  GraduationCap,
  Map as MapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Tablo adını 'profiles' olarak güncelledik (Genel standart budur)
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="h-16 bg-slate-900"></div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 pt-12 sm:pt-20">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* BANNER */}
          <div className="h-40 bg-linear-to-r from-slate-900 to-slate-700"></div>

          <div className="relative px-6 pb-8">
            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 gap-6">
              <div className="relative w-40 h-40 rounded-3xl border-8 border-white overflow-hidden bg-gray-100 shadow-lg">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <User size={48} className="text-slate-300" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left pb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {profile?.role || "Student"}
                </span>
                <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
                  {profile?.full_name || "New Student"}
                </h1>
                <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-1 font-medium">
                  <Mail size={16} /> {user.email}
                </p>
              </div>

              <Link
                href="/user/edit"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl transition-all shadow-md active:scale-95"
              >
                <Edit2 size={18} />
                <span className="font-semibold">Edit Profile</span>
              </Link>
            </div>

            {/* INFO GRID */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Phone */}
              <InfoCard
                icon={<Phone size={20} className="text-blue-500" />}
                label="Phone Number"
                value={profile?.phone || "Not specified"}
              />

              {/* School */}
              <InfoCard
                icon={<School size={20} className="text-purple-500" />}
                label="School"
                value={profile?.school || "Not specified"}
              />

              {/* Grade */}
              <InfoCard
                icon={<GraduationCap size={20} className="text-orange-500" />}
                label="Grade"
                value={
                  profile?.grade ? `${profile.grade}. Grade` : "Not specified"
                }
              />

              {/* City / District */}
              <InfoCard
                icon={<MapPin size={20} className="text-red-500" />}
                label="Location"
                value={
                  profile?.city
                    ? `${profile.district} / ${profile.city}`
                    : "Not specified"
                }
              />

              {/* Registration Date */}
              <InfoCard
                icon={<Calendar size={20} className="text-green-500" />}
                label="Join Date"
                value={new Date(user.created_at).toLocaleDateString("tr-TR")}
              />
            </div>

            {/* Address - Full Width */}
            <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                <MapIcon size={14} /> Full Address
              </h3>
              <p className="text-slate-700 font-medium">
                {profile?.address || "No address provided yet."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 bg-white border border-gray-100 rounded-2xl flex items-start gap-3 hover:shadow-md transition-shadow">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          {label}
        </h3>
        <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
