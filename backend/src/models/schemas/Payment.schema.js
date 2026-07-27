import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    transactionId: {
      type: String,
      required: true,
      //   unique: true,
      trim: true,
      uppercase: true,
    },

    screenshotUrl: {
      type: String,
      required: true,
    },

    screenshotPublicId: {
      type: String,
      required: true,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    verifiedAt: Date,

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

export default paymentSchema;
