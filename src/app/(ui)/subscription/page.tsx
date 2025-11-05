"use client";

import {
  useCancelSubscription,
  useCreateSubscription,
  useGetCurrentSubscription,
  useListPlans,
  useUpdateSubscription,
} from "@/api-query";
import AuthStatus from "@/components/auth/auth-status";
import SubscriptionCard from "@/components/common/subscription-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Plan = {
  id: string;
  nickname?: string | null;
  unit_amount?: number | null;
  currency?: string;
};

function parsePlans(raw: any): Plan[] {
  if (!raw) return [];
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Plan[];
    } catch {
      return [];
    }
  }
  if (Array.isArray(raw)) return raw as Plan[];
  return [];
}

export default function SubscriptionPage() {
  const [msg, setMsg] = useState<string | null>(null);

  const plansQuery = useListPlans({});
  const subQuery = useGetCurrentSubscription({});

  const createMutation = useCreateSubscription();
  const updateMutation = useUpdateSubscription();
  const cancelMutation = useCancelSubscription();

  const plans = parsePlans(plansQuery.data);
  const subscription = ((): any => {
    const d: any = subQuery.data;
    if (!d) return null;
    if (typeof d === "string") {
      try {
        const parsed = JSON.parse(d);
        return parsed?.subscription ?? null;
      } catch {
        return null;
      }
    }
    return d?.subscription ?? null;
  })();

  const loading = plansQuery.isLoading || subQuery.isLoading;

  async function subscribe(priceId: string) {
    setMsg(null);
    try {
      await createMutation.mutateAsync({ body: { priceId } });
      setMsg("Subscription created");
      // try to refetch
      subQuery.refetch();
      plansQuery.refetch();
    } catch (e: any) {
      setMsg(String(e?.payload?.message ?? e?.payload ?? e?.message ?? e));
    }
  }

  async function updateSub(subscriptionId: string, priceId: string) {
    setMsg(null);
    try {
      await updateMutation.mutateAsync({
        body: { subscriptionId, priceId },
      });
      setMsg("Subscription updated");
      subQuery.refetch();
      plansQuery.refetch();
    } catch (e: any) {
      setMsg(String(e?.payload?.message ?? e?.payload ?? e?.message ?? e));
    }
  }

  async function cancelSub(subscriptionId: string) {
    setMsg(null);
    try {
      await cancelMutation.mutateAsync({
        body: { subscriptionId, atPeriodEnd: true },
      });
      setMsg("Subscription cancelled (at period end)");
      subQuery.refetch();
      plansQuery.refetch();
    } catch (e: any) {
      setMsg(String(e?.payload?.message ?? e?.payload ?? e?.message ?? e));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AuthStatus />

      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>

      {msg && (
        <div className="mb-4 rounded-md border p-3 bg-yellow-50 text-yellow-900">
          {msg}
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-lg font-medium mb-2">Your subscription</h2>
        {loading && !subscription ? (
          <div>Loading...</div>
        ) : subscription ? (
          <div className="space-y-3">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Active plan
                  </div>
                  <div className="text-xl font-semibold">{subscription.id}</div>
                  <div className="text-sm text-muted-foreground">
                    Status: {subscription.status}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Current period end</div>
                  <div className="font-medium">
                    {subscription.current_period_end
                      ? new Date(
                          subscription.current_period_end * 1000
                        ).toLocaleString()
                      : "—"}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => cancelSub(subscription.id)}
                >
                  Cancel at period end
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>No active subscription</div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">Available plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.length === 0 && <div>No plans available</div>}
          {plans.map((p) => (
            <SubscriptionCard
              key={p.id}
              title={p.nickname ?? p.id}
              description={
                <div>
                  <div className="text-2xl font-bold">
                    {p.unit_amount
                      ? `${(p.unit_amount / 100).toFixed(2)} ${p.currency}`
                      : "—"}
                  </div>
                </div>
              }
              onJoinNow={() =>
                subscription
                  ? updateSub(subscription.id, p.id)
                  : subscribe(p.id)
              }
              joinText={subscription ? "Choose" : "Subscribe"}
              highlight={subscription?.items?.data?.[0]?.price?.id === p.id}
            >
              {/* kept for future extension */}
            </SubscriptionCard>
          ))}
        </div>
        <div className="mt-4">
          {subscription && (
            <div className="text-sm text-muted-foreground">
              To change plan, click <span className="font-medium">Choose</span>{" "}
              on another plan.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
