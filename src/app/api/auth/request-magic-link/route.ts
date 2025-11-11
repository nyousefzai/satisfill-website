import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
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
      try {
        const { email } = await req.json();

        const token = await AuthService.generateMagicLink(email);

        const magicLink = `${
          req.nextUrl.origin
        }/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;
        console.log(`Magic link for ${email}: ${magicLink}`);

        await EmailService.sendEmail({
          to: email,
          subject: "Your Magic Login Link",
          text: `Click the link to log in: ${magicLink}`,
          html: renderTemplate(magicLink),
        });

        return TypedNextResponse.json({
          message:
            "Magic link sent to your email. Check your email and follow the link.",
        });
      } catch (err) {
        console.error("Magic link request error:", err);
        return TypedNextResponse.json(
          { error: "Failed to send magic link" },
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
