"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Loader2,
  User,
  Phone,
  MapPin,
  School,
  GraduationCap,
  Home,
} from "lucide-react";
import Image from "next/image";
import { updateProfileAction } from "@/app/(Actions)/profile/profileAction";

export default function ProfileEditForm({ profile, user }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [city, setCity] = useState(profile?.city || "");
  const [district, setDistrict] = useState(profile?.district || "");
  const [school, setSchool] = useState(profile?.school || "");
  const [grade, setGrade] = useState(profile?.grade || "");
  const [address, setAddress] = useState(profile?.address || "");

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(profile?.avatar_url || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // FormData oluştururken e.currentTarget kullanıyoruz
    // e.currentTarget options when creating FormData
    const formData = new FormData(e.currentTarget);

    // Dosya state'te olduğu için onu manuel ekliyoruz
    // We are also sending the URL of the old image for deletion purposes.
    if (file) {
      formData.append("avatar", file);
    }
    // Eski resmin URL'ini de silme işlemi için gönderiyoruz
    // We are also sending the URL of the old image for deletion purposes.
    formData.append("old_avatar_url", profile?.avatar_url || "");

    try {
      const result = await updateProfileAction(formData);
      if (result.success) {
        router.push("/user");
        router.refresh();
      }
    } catch (error: any) {
      alert("Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PROFİLE IMAGE */}
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative w-24 h-24 group">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-blue-100 bg-gray-50">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-full h-full p-4 text-gray-300" />
            )}
          </div>
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
            <Camera size={20} />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NAME SURNAME */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <User size={14} /> NAME SURNAME
          </label>
          <input
            name="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* PHONE */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <Phone size={14} /> PHONE
          </label>
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* CITY */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <MapPin size={14} /> CITY
          </label>
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* DISCRICT */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <MapPin size={14} /> DISCRICT
          </label>
          <input
            name="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* SCHOOL */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <School size={14} /> SCHOOL
          </label>
          <input
            name="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* GRADE */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <GraduationCap size={14} /> GRADE
          </label>
          <select
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Selecet</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                {g}. Grade
              </option>
            ))}
            <option value="0">Graduated</option>
          </select>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
          <Home size={14} /> ADDRESS
        </label>
        <textarea
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded-md h-20"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 text-white p-3 cursor-pointer rounded-md font-bold flex justify-center items-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Update"}
      </button>
    </form>
  );
}
