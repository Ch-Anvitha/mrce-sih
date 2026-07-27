import { z } from "zod";

export const requiredString = (field) =>
  z
    .string({
      required_error: `${field} is required`,
    })
    .trim()
    .min(1, `${field} is required`);

export const email = z.string().trim().email("Invalid email address");

export const phone = z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number");

export const rollNumber = z.string().trim().min(3).max(20);

export const year = z.number().int().min(1).max(4);

export const section = z.string().trim().min(1).max(2);
