import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { newsLetterSchema } from "./newsletter.schema";
import { NewsletterService } from "./newsletter.service";

export const { POST } = route({
  subscribeNewsletter: routeOperation({ method: "POST" })
    .input({
      contentType: "application/json",
      body: newsLetterSchema,
    })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.object({
          message: z.string(),
        }),
      },
    ])
    .handler(async (req) => {
      const data = await req.json();

      await NewsletterService.subscribeNewsletter(data.email);

      return TypedNextResponse.json({ message: "Successful" }, { status: 200 });
    }),
});
