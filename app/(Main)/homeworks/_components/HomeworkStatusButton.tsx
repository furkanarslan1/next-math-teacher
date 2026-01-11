"use client";

import { useOptimistic, useTransition } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { toggleHomeworkStatus } from "@/app/(Actions)/homework/homeworkAction";
import { toast } from "sonner";

export default function HomeworkStatusButton({
  homeworkId,
  initialStatus,
}: {
  homeworkId: string;
  initialStatus: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    initialStatus,
    (state, newStatus: boolean) => newStatus
  );

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticStatus(!optimisticStatus);

      try {
        // Sunucu işlemini bekle
        //Wait for the server process
        await toggleHomeworkStatus(homeworkId, !initialStatus);
      } catch (err) {
        // Hata olursa useOptimistic otomatik olarak initialStatus'a döner
        // If an error occurs, useOptimistic automatically reverts to initialStatus.
        toast.error("Unsuccessful!");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`p-2 rounded-full transition-all active:scale-90 ${
        optimisticStatus
          ? "text-green-600"
          : "text-slate-300 hover:text-slate-400"
      }`}
    >
      {optimisticStatus ? (
        <CheckCircle2 size={32} className={isPending ? "opacity-70" : ""} />
      ) : (
        <Circle size={32} className={isPending ? "opacity-70" : ""} />
      )}
    </button>
  );
}
