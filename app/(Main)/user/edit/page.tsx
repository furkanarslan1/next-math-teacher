// app/(Main)/profile/edit/page.tsx
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileEditForm from "../_components/ProfileEditForm";

export default async function EditProfilePage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto p-6 pt-24">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-2xl font-bold mb-8">Profili Düzenle</h1>

        {/* Client Side Form Bileşeni */}
        <ProfileEditForm profile={profile} user={user} />
      </div>
    </div>
  );
}
