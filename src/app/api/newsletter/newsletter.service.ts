import { db } from "@/lib/db";

export class NewsletterService {
  static async subscribeNewsletter(email: string) {
    await db.newsletterSubscriber.create({
      data: {
        email,
      },
    });
  }
}
