import { z } from "zod";

export const userRegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must not exceed 50 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must not exceed 128 characters"),
  })
  .strict();

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must not exceed 128 characters"),
  })
  .strict();

export type UserLoginInput = z.infer<typeof userLoginSchema>;

export const userUpdateSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must not exceed 50 characters")
      .optional(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),

    bio: z
      .string()
      .trim()
      .min(20, "Bio must be at least 20 characters")
      .max(200, "Bio must not exceed 200 characters")
      .optional(),

    phone: z
      .string()
      .trim()
      .regex(
        /^(?:\+8801|01)[3-9]\d{8}$/,
        "Please provide a valid Bangladesh phone number",
      )
      .optional(),

    avatar: z.string().trim().url("Avatar must be a valid URL").optional(),
  })
  .strict();

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
