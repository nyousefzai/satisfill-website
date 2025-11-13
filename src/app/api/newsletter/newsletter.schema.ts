import z from "zod";

export const newsLetterSchema = z.object({
  email: z.string().email("Valid email is required"),
});

export type NewsLetterFormData = z.infer<typeof newsLetterSchema>;
