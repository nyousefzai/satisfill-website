import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { PriceSchema } from "../subscription.schema";
import SubscriptionService from "../subscription.service";

export const { GET } = route({
  listPlans: routeOperation({
    method: "GET",
  })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.array(PriceSchema),
      },
      {
        status: 500,
        contentType: "application/json",
        body: z.object({ error: z.string() }),
      },
    ])
    .handler(async () => {
      try {
        console.log("[Subscription] Fetching plans from Stripe");
        const plans = await SubscriptionService.listPlans();
        console.log(`[Subscription] Found ${plans.length} plans`);
        return TypedNextResponse.json(plans, { status: 200 });
      } catch (err: any) {
        console.error("[Subscription] List plans error:", {
          message: err?.message,
          stack: err?.stack,
          error: err,
        });
        return TypedNextResponse.json(
          { error: err?.message || "Failed to fetch plans" },
          { status: 500 }
        );
      }
    }),
});
