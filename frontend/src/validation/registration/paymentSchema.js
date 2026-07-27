import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const paymentSchema = z.object({
  transactionId: z.string()
    .min(8, "Transaction ID is too short")
    .max(30, "Transaction ID is too long")
    .regex(/^[a-zA-Z0-9]+$/, "Transaction ID must be alphanumeric"),
    
  paymentScreenshot: z.any()
    .refine((file) => file !== null && file !== undefined, "Payment screenshot is required")
    .refine(
      (file) => !file || file.isExisting || file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file) => !file || file.isExisting || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    )
});
