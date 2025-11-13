import { z } from "zod";

// Auth schemas
export const magicLinkRequestSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address")
    .refine((val) => val !== "null" && val !== "undefined", {
      message: "Please enter a valid email address",
    })
    .transform((val) => val.toLowerCase()),
  searchParams: z.any().optional(),
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
