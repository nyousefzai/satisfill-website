import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { AuthService } from "../auth.service";

export const { POST } = route({
  logout: routeOperation({ method: "POST" })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.object({ message: z.string() }),
      },
    ])
    .handler(async () => {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("session-token")?.value;

        if (sessionToken) {
          await AuthService.deleteSession(sessionToken);
          cookieStore.delete("session-token");
        }

        return TypedNextResponse.json({ message: "Successfully logged out" });
      } catch (err) {
        console.error("Logout error:", err);
        return TypedNextResponse.json({ message: "Successfully logged out" });
      }
    }),
});
