import mongoose from "mongoose";

import { REGISTRATION_STATUS } from "../../types/index.js";

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: Object.values(REGISTRATION_STATUS),
      required: true,
    },

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    remarks: {
      type: String,
      default: "",
    },

    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

export default statusHistorySchema;
