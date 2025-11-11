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
    ])
    .handler(async () => {
      const user = await AuthService.getCurrentUser();
      if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

      const sub = (await SubscriptionService.getCurrentSubscription(
        user
      )) as any;
      return TypedNextResponse.json(
        { subscription: sub ?? null },
        { status: 200 }
      );
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
    ])
    .handler(async (req) => {
      const { priceId } = await req.json();
      const user = await AuthService.getCurrentUser();
      if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

      const result = await SubscriptionService.createSubscription(
        user,
        priceId
      );

      return TypedNextResponse.json(result as any, { status: 201 });
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
    ])
    .handler(async (req) => {
      const { subscriptionId, priceId } = await req.json();
      const user = await AuthService.getCurrentUser();
      if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

      const result = await SubscriptionService.updateSubscription(
        user,
        subscriptionId,
        priceId
      );

      return TypedNextResponse.json(result as any, { status: 200 });
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
    ])
    .handler(async (req) => {
      const { subscriptionId, atPeriodEnd } = await req.json();
      const user = await AuthService.getCurrentUser();
      if (!user) return TypedNextResponse.json("Unauthorized", { status: 401 });

      const res = await SubscriptionService.cancelSubscription(
        user,
        subscriptionId,
        atPeriodEnd ?? true
      );
      return TypedNextResponse.json(res, { status: 200 });
    }),
});
