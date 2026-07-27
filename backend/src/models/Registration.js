import mongoose from "mongoose";

import participantSchema from "./schemas/Participant.schema.js";
import paymentSchema from "./schemas/Payment.schema.js";
import statusHistorySchema from "./schemas/StatusHistory.schema.js";
import activityLogSchema from "./schemas/ActivityLog.schema.js";

import { REGISTRATION_STATUS } from "../types/index.js";

const registrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      // index: true,
    },

    editCode: {
      type: String,
      required: true,
    },

    teamName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    problemStatement: {
      type: String,
      required: true,
      trim: true,
    },

    leader: {
      type: participantSchema,
      required: true,
    },

    members: {
      type: [participantSchema],
      required: true,
      validate: {
        validator: (members) => members.length === 5,
        message: "Exactly 5 team members are required.",
      },
    },

    payment: {
      type: paymentSchema,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(REGISTRATION_STATUS),
      default: REGISTRATION_STATUS.PAYMENT_PENDING,
      // index: true,
    },

    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },

    activityLog: {
      type: [activityLogSchema],
      default: [],
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    isUnlocked: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },

    registrationVersion: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

// registrationSchema.index({
//   registrationId: 1,
// });

// registrationSchema.index({ teamName: 1 }, { unique: true });

registrationSchema.index({
  "leader.rollNumber": 1,
});

registrationSchema.index({ "payment.transactionId": 1 }, { unique: true });

// registrationSchema.index({
//   status: 1,
// });

registrationSchema.index({
  createdAt: -1,
});

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
