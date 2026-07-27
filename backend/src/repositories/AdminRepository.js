import Admin from "../models/Admin.js";

import BaseRepository from "./BaseRepository.js";

class AdminRepository extends BaseRepository {

    constructor() {

        super(Admin);

    }

    /**
     * -------------------------------------------------------
     * Find Admin By Email
     * -------------------------------------------------------
     */
    async findByEmail(email) {

        return this.model
            .findOne({

                email: email.toLowerCase(),

            })
            .select("+password");

    }

    /**
     * -------------------------------------------------------
     * Find Admin By ID
     * -------------------------------------------------------
     */
    async findById(id) {

        return this.model.findById(id);

    }

    /**
     * -------------------------------------------------------
     * Find Active Admin By ID
     * -------------------------------------------------------
     */
    async findActiveById(id) {

        return this.model.findOne({

            _id: id,

            isActive: true,

        });

    }

    /**
     * -------------------------------------------------------
     * Find Active Admin By Email
     * -------------------------------------------------------
     */
    async findActiveByEmail(email) {

        return this.model
            .findOne({

                email: email.toLowerCase(),

                isActive: true,

            })
            .select("+password");

    }

    /**
     * -------------------------------------------------------
     * Create Admin
     * -------------------------------------------------------
     */
    async createAdmin(adminData) {

        return this.create(adminData);

    }

    /**
     * -------------------------------------------------------
     * Update Password
     * -------------------------------------------------------
     */
    async updatePassword(id, password) {

        return this.model.findByIdAndUpdate(

            id,

            {
                password,
            },

            {
                new: true,
            }

        );

    }

    /**
     * -------------------------------------------------------
     * Update Last Login
     * -------------------------------------------------------
     */
    async updateLastLogin(id) {

        return this.model.findByIdAndUpdate(

            id,

            {
                lastLogin: new Date(),
            },

            {
                new: true,
            }

        );

    }

    /**
     * -------------------------------------------------------
     * Activate Admin
     * -------------------------------------------------------
     */
    async activateAdmin(id) {

        return this.model.findByIdAndUpdate(

            id,

            {
                isActive: true,
            },

            {
                new: true,
            }

        );

    }

    /**
     * -------------------------------------------------------
     * Deactivate Admin
     * -------------------------------------------------------
     */
    async deactivateAdmin(id) {

        return this.model.findByIdAndUpdate(

            id,

            {
                isActive: false,
            },

            {
                new: true,
            }

        );

    }

    /**
     * -------------------------------------------------------
     * Count Admins
     * -------------------------------------------------------
     */
    async countAdmins(filter = {}) {

        return this.model.countDocuments(filter);

    }

    /**
     * -------------------------------------------------------
     * Get Admins
     * -------------------------------------------------------
     */
    async getAdmins(filter = {}) {

        return this.model
            .find(filter)
            .sort({

                createdAt: -1,

            });

    }

}

export default new AdminRepository();