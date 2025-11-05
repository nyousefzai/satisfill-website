import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Spinner } from "../ui/spinner";

export default function SubscriptionCard({
  title,
  description,
  onJoinNow,
  joinText = "Join Now",
  highlight = true,
  loading = false,
}: {
  title: string;
  description: ReactNode;
  onJoinNow?: () => void;
  joinText?: string;
  highlight?: boolean;
  loading?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-4 rounded-2xl w-full overflow-hidden",
        highlight ? "border-sky-700" : "border-gray-400"
      )}
    >
      <div
        className={cn(
          "px-4 py-4 text-3xl font-semibold text-white w-full",
          highlight ? "bg-sky-700" : "bg-gray-400"
        )}
      >
        {title}
      </div>
      <div className="min-h-[250px] bg-white text-black flex flex-col pb-6">
        <div className="p-6 text-center text-3xl font-bold">{description}</div>

        <div className="mt-auto px-4">
          <button
            onClick={() => onJoinNow?.()}
            className="bg-yellow-200 border w-full border-black py-2 px-4 rounded-full text-2xl font-bold"
          >
            {loading ? <Spinner /> : ""} {joinText}
          </button>
        </div>
      </div>
    </div>
  );
}
