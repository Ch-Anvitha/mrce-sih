import { z } from 'zod';

export const leaderSchema = z.object({
  leaderName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters")
    .regex(/^[a-zA-Z\s.-]+$/, "Name can only contain letters, spaces, dots, and hyphens"),
    
  rollNumber: z.string()
    .min(5, "Roll number is too short")
    .max(15, "Roll number is too long")
    .regex(/^[a-zA-Z0-9]+$/, "Roll number should contain only letters and numbers"),
    
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
    
  phoneNumber: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
    
  gender: z.string()
    .min(1, "Please select gender"),
    
  branch: z.string()
    .min(1, "Please select your branch"),
    
  year: z.string()
    .min(1, "Please select your current year of study"),
    
  section: z.string()
    .min(1, "Section is required")
    .max(2, "Section cannot exceed 2 characters")
});
