"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { tr } from "date-fns/locale";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase/client";
import { Plus, Clock, User, Trash2, Loader2 } from "lucide-react";

export default function AdminCalendarPage() {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [lessons, setLessons] = useState<any[]>([]); // Seçili günün dersleri // Lessons for the selected day
  const [allLessons, setAllLessons] = useState<any[]>([]); // Tüm takvim renkleri için // For all calendar colors
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchAllLessons(); // Takvimdeki ders sayılarını boyamak için // To color in the lesson numbers on the calendar
  }, []);

  useEffect(() => {
    fetchDayLessons();
  }, [selectedDay]);

  const fetchStudents = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name")
      .eq("role", "user");
    setStudents(data || []);
  };

  const fetchAllLessons = async () => {
    const { data } = await supabase
      .from("private_lessons")
      .select("lesson_date");
    setAllLessons(data || []);
  };

  const fetchDayLessons = async () => {
    setLoading(true);
    const dateStr = format(selectedDay, "yyyy-MM-dd");
    const { data } = await supabase
      .from("private_lessons")
      .select("*, profiles:student_id(full_name)")
      .eq("lesson_date", dateStr)
      .order("start_time");
    setLessons(data || []);
    setLoading(false);
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("private_lessons").insert({
      student_id: selectedStudent,
      teacher_id: user?.id,
      lesson_date: format(selectedDay, "yyyy-MM-dd"),
      start_time: startTime,
      end_time: endTime,
    });

    if (error) alert(error.message);
    else {
      fetchDayLessons();
      fetchAllLessons();
    }
  };

  const handleDeleteLesson = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("private_lessons")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete Error: " + error.message);
    } else {
      // Listeyi ve takvim işaretlerini güncelle
      // Update the list and calendar markers
      fetchDayLessons();
      fetchAllLessons();
    }
  };

  // Takvimde ders olan günleri işaretleme
  // Marking days with classes on the calendar (Modifiers)
  const modifiers = {
    hasLesson: (date: Date) =>
      allLessons.some((l) => l.lesson_date === format(date, "yyyy-MM-dd")),
  };

  const modifiersStyles = {
    hasLesson: {
      fontWeight: "bold",
      border: "2px solid #3b82f6",
      borderRadius: "50%",
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: CALENDAR */}
      <div className="bg-white p-6 rounded-3xl border shadow-sm h-fit">
        <h2 className="text-xl font-bold mb-4 text-slate-800">
          Course Calendar
        </h2>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={(day) => day && setSelectedDay(day)}
          locale={tr}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
        />
        <div className="mt-4 p-4 bg-blue-50 rounded-2xl text-xs text-blue-700 font-medium">
          The days framed in blue indicate the days you have classes.
        </div>
      </div>

      {/* RIGHT:DAILY DETAILS VE FORM */}
      <div className="lg:col-span-2 space-y-6">
        {/* DERS EKLEME FORMU */}
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus size={20} className="text-blue-600" />
            {format(selectedDay, "d MMMM yyyy", { locale: tr })} Add a Lesson to
            date
          </h3>
          <form
            onSubmit={handleAddLesson}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <select
              required
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="p-2 border rounded-xl bg-slate-50 outline-none"
            >
              <option value="">Select Student...</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.full_name}
                </option>
              ))}
            </select>
            <input
              type="time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-2 border rounded-xl bg-slate-50"
            />
            <input
              type="time"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-2 border rounded-xl bg-slate-50"
            />
            <button className="bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800">
              Add
            </button>
          </form>
        </div>

        {/* SELECTED DAY'S LESSONS */}
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-bold mb-4">Program of the Day</h3>
          {loading ? (
            <Loader2 className="animate-spin text-blue-500" />
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white p-2 rounded-lg text-sm font-bold">
                      {lesson.start_time.slice(0, 5)} -{" "}
                      {lesson.end_time.slice(0, 5)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {lesson.profiles.full_name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Private Tutoring Session
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {lessons.length === 0 && (
                <p className="text-slate-400 text-sm">
                  No classes have been added for today yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
