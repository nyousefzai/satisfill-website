import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
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

        return TypedNextResponse.json({
          message:
            "Magic link sent to your email. Check the terminal for the link (development mode).",
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
