import BaseRepository from "./BaseRepository.js";
import Registration from "../models/Registration.js";

class RegistrationRepository extends BaseRepository {
  constructor() {
    super(Registration);
  }

  /**
   * Create Registration
   */
  async createRegistration(data) {
    return this.create(data);
  }

  /**
   * Find by Mongo ObjectId
   */
  async findById(id) {
    return super.findById(id);
  }

  /**
   * Find Registration using Registration ID
   */
  async findByRegistrationId(registrationId) {
    return this.findOne({
      registrationId,
      isArchived: false,
    });
  }

  /**
   * Find by Team Name
   */
  async findByTeamName(teamName) {
    return this.findOne({
      teamName,
      isArchived: false,
    });
  }

  /**
   * Find by Edit Code
   */
  async findByEditCode(editCode) {
    return this.findOne({
      editCode,
      isArchived: false,
    });
  }

  /**
   * Find by Transaction ID
   */
  async findByTransactionId(transactionId) {
    return this.findOne({
      "payment.transactionId": transactionId,
      isArchived: false,
    });
  }

  /**
   * Check whether a student already exists
   * either as Leader or Member
   */
  async findByRollNumber(rollNumber) {
    return this.model.findOne({
      isArchived: false,
      $or: [
        {
          "leader.rollNumber": rollNumber,
        },
        {
          "members.rollNumber": rollNumber,
        },
      ],
    });
  }

  /**
   * Update Registration
   */
  async updateRegistration(id, updateData) {
    return this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Update Status
   */
  async updateStatus(id, status) {
    return this.model.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  /**
   * Unlock Registration
   */
  async unlockRegistration(id) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isUnlocked: true,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Lock Registration
   */
  async lockRegistration(id) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isUnlocked: false,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Archive Registration
   */
  async archiveRegistration(id) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isArchived: true,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Add Activity Log
   */
  async addActivity(id, activity) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $push: {
          activityLog: activity,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Add Status History
   */
  async addStatusHistory(id, history) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $push: {
          statusHistory: history,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Increase Registration Version
   */
  async incrementVersion(id) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $inc: {
          registrationVersion: 1,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Admin Listing
   */
  async getRegistrations(filters, options) {
    const query = {
      isArchived: false,
    };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.department) {
      query["leader.department"] = filters.department;
    }

    if (filters.search) {
      query.$or = [
        {
          teamName: {
            $regex: filters.search,
            $options: "i",
          },
        },
        {
          registrationId: {
            $regex: filters.search,
            $options: "i",
          },
        },
        {
          "leader.name": {
            $regex: filters.search,
            $options: "i",
          },
        },
      ];
    }

    return this.model
      .find(query)
      .sort({
        createdAt: -1,
      })
      .skip(options.skip)
      .limit(options.limit);
  }

 /**
 * --------------------------------------------------------
 * Export Registrations
 * --------------------------------------------------------
 */
async exportRegistrations(filters = {}) {
  const query = {
    isArchived: false,
  };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.department) {
    query["leader.department"] = filters.department;
  }

  if (filters.search) {
    query.$or = [
      {
        teamName: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        registrationId: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        "leader.name": {
          $regex: filters.search,
          $options: "i",
        },
      },
    ];
  }

  return this.model
    .find(query)
    .sort({
      createdAt: 1,
    })
    .lean();
}

  /**
   * Count Registrations
   */
  async countRegistrations(filters = {}) {
    const query = {
      isArchived: false,
    };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.department) {
      query["leader.department"] = filters.department;
    }

    return this.model.countDocuments(query);
  }
}




export default new RegistrationRepository();
