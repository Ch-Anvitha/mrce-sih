import { Router } from "express";

import { AuthController } from "../controllers/index.js";

import {auth} from "../middlewares/index.js";

import {validate} from "../middlewares/index.js";

import {

    loginSchema,

    changePasswordSchema,

} from "../validators/index.js";

const router = Router();

/**
 * -------------------------------------------------------
 * Public Routes
 * -------------------------------------------------------
 */

router.post(

    "/login",

    validate(loginSchema),

    AuthController.login

);

/**
 * -------------------------------------------------------
 * Protected Routes
 * -------------------------------------------------------
 */

router.post(

    "/logout",

    auth,

    AuthController.logout

);

router.get(

    "/me",

    auth,

    AuthController.me

);

router.patch(

    "/change-password",

    auth,

    validate(changePasswordSchema),

    AuthController.changePassword

);

export default router;
