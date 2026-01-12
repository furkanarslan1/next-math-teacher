"use server";

import { revalidatePath } from "next/cache";
import { validateUser } from "@/lib/auth-utils";

export async function updateProfileAction(formData: FormData) {
  //auth control
  const { supabase, user } = await validateUser();

  const fullName = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const grade = formData.get("grade") as string;
  const file = formData.get("avatar") as File;
  const oldAvatarUrl = formData.get("old_avatar_url") as string;

  let avatarUrl = oldAvatarUrl;

  if (file && file.size > 0) {
    // Eski dosyayı temizle
    // Clean up the old file
    if (oldAvatarUrl) {
      const oldPath = oldAvatarUrl.split("avatars/")[1];
      if (oldPath) await supabase.storage.from("avatars").remove([oldPath]);
    }

    // Yeni dosyayı yükle
    // Upload new file
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (uploadError) throw new Error("The file could not be uploaded.");

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(fileName);
    avatarUrl = publicUrl;
  }

  //  Veritabanı Güncelleme
  //  Database Update
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: formData.get("phone"),
      city: formData.get("city"),
      district: formData.get("district"),
      school: formData.get("school"),
      grade: grade ? parseInt(grade) : null,
      address: formData.get("address"),
      avatar_url: avatarUrl,
    })
    .eq("id", user.id); // Sadece kendi ID'sini güncelleyebilir // Only its own ID can be updated

  if (updateError) throw new Error("Profile could not be updated.");

  revalidatePath("/user");
  return { success: true };
}
