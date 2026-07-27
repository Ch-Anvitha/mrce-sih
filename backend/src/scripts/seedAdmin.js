import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import dotenv from "dotenv";

import Admin from "../models/Admin.js";

import { env } from "../config/env.js";

dotenv.config();

const seedAdmin = async () => {

    try {

        console.log("Connecting to MongoDB...");

        await mongoose.connect(env.MONGODB_URI);

        console.log("MongoDB Connected.");

        const existingAdmin = await Admin.findOne({

            email: "rahulreddy@gmail.com",

        });

        if (existingAdmin) {

            console.log("Admin already exists.");

            process.exit(0);

        }

        const hashedPassword = await bcrypt.hash(

            "rahul@123",

            12

        );

        await Admin.create({

            name: "Super Admin",

            email: "admin@mrce.edu.in",

            password: hashedPassword,

            role: "SUPER_ADMIN",

            isActive: true,

        });

        console.log("Super Admin created successfully.");

        console.log("--------------------------------");

        console.log("Email    : rahulreddy@gmail.com");

        console.log("Password : rahul@123");

        console.log("--------------------------------");

        process.exit(0);

    }

    catch (error) {

        console.error(error);

        process.exit(1);

    }

};

seedAdmin();