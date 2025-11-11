"use client";

import { useVerifyMagicLink } from "@/api-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyMagicLink() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const postAuth = useVerifyMagicLink({});

  useEffect(() => {
    const verifyToken = async () => {
      if (!searchParams) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        await postAuth.mutateAsync({ body: { token, email } });

        // If the mutation didn't throw, treat it as success. Response shape
        // varies, so show a generic message when message not present.
        setStatus("success");
        setMessage("Successfully logged in! Redirecting...");
        setTimeout(() => {
          router.push("/#plans-pricing");
        }, 2000);
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Verifying Magic Link
          </h2>

          {status === "loading" && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {status === "success" && (
            <div className="text-green-600">
              <div className="text-4xl mb-2">✓</div>
              <p>{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-red-600">
              <div className="text-4xl mb-2">✗</div>
              <p>{message}</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Go Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
