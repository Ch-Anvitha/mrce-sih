import { z } from "zod";

import { requiredString } from "./common.schema.js";

export const paymentSchema = z.object({
  transactionId: requiredString("Transaction ID"),

  amount: z

    .number()

    .nonnegative(),
});
