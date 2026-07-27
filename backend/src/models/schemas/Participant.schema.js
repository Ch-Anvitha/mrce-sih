import mongoose from "mongoose";

import { GENDER } from "../../types/index.js";

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    rollNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: Object.values(GENDER),
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      min: 1,
      max: 4,
      required: true,
    },

    section: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

export default participantSchema;
