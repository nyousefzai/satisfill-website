import { db } from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";

export class AuthService {
  // Generate a magic link token
  static async generateMagicLink(email: string) {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store the token in VerificationToken table
    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    return token;
  }

  // Verify magic link token
  static async verifyMagicLink(token: string, email: string) {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    if (!verificationToken) {
      return null;
    }

    if (verificationToken.expires < new Date()) {
      // Clean up expired token
      await db.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token,
          },
        },
      });
      return null;
    }

    // Clean up used token
    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    // Find or create user
    let user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email,
          name: email.split("@")[0], // Default name from email
        },
      });
    }

    return user;
  }

  // Create session for user
  static async createSession(userId: string) {
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const session = await db.session.create({
      data: {
        sessionToken,
        userId,
        expires,
      },
    });

    return session;
  }

  // Get user from session
  static async getUserFromSession(sessionToken: string) {
    const session = await db.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session || session.expires < new Date()) {
      if (session) {
        await db.session.delete({
          where: { sessionToken },
        });
      }
      return null;
    }

    return session.user;
  }

  // Delete session (logout)
  static async deleteSession(sessionToken: string) {
    await db.session.delete({
      where: { sessionToken },
    });
  }

  static async getCurrentUser() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session-token")?.value;

    if (!sessionToken) {
      return null;
    }

    const user = await AuthService.getUserFromSession(sessionToken);
    return user;
  }
}
