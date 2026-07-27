import { z } from 'zod';

export const teamSchema = z.object({
  teamName: z.string()
    .min(3, "Team name must be at least 3 characters")
    .max(50, "Team name cannot exceed 50 characters")
    .regex(/^[a-zA-Z0-9\s-_]+$/, "Team name can only contain letters, numbers, spaces, hyphens, and underscores"),
  problemStatementTitle: z.string()
    .min(10, "Problem statement title must be at least 10 characters")
    .max(150, "Title is too long. Please keep it concise"),
    
  agreeToRules: z.boolean()
    .refine(val => val === true, "You must agree to the SIH rules to proceed")
});
