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
  priceId,
}: {
  title: string;
  description: ReactNode;
  onJoinNow?: () => void;
  joinText?: string;
  highlight?: boolean;
  loading?: boolean;
  priceId?: string;
}) {
  return (
    <div
      className={cn(
        "border-6 rounded-4xl w-full text-center overflow-hidden group hover:border-sky-700 border-gray-400",
        highlight ? "border-sky-700" : "border-gray-400"
      )}
    >
      <div
        className={cn(
          "px-4 py-6 pb-8 text-3xl font-semibold text-white w-full group-hover:bg-sky-700",
          highlight ? "bg-sky-700" : "bg-gray-400"
        )}
      >
        {title}
      </div>
      <div className="min-h-[250px] bg-white text-black flex flex-col pb-6">
        <div className="p-6 text-center text-2xl md:text-3xl font-bold">
          {description}
        </div>

        <div className="mt-auto px-4 max-w-[250px] mx-auto w-full">
          <button
            onClick={() => onJoinNow?.()}
            className="bg-yellow-200 hover:bg-yellow-400 cursor-pointer border w-full border-black py-2 px-4 rounded-full text-2xl font-bold"
          >
            {loading ? <Spinner /> : ""} {joinText}
          </button>
        </div>
      </div>
    </div>
  );
}
