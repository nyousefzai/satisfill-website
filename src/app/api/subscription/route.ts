import { logger } from "@/lib/logger";
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
        logger.info("Get current subscription request started");

        const user = await AuthService.getCurrentUser();
        if (!user) {
          logger.warn("Unauthorized subscription request - no user");
          return TypedNextResponse.json("Unauthorized", { status: 401 });
        }

        logger.info("Fetching subscription for user", {
          userId: user.id,
          email: user.email,
          stripeCustomerId: user.stripeCustomerId,
        });

        const sub = (await SubscriptionService.getCurrentSubscription(
          user
        )) as any;

        logger.info("Subscription fetched successfully", {
          userId: user.id,
          hasSubscription: !!sub,
          subscriptionId: sub?.id,
          status: sub?.status,
        });

        return TypedNextResponse.json(
          { subscription: sub ?? null },
          { status: 200 }
        );
      } catch (err: any) {
        logger.error("Get current subscription failed", err, {
          errorCode: err?.code,
        });
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
      const startTime = Date.now();
      let userId = "";
      let priceId = "";

      try {
        const body = await req.json();
        priceId = body.priceId;

        const user = await AuthService.getCurrentUser();
        if (!user) {
          logger.warn("Unauthorized create subscription request - no user");
          return TypedNextResponse.json("Unauthorized", { status: 401 });
        }

        userId = user.id;

        logger.info("Create subscription request started", {
          userId: user.id,
          email: user.email,
          priceId,
          stripeCustomerId: user.stripeCustomerId,
        });

        const result = await SubscriptionService.createSubscription(
          user,
          priceId
        );

        const duration = Date.now() - startTime;
        logger.info("Subscription created successfully", {
          userId,
          priceId,
          duration: `${duration}ms`,
          checkoutUrl: result.checkoutUrl,
          sessionId: result.sessionId,
        });

        return TypedNextResponse.json(result as any, { status: 201 });
      } catch (err: any) {
        const duration = Date.now() - startTime;
        logger.error("Create subscription failed", err, {
          userId,
          priceId,
          duration: `${duration}ms`,
          errorCode: err?.code,
          stripeError: err?.type,
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
      const startTime = Date.now();
      let userId = "";

      try {
        const { subscriptionId, priceId } = await req.json();
        const user = await AuthService.getCurrentUser();
        if (!user) {
          logger.warn("Unauthorized update subscription request - no user");
          return TypedNextResponse.json("Unauthorized", { status: 401 });
        }

        userId = user.id;

        logger.info("Update subscription request started", {
          userId: user.id,
          subscriptionId,
          priceId,
        });

        const result = await SubscriptionService.updateSubscription(
          user,
          subscriptionId,
          priceId
        );

        const duration = Date.now() - startTime;
        logger.info("Subscription updated successfully", {
          userId,
          subscriptionId,
          priceId,
          duration: `${duration}ms`,
        });

        return TypedNextResponse.json(result as any, { status: 200 });
      } catch (err: any) {
        const duration = Date.now() - startTime;
        logger.error("Update subscription failed", err, {
          userId,
          duration: `${duration}ms`,
        });

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
      const startTime = Date.now();
      let userId = "";

      try {
        const { subscriptionId, atPeriodEnd } = await req.json();
        const user = await AuthService.getCurrentUser();
        if (!user) {
          logger.warn("Unauthorized cancel subscription request - no user");
          return TypedNextResponse.json("Unauthorized", { status: 401 });
        }

        userId = user.id;

        logger.info("Cancel subscription request started", {
          userId: user.id,
          subscriptionId,
          atPeriodEnd: atPeriodEnd ?? true,
        });

        const res = await SubscriptionService.cancelSubscription(
          user,
          subscriptionId,
          atPeriodEnd ?? true
        );

        const duration = Date.now() - startTime;
        logger.info("Subscription cancelled successfully", {
          userId,
          subscriptionId,
          atPeriodEnd: atPeriodEnd ?? true,
          duration: `${duration}ms`,
        });

        return TypedNextResponse.json(res, { status: 200 });
      } catch (err: any) {
        const duration = Date.now() - startTime;
        logger.error("Cancel subscription failed", err, {
          userId,
          duration: `${duration}ms`,
        });

        return TypedNextResponse.json(
          { error: err?.message || "Failed to cancel subscription" },
          { status: 500 }
        );
      }
    }),
});
