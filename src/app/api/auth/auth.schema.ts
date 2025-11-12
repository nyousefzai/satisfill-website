import { z } from "zod";

// Auth schemas
export const magicLinkRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),
});

export const magicLinkVerifySchema = z.object({
  token: z.string().min(1, "Token is required"),
  email: z.string().email("Valid email is required"),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  image: z.string().nullable(),
  address: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Types
export type MagicLinkRequest = z.infer<typeof magicLinkRequestSchema>;
export type MagicLinkVerify = z.infer<typeof magicLinkVerifySchema>;
export type User = z.infer<typeof userSchema>;
