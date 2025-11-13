"use client";

import { useCreateSubscription, useVerifyMagicLink } from "@/api-query";
import { Button } from "@/components/ui/button";
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

  const { mutateAsync: createSubscription, isPending: creating } =
    useCreateSubscription();

  const subscriptionPriceId =
    searchParams.get("subscriptionPriceId") || undefined;

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
        setTimeout(async () => {
          if (subscriptionPriceId) {
            const result = await createSubscription({
              body: {
                priceId: subscriptionPriceId,
              },
            });

            if (result?.checkoutUrl) {
              window.location.href = result.checkoutUrl;
            } else {
              router.push("/#plans-pricing");
            }
          } else {
            router.push("/#plans-pricing");
          }
        }, 1000);
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          )}

          {status === "success" && (
            <div>
              <div className="text-amber-500 text-6xl mb-3">✓</div>
              <p className="text-2xl">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div>
              <div className="text-red-600 text-6xl mb-2">✗</div>
              <p className="text-2xl mb-6">{message}</p>
              <Button onClick={() => router.push("/")}>Go Home</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
