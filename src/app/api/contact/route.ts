import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { EmailService } from "../email/email.service";
import { contactSchema } from "./contact.schema";

export const { POST } = route({
  contact: routeOperation({ method: "POST" })
    .input({
      contentType: "application/json",
      body: contactSchema,
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

      await EmailService.sendEmail({
        to: process.env.EMAIL_RECEIVER || "",
        subject: `Contact Form Submission: ${data.subject}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage:\n${data.message}`,
      });

      return TypedNextResponse.json(
        { message: "Contact form submitted successfully" },
        { status: 200 }
      );
    }),
});
