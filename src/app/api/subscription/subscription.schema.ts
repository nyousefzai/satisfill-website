import { z } from "zod";

// Minimal PaymentIntent shape used by our flows
export const PaymentIntentSchema = z.object({
  id: z.string(),
  object: z.string().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  status: z.string().optional(),
  client_secret: z.string().nullable().optional(),
});

// Minimal Invoice shape — we only need payment_intent for client_secret
export const InvoiceSchema = z.object({
  id: z.string(),
  object: z.string().optional(),
  amount_due: z.number().optional(),
  currency: z.string().optional(),
  status: z.string().optional(),
  payment_intent: PaymentIntentSchema.nullable().optional(),
});

// Price/Plan shape returned by Stripe for list plans
export const PriceSchema = z.object({
  id: z.string(),
  object: z.string().optional(),
  unit_amount: z.number().nullable().optional(),
  currency: z.string().optional(),
  nickname: z.string().nullable().optional(),
  // Stripe may return the product id (string) or a full Product object (or DeletedProduct),
  // allow either a string or an object with unknown shape.
  product: z.union([z.string(), z.object({}).passthrough()]).optional(),
  recurring: z
    .object({
      interval: z.enum(["day", "week", "month", "year"]).optional(),
      interval_count: z.number().optional(),
    })
    .nullable()
    .optional(),
});

// Subscription shape (minimal, only the fields we use/return)
export const SubscriptionSchema = z.object({
  id: z.string(),
  object: z.string().optional(),
  status: z.string().optional(),
  cancel_at_period_end: z.boolean().optional(),
  current_period_start: z.number().optional(),
  current_period_end: z.number().optional(),
  items: z
    .object({
      object: z.string().optional(),
      data: z
        .array(
          z.object({
            id: z.string().optional(),
            price: PriceSchema.optional(),
            quantity: z.number().optional(),
          })
        )
        .optional(),
    })
    .optional(),
  latest_invoice: InvoiceSchema.nullable().optional(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;
export type Price = z.infer<typeof PriceSchema>;

// Named exports are sufficient; avoid inline default object export to satisfy linter rules.
