import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { EmailService } from "../../email/email.service";
import { magicLinkRequestSchema } from "../auth.schema";
import { AuthService } from "../auth.service";

export const { POST } = route({
  requestMagicLink: routeOperation({ method: "POST" })
    .input({ contentType: "application/json", body: magicLinkRequestSchema })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.object({ message: z.string() }),
      },
      {
        status: 400,
        contentType: "application/json",
        body: z.object({ error: z.string() }),
      },
    ])
    .handler(async (req) => {
      const startTime = Date.now();
      let email = '';

      try {
        const body = await req.json();
        email = body.email;

        logger.info('Magic link request started', {
          email,
          origin: req.nextUrl.origin,
          userAgent: req.headers.get('user-agent'),
        });

        logger.info('Generating magic link token', { email });
        const token = await AuthService.generateMagicLink(email);

        // Use NEXT_PUBLIC_APP_URL for production, fallback to origin for dev
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
        const magicLink = `${baseUrl}/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

        logger.info('Magic link generated successfully', {
          email,
          tokenLength: token.length,
          linkLength: magicLink.length,
          baseUrl,
        });

        logger.info('Sending magic link email', {
          email,
          from: process.env.EMAIL_FROM,
          smtpUser: process.env.MAILGUN_SMTP_USER,
        });

        await EmailService.sendEmail({
          to: email,
          subject: "Your Magic Login Link",
          text: `Click the link to log in: ${magicLink}`,
          html: renderTemplate(magicLink),
        });

        const duration = Date.now() - startTime;
        logger.info('Magic link sent successfully', {
          email,
          duration: `${duration}ms`,
        });

        return TypedNextResponse.json({
          message:
            "Magic link sent to your email. Check your email and follow the link.",
        });
      } catch (err: any) {
        const duration = Date.now() - startTime;

        logger.error('Magic link request failed', err, {
          email,
          duration: `${duration}ms`,
          errorCode: err?.code,
          errorType: err?.name,
        });

        // Provide more specific error messages
        let errorMessage = "Failed to send magic link";

        if (err?.message?.includes("database") || err?.message?.includes("prisma")) {
          errorMessage = "Database connection error. Please try again later.";
          logger.error('Database error in magic link', err, { email });
        } else if (err?.message?.includes("email") || err?.message?.includes("send") || err?.code === 'EAUTH') {
          errorMessage = "Failed to send email. Please check your email address.";
          logger.error('Email sending error in magic link', err, {
            email,
            smtpUser: process.env.MAILGUN_SMTP_USER,
            emailFrom: process.env.EMAIL_FROM,
          });
        }

        return TypedNextResponse.json(
          { error: errorMessage },
          { status: 400 }
        );
      }
    }),
});

const renderTemplate = (link: string) => `
  <!DOCTYPE html>
<html lang="en" style="margin:0; padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Satisfill Login</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f7fa;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 40px 30px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .logo {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo img {
        width: 120px;
        height: auto;
      }
      h1 {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        color: #555555;
        line-height: 1.5;
      }
      .button-container {
        text-align: center;
        margin: 30px 0;
      }
      .button {
        background-color: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        padding: 14px 28px;
        border-radius: 6px;
        display: inline-block;
      }
      .footer {
        font-size: 12px;
        color: #888888;
        text-align: center;
        margin-top: 30px;
      }
      @media screen and (max-width: 600px) {
        .container {
          padding: 30px 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Login to Satisfill</h1>
      <p>Hello,</p>
      <p>You requested a magic link to log in to your Satisfill account. Click the button below to access your account:</p>
      <div class="button-container">
        <a href="${link}" class="button">Login Now</a>
      </div>
      <p>If you didn’t request this link, you can safely ignore this email. This link will expire in 15 minutes.</p>
      <div class="footer">
        &copy; 2025 Satisfill. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
