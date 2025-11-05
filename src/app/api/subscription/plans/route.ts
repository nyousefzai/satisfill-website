import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import SubscriptionService from "../subscription.service";

export const { GET } = route({
  listPlans: routeOperation({
    method: "GET",
  })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.array(z.any()),
      },
    ])
    .handler(async () => {
      const plans = await SubscriptionService.listPlans();
      return TypedNextResponse.json(plans, { status: 200 });
    }),
});
