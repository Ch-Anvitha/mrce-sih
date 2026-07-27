import { Router } from "express";

import healthRoutes from "./health.routes.js";
import publicRoutes from "./public.routes.js";
import authRoutes from "./auth.routes.js";
import registrationRoutes from "./registration.routes.js";
import adminRoutes from "./admin.routes.js";
import dashboardRoutes from "../dashboard/dashboard.routes.js";



const router = Router();

router.use("/health", healthRoutes);

router.use("/public", publicRoutes);

router.use("/auth", authRoutes);

router.use("/registrations", registrationRoutes);

router.use("/admin", adminRoutes);

router.use("/dashboard", dashboardRoutes);

export default router;
