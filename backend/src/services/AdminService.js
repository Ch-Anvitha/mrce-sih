import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AdminRepository } from "../repositories/index.js";

import AppError from "../utils/AppError.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

class AdminService {

    /**
     * -------------------------------------------------------
     * Generate JWT
     * -------------------------------------------------------
     */
    generateToken(admin) {

        return jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

    }

    /**
     * -------------------------------------------------------
     * Login
     * -------------------------------------------------------
     */
    async login(loginData) {

        const { email, password } = loginData;

        const admin =
            await AdminRepository.findActiveByEmail(email);

        if (!admin) {

            throw new AppError(
                "Invalid email or password.",
                HTTP_STATUS.UNAUTHORIZED
            );

        }

        const isPasswordValid =
            await bcrypt.compare(
                password,
                admin.password
            );

        if (!isPasswordValid) {

            throw new AppError(
                "Invalid email or password.",
                HTTP_STATUS.UNAUTHORIZED
            );

        }

        await AdminRepository.updateLastLogin(
            admin._id
        );

        const token =
            this.generateToken(admin);

        return {

            admin: {

                id: admin._id,

                name: admin.name,

                email: admin.email,

                role: admin.role,

            },

            token,

        };

    }

    /**
     * -------------------------------------------------------
     * Get Current Admin
     * -------------------------------------------------------
     */
    async getCurrentAdmin(adminId) {

        const admin =
            await AdminRepository.findActiveById(
                adminId
            );

        if (!admin) {

            throw new AppError(
                "Admin not found.",
                HTTP_STATUS.NOT_FOUND
            );

        }

        return admin;

    }

    /**
     * -------------------------------------------------------
     * Change Password
     * -------------------------------------------------------
     */
    async changePassword(adminId, passwords) {

        const {

            currentPassword,

            newPassword,

        } = passwords;

        const admin =
            await AdminRepository.findActiveById(
                adminId
            );

        if (!admin) {

            throw new AppError(
                "Admin not found.",
                HTTP_STATUS.NOT_FOUND
            );

        }

        const adminWithPassword =
            await AdminRepository.findActiveByEmail(
                admin.email
            );

        const isMatch =
            await bcrypt.compare(

                currentPassword,

                adminWithPassword.password

            );

        if (!isMatch) {

            throw new AppError(

                "Current password is incorrect.",

                HTTP_STATUS.BAD_REQUEST

            );

        }

        const hashedPassword =
            await bcrypt.hash(

                newPassword,

                12

            );

        await AdminRepository.updatePassword(

            adminId,

            hashedPassword

        );

        return {

            message:
                "Password changed successfully.",

        };

    }

    /**
     * -------------------------------------------------------
     * Logout
     * -------------------------------------------------------
     */
    async logout() {

        return {

            message:
                "Logged out successfully.",

        };

    }

}

export default new AdminService();