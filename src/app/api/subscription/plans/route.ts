import { logger } from "@/lib/logger";
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
      const startTime = Date.now();

      try {
        logger.info("List plans request started", {
          stripeKeyPresent: !!process.env.STRIPE_SECRET_KEY,
        });

        const plans = await SubscriptionService.listPlans();

        const duration = Date.now() - startTime;
        logger.info("Plans fetched successfully", {
          planCount: plans.length,
          duration: `${duration}ms`,
          planIds: plans.map((p) => p.id),
        });

        return TypedNextResponse.json(plans, { status: 200 });
      } catch (err: any) {
        const duration = Date.now() - startTime;
        logger.error("List plans failed", err, {
          duration: `${duration}ms`,
          errorCode: err?.code,
          stripeError: err?.type,
        });

        return TypedNextResponse.json(
          { error: err?.message || "Failed to fetch plans" },
          { status: 500 }
        );
      }
    }),
});
