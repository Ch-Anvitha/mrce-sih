import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Login Schema
|--------------------------------------------------------------------------
*/

export const loginSchema = z.object({

    body: z.object({

        email: z
            .string()
            .trim()
            .email("Invalid email address."),

        password: z
            .string()
            .min(
                8,
                "Password must contain at least 8 characters."
            ),

    }),

});

/*
|--------------------------------------------------------------------------
| Change Password Schema
|--------------------------------------------------------------------------
*/

export const changePasswordSchema = z.object({

    body: z.object({

        currentPassword: z
            .string()
            .min(8),

        newPassword: z
            .string()
            .min(
                8,
                "Password must contain at least 8 characters."
            ),

    }),

});