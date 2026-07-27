import { AdminService } from "../services/index.js";

import { ApiResponse } from "../utils/index.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import {asyncHandler} from "../middlewares/index.js";

class AuthController {

    /**
     * -------------------------------------------------------
     * Login
     * -------------------------------------------------------
     */

    login = asyncHandler(async (req, res) => {

        const { admin, token } =
            await AdminService.login(
                req.validatedData.body
            );

        res.cookie(

            "accessToken",

            token,

            {

                httpOnly: true,

                secure:
                    process.env.NODE_ENV === "production",

                sameSite: "strict",

                maxAge:
                    1000 *
                    60 *
                    60 *
                    24,

            }

        );

        return res.status(
            HTTP_STATUS.OK
        ).json(

            new ApiResponse({

                success: true,

                message:
                    "Login successful.",

                data: {

                    admin,

                },

            })

        );

    });

    /**
     * -------------------------------------------------------
     * Current Admin
     * -------------------------------------------------------
     */

    me = asyncHandler(async (req, res) => {

        const admin =
            await AdminService.getCurrentAdmin(

                req.user.id

            );

        return res.status(
            HTTP_STATUS.OK
        ).json(

            new ApiResponse({

                success: true,

                message:
                    "Admin fetched successfully.",

                data: admin,

            })

        );

    });

    /**
     * -------------------------------------------------------
     * Change Password
     * -------------------------------------------------------
     */

    changePassword =
        asyncHandler(async (req, res) => {

            const result =
                await AdminService.changePassword(

                    req.user.id,

                    req.validatedData.body

                );

            return res.status(
                HTTP_STATUS.OK
            ).json(

                new ApiResponse({

                    success: true,

                    message:
                        result.message,

                    data: null,

                })

            );

        });

    /**
     * -------------------------------------------------------
     * Logout
     * -------------------------------------------------------
     */

    logout = asyncHandler(async (req, res) => {

        await AdminService.logout();

        res.clearCookie(

            "accessToken",

            {

                httpOnly: true,

                secure:
                    process.env.NODE_ENV === "production",

                sameSite: "strict",

            }

        );

        return res.status(
            HTTP_STATUS.OK
        ).json(

            new ApiResponse({

                success: true,

                message:
                    "Logout successful.",

                data: null,

            })

        );

    });

}

export default new AuthController();