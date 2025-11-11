import { db } from "@/lib/db";
import { User } from "@/prisma/client";
import Stripe from "stripe";

export class SubscriptionService {
  // static stripe:any; // Workaround to run openapi:gen
  static stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

  // Ensure the user has a Stripe customer; if not, create one and persist
  static async ensureCustomer(user: User) {
    if (user.stripeCustomerId) return user.stripeCustomerId;

    const customer = await this.stripe.customers.create({
      email: user.email ?? undefined,
      name: user.name ?? undefined,
    });

    await db.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });

    return customer.id;
  }

  // List public plans/prices
  static async listPlans() {
    const prices = await this.stripe.prices.list({
      active: true,
      expand: ["data.product"],
      limit: 100,
      type: "recurring",
    });

    return prices.data
      .filter(
        (p) =>
          p.product &&
          (p.product as Stripe.Product).metadata.satisfill === "true"
      )
      .map((p) => ({
        id: p.id,
        nickname: (p.nickname as string) || (p.product as any)?.name || null,
        unit_amount: p.unit_amount ?? null,
        currency: p.currency,
        recurring: p.recurring ?? null,
      }))
      .sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0));
  }

  // Get current subscription(s) for a user (returns the most relevant active one if any)
  static async getCurrentSubscription(user: any) {
    if (!user?.stripeCustomerId) return null;

    const subs = await this.stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      limit: 10,
    });

    // Prefer active, otherwise latest
    const active = subs.data.find((s) => s.status === "active");
    const sub = active ?? subs.data[0] ?? null;

    return sub;
  }

  // Create a subscription for the user - returns checkout URL
  static async createSubscription(user: any, priceId: string) {
    const customerId = await SubscriptionService.ensureCustomer(user);

    // Create a Checkout Session instead of direct subscription
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/#plans-pricing?success=true`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/#plans-pricing?canceled=true`,
      metadata: {
        userId: user.id,
      },
    });

    return {
      checkoutUrl: session.url,
      sessionId: session.id,
    };
  }

  // Update subscription to a new price - returns checkout URL if payment needed
  static async updateSubscription(
    user: any,
    subscriptionId: string,
    priceId: string
  ) {
    // Get subscription and first item id
    const sub = await this.stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price", "items.data"],
    });

    if (!sub || (sub.customer as string) !== user.stripeCustomerId) {
      throw new Error("Subscription not found for this user");
    }

    const customerId = await SubscriptionService.ensureCustomer(user);

    // Create a Checkout Session for the update
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/subscription?success=true&updated=true`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/subscription?canceled=true`,
      metadata: {
        userId: user.id,
        previousSubscriptionId: subscriptionId,
      },
      subscription_data: {
        metadata: {
          replacesSubscription: subscriptionId,
        },
      },
    });

    // Cancel the old subscription at period end
    await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    return {
      checkoutUrl: session.url,
      sessionId: session.id,
      previousSubscriptionId: subscriptionId,
    };
  }

  // Cancel subscription (either immediately or at period end)
  static async cancelSubscription(
    user: any,
    subscriptionId: string,
    atPeriodEnd = true
  ) {
    const sub = await this.stripe.subscriptions.retrieve(subscriptionId, {});
    if (!sub || (sub.customer as string) !== user.stripeCustomerId) {
      throw new Error("Subscription not found for this user");
    }

    if (atPeriodEnd) {
      const updated = await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
      return updated;
    }

    // Use `any` to avoid a typing mismatch in installed stripe types for the delete helper
    const deleted = await (this.stripe.subscriptions as any).del(
      subscriptionId
    );
    return deleted;
  }
}

export default SubscriptionService;
