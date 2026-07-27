import mongoose from "mongoose";

import { ADMIN_ROLE } from "../constants/adminRoles.js";


const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        role: {
    type: String,
    enum: Object.values(ADMIN_ROLE),
    default: ADMIN_ROLE.ADMIN,
},

        isActive: {
            type: Boolean,
            default: true,
        },

        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// adminSchema.index({
//     email: 1,
// });

export default mongoose.model(
    "Admin",
    adminSchema
);