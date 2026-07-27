import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

import { AdminRepository } from "../repositories/index.js";

import AppError from "../utils/AppError.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

const auth = async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken;

        if (!token) {

            throw new AppError(

                "Authentication required.",

                HTTP_STATUS.UNAUTHORIZED

            );

        }

        const decoded = jwt.verify(

            token,

            env.JWT_SECRET

        );

        const admin =
            await AdminRepository.findActiveById(
                decoded.id
            );

        if (!admin) {

            throw new AppError(

                "Admin account not found or inactive.",

                HTTP_STATUS.UNAUTHORIZED

            );

        }

        req.user = {

            id: admin._id,

            name: admin.name,

            email: admin.email,

            role: admin.role,

        };

        next();

    }

    catch (error) {

        next(error);

    }

};

export { auth };