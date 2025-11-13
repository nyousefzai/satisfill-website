import { logger } from "@/lib/logger";
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
      {
        status: 500,
        contentType: "application/json",
        body: z.object({
          error: z.string(),
        }),
      },
    ])
    .handler(async (req) => {
      const startTime = Date.now();

      try {
        const data = await req.json();

        logger.info("Contact form submission started", {
          name: data.name,
          email: data.email,
          subject: data.subject,
          hasMessage: !!data.message,
          receiver: process.env.EMAIL_RECEIVER,
        });

        await EmailService.sendEmail({
          to: process.env.EMAIL_RECEIVER || "",
          subject: `Contact Form Submission: ${data.subject}`,
          text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage:\n${data.message}`,
        });

        const duration = Date.now() - startTime;
        logger.info("Contact form email sent successfully", {
          email: data.email,
          duration: `${duration}ms`,
        });

        return TypedNextResponse.json(
          { message: "Contact form submitted successfully" },
          { status: 200 }
        );
      } catch (err: any) {
        const duration = Date.now() - startTime;
        logger.error("Contact form submission failed", err, {
          duration: `${duration}ms`,
          errorCode: err?.code,
        });

        return TypedNextResponse.json(
          { error: err?.message || "Failed to send contact form" },
          { status: 500 }
        );
      }
    }),
});
