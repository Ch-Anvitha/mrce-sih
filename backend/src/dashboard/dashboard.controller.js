// 

import { asyncHandler } from "../middlewares/index.js";
import { ApiResponse } from "../utils/index.js";
import DashboardService from "./dashboard.service.js";

class DashboardController {
  getStatistics = asyncHandler(async (req, res) => {
    const statistics = await DashboardService.getStatistics();

    // Use standard Express res.status().json() with the 'new' keyword
    return res.status(200).json(
      new ApiResponse({
        success: true,
        message: "Dashboard statistics fetched successfully.",
        data: statistics,
      })
    );
  });
}

export default new DashboardController();