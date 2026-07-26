import { Router } from "express";
import { ApiResponse } from "../utils/index.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(
    new ApiResponse({
      success: true,
      message: "Server is healthy",
      data: {
        uptime: Number(process.uptime().toFixed(2)),
        timestamp: new Date(),
      },
    }),
  );
});

export default router;
