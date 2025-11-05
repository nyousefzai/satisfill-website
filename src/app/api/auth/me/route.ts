import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { cookies } from "next/headers";
import { z } from "zod";
import { userSchema } from "../auth.schema";
import { AuthService } from "../auth.service";

export const { GET } = route({
  // Get current user
  getCurrentUser: routeOperation({
    method: "GET",
  })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.object({ user: userSchema.nullable() }),
      },
    ])
    .handler(async () => {
      const cookieStore = await cookies();
      const sessionToken = cookieStore.get("session-token")?.value;

      if (!sessionToken) {
        return TypedNextResponse.json({ user: null });
      }

      const user = await AuthService.getUserFromSession(sessionToken);
      return TypedNextResponse.json({ user });
    }),
});
