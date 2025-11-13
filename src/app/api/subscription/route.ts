import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { AuthService } from "../auth/auth.service";
import { SubscriptionSchema } from "./subscription.schema";
import SubscriptionService from "./subscription.service";

export const { GET, POST, PATCH, PUT, DELETE } = route({
  getCurrentSubscription: routeOperation({ method: "GET" })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.object({ subscription: SubscriptionSchema }),
      },
      {
        status: 401,
        contentType: "application/json",
        body: z.string(),
      },
      {
        status: 500,
        contentType: "application/json",
        body: z.object({ error: z.string() }),
      },
    ])
    .handler(async () => {
      try {
        const user = await AuthService.getCurrentUser();
        if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

        const sub = (await SubscriptionService.getCurrentSubscription(
          user
        )) as any;
        return TypedNextResponse.json(
          { subscription: sub ?? null },
          { status: 200 }
        );
      } catch (err: any) {
        console.error("[Subscription] Get current subscription error:", err);
        return TypedNextResponse.json(
          { error: err?.message || "Failed to get subscription" },
          { status: 500 }
        );
      }
    }),

  createSubscription: routeOperation({ method: "POST" })
    .input({
      contentType: "application/json",
      body: z.object({ priceId: z.string() }),
    })
    .outputs([
      {
        status: 201,
        contentType: "application/json",
        body: z.object({
          checkoutUrl: z.string().nullable().optional(),
          sessionId: z.string().nullable().optional(),
          subscription: SubscriptionSchema.optional(),
          clientSecret: z.string().nullable().optional(),
        }),
      },
      { status: 401, contentType: "application/json", body: z.string() },
      {
        status: 500,
        contentType: "application/json",
        body: z.object({ error: z.string() }),
      },
    ])
    .handler(async (req) => {
      try {
        const { priceId } = await req.json();
        const user = await AuthService.getCurrentUser();
        if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

        console.log(`[Subscription] Creating subscription for user ${user.id} with price ${priceId}`);
        const result = await SubscriptionService.createSubscription(
          user,
          priceId
        );

        console.log(`[Subscription] Created successfully:`, result);
        return TypedNextResponse.json(result as any, { status: 201 });
      } catch (err: any) {
        console.error("[Subscription] Create subscription error:", {
          message: err?.message,
          stack: err?.stack,
          error: err,
        });
        return TypedNextResponse.json(
          { error: err?.message || "Failed to create subscription" },
          { status: 500 }
        );
      }
    }),

  updateSubscription: routeOperation({ method: "PATCH" })
    .input({
      contentType: "application/json",
      body: z.object({ subscriptionId: z.string(), priceId: z.string() }),
    })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.object({
          checkoutUrl: z.string().nullable().optional(),
          sessionId: z.string().nullable().optional(),
          previousSubscriptionId: z.string().nullable().optional(),
          subscription: SubscriptionSchema.optional(),
        }),
      },
      { status: 401, contentType: "application/json", body: z.string() },
      {
        status: 500,
        contentType: "application/json",
        body: z.object({ error: z.string() }),
      },
    ])
    .handler(async (req) => {
      try {
        const { subscriptionId, priceId } = await req.json();
        const user = await AuthService.getCurrentUser();
        if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

        console.log(`[Subscription] Updating subscription ${subscriptionId} to price ${priceId}`);
        const result = await SubscriptionService.updateSubscription(
          user,
          subscriptionId,
          priceId
        );

        console.log(`[Subscription] Updated successfully:`, result);
        return TypedNextResponse.json(result as any, { status: 200 });
      } catch (err: any) {
        console.error("[Subscription] Update subscription error:", err);
        return TypedNextResponse.json(
          { error: err?.message || "Failed to update subscription" },
          { status: 500 }
        );
      }
    }),

  replaceSubscription: routeOperation({ method: "PUT" })
    .input({
      contentType: "application/json",
      body: z.object({ subscriptionId: z.string(), priceId: z.string() }),
    })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: SubscriptionSchema,
      },
    ])
    // @ts-expect-error other
    .handler(async (req) => {
      const { subscriptionId, priceId } = await req.json();
      const user = await AuthService.getCurrentUser();
      if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

      const updated = await SubscriptionService.updateSubscription(
        user,
        subscriptionId,
        priceId
      );
      return TypedNextResponse.json(updated, { status: 200 });
    }),

  cancelSubscription: routeOperation({ method: "DELETE" })
    .input({
      contentType: "application/json",
      body: z.object({
        subscriptionId: z.string(),
        atPeriodEnd: z.boolean().optional(),
      }),
    })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: SubscriptionSchema,
      },
      { status: 401, contentType: "application/json", body: z.string() },
      {
        status: 500,
        contentType: "application/json",
        body: z.object({ error: z.string() }),
      },
    ])
    .handler(async (req) => {
      try {
        const { subscriptionId, atPeriodEnd } = await req.json();
        const user = await AuthService.getCurrentUser();
        if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

        console.log(`[Subscription] Cancelling subscription ${subscriptionId}, atPeriodEnd: ${atPeriodEnd ?? true}`);
        const res = await SubscriptionService.cancelSubscription(
          user,
          subscriptionId,
          atPeriodEnd ?? true
        );

        console.log(`[Subscription] Cancelled successfully`);
        return TypedNextResponse.json(res, { status: 200 });
      } catch (err: any) {
        console.error("[Subscription] Cancel subscription error:", err);
        return TypedNextResponse.json(
          { error: err?.message || "Failed to cancel subscription" },
          { status: 500 }
        );
      }
    }),
});
