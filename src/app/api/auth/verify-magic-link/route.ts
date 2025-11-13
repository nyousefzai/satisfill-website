import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { magicLinkVerifySchema, userSchema } from "../auth.schema";
import { AuthService } from "../auth.service";

export const { POST } = route({
  verifyMagicLink: routeOperation({ method: "POST" })
    .input({ contentType: "application/json", body: magicLinkVerifySchema })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.object({ message: z.string(), user: userSchema }),
      },
      {
        status: 400,
        contentType: "application/json",
        body: z.object({ error: z.string() }),
      },
    ])
    .handler(async (req) => {
      try {
        const { token, email } = await req.json();

        const user = await AuthService.verifyMagicLink(token, email);

        if (!user) {
          return TypedNextResponse.json(
            { error: "Invalid or expired token" },
            { status: 400 }
          );
        }

        const session = await AuthService.createSession(user.id);

        // Set cookie using dynamic import to avoid static resolution problems
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        cookieStore.set("session-token", session.sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        return TypedNextResponse.json({
          message: "Successfully logged in",
          user,
        });
      } catch (err) {
        console.error("Magic link verify error:", err);
        return TypedNextResponse.json(
          { error: "Failed to verify token" },
          { status: 400 }
        );
      }
    }),
});
