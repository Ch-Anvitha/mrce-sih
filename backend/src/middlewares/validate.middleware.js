import { ZodError } from "zod";

import { ApiResponse } from "../utils/index.js";

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.validatedData = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json(new ApiResponse(false, "Validation failed", error.flatten()));
      }

      next(error);
    }
  };
};

export { validate };
