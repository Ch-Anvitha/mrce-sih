import { ApiResponse } from "../utils/index.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  res.status(status).json(
    new ApiResponse({
      success: false,
      message: err.message || "Internal Server Error",
    }),
  );
};
