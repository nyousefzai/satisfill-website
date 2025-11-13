"use client";

import {
  useCancelSubscription,
  useCreateSubscription,
  useGetCurrentSubscription,
  useGetCurrentUser,
  useListPlans,
  useUpdateSubscription,
} from "@/api-query";
import { useState } from "react";
import SubscriptionCard from "../common/subscription-card";

import { cn } from "@/lib/utils";
import LoginModal from "../auth/login-modal";

export default function SubscriptionManagement({
  onlyShow4MonthPlan,
}: {
  onlyShow4MonthPlan?: boolean;
}) {
  const { data: user } = useGetCurrentUser({});
  const { data: plans, isLoading } = useListPlans({});
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);

  const { data: currentSub, refetch } = useGetCurrentSubscription({});

  const { mutateAsync: createSubscription, isPending: creating } =
    useCreateSubscription();
  const { mutateAsync: updateSubscription, isPending: updating } =
    useUpdateSubscription();
  const { mutateAsync: cancelSubscription, isPending: cancelling } =
    useCancelSubscription();

  const currentPriceId = currentSub?.subscription?.items?.data?.[0]?.price?.id;
  const currentSubId = currentSub?.subscription?.id;

  return (
    <>
      <div
        className={cn(
          "grid gap-8 justify-center",
          onlyShow4MonthPlan
            ? "grid-cols-1"
            : "md:grid-cols-3 w-full max-w-4xl mx-auto"
        )}
      >
        {isLoading && <p>Loading plans...</p>}

        {plans?.map((plan) => {
          const cents = plan.unit_amount ?? 0;
          const price = cents / 100;
          const rec = plan.recurring;
          const intervalCount =
            rec && rec.interval_count ? rec.interval_count! : 1;

          const monthly =
            rec?.interval === "year"
              ? cents / 12 / 100
              : rec?.interval === "month" && intervalCount > 1
              ? cents / intervalCount / 100
              : null;

          const isCurrent = currentPriceId === plan.id;

          if (onlyShow4MonthPlan && intervalCount !== 4) {
            return null;
          }

          return (
            <SubscriptionCard
              key={plan.nickname}
              title={plan.nickname ?? "Unnamed Plan"}
              description={
                <>
                  <p>{price} USD</p>
                  <br />
                  <p>
                    {monthly ? `$${monthly}/month x ${intervalCount}` : null}
                  </p>
                  {isCurrent ? (
                    <p className="mt-2 font-bold">Current Plan</p>
                  ) : null}
                </>
              }
              highlight={isCurrent}
              joinText={
                isCurrent
                  ? "Cancel"
                  : selectedPriceId === plan.id
                  ? creating || updating || cancelling
                    ? "Processing..."
                    : "Confirm"
                  : "Join Now"
              }
              onJoinNow={async () => {
                setSelectedPriceId(plan.id);

                if (user?.user?.id) {
                  if (isCurrent) {
                    if (currentSubId) {
                      await cancelSubscription({
                        body: {
                          subscriptionId: currentSubId,
                        },
                      });
                      refetch();
                    }
                  } else if (selectedPriceId === plan.id) {
                    if (currentPriceId && currentSubId) {
                      const result = await updateSubscription({
                        body: {
                          priceId: plan.id,
                          subscriptionId: currentSubId!,
                        },
                      });

                      if (result?.checkoutUrl) {
                        window.location.href = result.checkoutUrl;
                      } else {
                        refetch();
                      }
                    } else {
                      const result = await createSubscription({
                        body: {
                          priceId: plan.id,
                        },
                      });

                      if (result?.checkoutUrl) {
                        window.location.href = result.checkoutUrl;
                      } else {
                        refetch();
                      }
                    }
                  }
                } else {
                  setAuthOpen(true);
                }
              }}
            />
          );
        })}
      </div>

      <LoginModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        searchParams={{
          subscriptionPriceId: selectedPriceId ?? "",
        }}
      />
    </>
  );
}
