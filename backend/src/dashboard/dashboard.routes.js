import { Router } from "express";

import DashboardController from "./dashboard.controller.js";

import {auth} from "../middlewares/index.js";

const router = Router();

router.get(
  "/statistics",
  auth,
  DashboardController.getStatistics,
);

export default router;