import BaseService from "./BaseService.js";

import { RegistrationRepository } from "../repositories/index.js";

import { AppError } from "../utils/index.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import { REGISTRATION_STATUS } from "../types/index.js";

import { generateEditCode, generateRegistrationId } from "../helpers/index.js";

import RegistrationExport from "./registrationExport.js";

class RegistrationService extends BaseService {
  constructor() {
    super(RegistrationRepository);
  }

  /**
   * --------------------------------------------------------
   * Create Registration
   * --------------------------------------------------------
   */
  async createRegistration(data, paymentScreenshot) {
    await this.#validateTeamName(data.teamName);

    await this.#validateTransaction(data.payment.transactionId);

    await this.#validateParticipants([data.leader, ...data.members]);

    /**
     * NOTE:
     * Replace this later with a Counter collection
     * to avoid race conditions.
     */
    const total = await this.repository.countRegistrations();

    const registrationId = generateRegistrationId(total + 1);

    const editCode = generateEditCode();

    const registration = await this.repository.createRegistration({
      ...data,

      registrationId,

      editCode,

      payment: {
        ...data.payment,

        screenshotUrl: paymentScreenshot.path,

        screenshotPublicId: paymentScreenshot.filename,
      },

      status: REGISTRATION_STATUS.PAYMENT_PENDING,

      statusHistory: [
        this.#buildStatusHistory(
          REGISTRATION_STATUS.PAYMENT_PENDING,
          "Registration submitted.",
        ),
      ],

      activityLog: [
        this.#buildActivity(
          "REGISTRATION_CREATED",
          "Registration submitted successfully.",
        ),
      ],
    });

    return registration;
  }

  /**
   * --------------------------------------------------------
   * Get by Registration ID
   * --------------------------------------------------------
   */
  async getRegistrationByRegistrationId(registrationId) {
    const registration =
      await this.repository.findByRegistrationId(registrationId);

    if (!registration) {
      throw new AppError("Registration not found.", HTTP_STATUS.NOT_FOUND);
    }

    return registration;
  }

  /**
   * --------------------------------------------------------
   * Get by Edit Code
   * --------------------------------------------------------
   */
  async getRegistrationByEditCode(editCode) {
    const registration = await this.repository.findByEditCode(editCode);

    if (!registration) {
      throw new AppError("Invalid edit code.", HTTP_STATUS.NOT_FOUND);
    }

    return registration;
  }

  /**
   * ========================================================
   * PRIVATE HELPERS
   * ========================================================
   */

  async #validateTeamName(teamName) {
    const team = await this.repository.findByTeamName(teamName);

    if (team) {
      throw new AppError("Team name already exists.", HTTP_STATUS.CONFLICT);
    }
  }

  async #validateTransaction(transactionId) {
    const transaction =
      await this.repository.findByTransactionId(transactionId);

    if (transaction) {
      throw new AppError(
        "Transaction ID already exists.",
        HTTP_STATUS.CONFLICT,
      );
    }
  }

  async #validateParticipants(participants) {
    for (const participant of participants) {
      const registration = await this.repository.findByRollNumber(
        participant.rollNumber,
      );

      if (registration) {
        throw new AppError(
          `Participant ${participant.rollNumber} is already registered.`,
          HTTP_STATUS.CONFLICT,
        );
      }
    }
  }

  #buildStatusHistory(status, remarks) {
    return {
      status,
      remarks,
      changedAt: new Date(),
    };
  }

  #buildActivity(action, details) {
    return {
      action,
      details,
      timestamp: new Date(),
    };
  }
  /**
   * --------------------------------------------------------
   * Update Registration
   * --------------------------------------------------------
   */
  async updateRegistration(
  registrationId,
  editCode,
  updateData,
  paymentScreenshot,
) {
  const registration =
    await this.getRegistrationByRegistrationId(registrationId);

  /**
   * Validate Edit Code
   */
  if (registration.editCode !== editCode) {
    throw new AppError(
      "Invalid edit code.",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  /**
   * Prevent Editing Approved Registrations
   */
  if (registration.status === REGISTRATION_STATUS.APPROVED) {
    throw new AppError(
      "Approved registrations cannot be edited.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  /**
   * Registration Must Be Unlocked
   */
  if (!registration.isUnlocked) {
    throw new AppError(
      "Registration is locked.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  /**
   * Validate Team Name
   */
  if (
    updateData.teamName &&
    updateData.teamName !== registration.teamName
  ) {
    const team =
      await this.repository.findByTeamName(updateData.teamName);

    if (
      team &&
      team._id.toString() !== registration._id.toString()
    ) {
      throw new AppError(
        "Team name already exists.",
        HTTP_STATUS.CONFLICT,
      );
    }
  }

  /**
   * Validate Transaction ID
   */
  if (
    updateData.payment?.transactionId &&
    updateData.payment.transactionId !==
      registration.payment.transactionId
  ) {
    const transaction =
      await this.repository.findByTransactionId(
        updateData.payment.transactionId,
      );

    if (
      transaction &&
      transaction._id.toString() !==
        registration._id.toString()
    ) {
      throw new AppError(
        "Transaction ID already exists.",
        HTTP_STATUS.CONFLICT,
      );
    }
  }

  /**
   * Validate Participants
   */
  if (updateData.leader || updateData.members) {
    const participants = [
      updateData.leader ?? registration.leader,
      ...(updateData.members ?? registration.members),
    ];

    for (const participant of participants) {
      const existing =
        await this.repository.findByRollNumber(
          participant.rollNumber,
        );

      if (
        existing &&
        existing._id.toString() !==
          registration._id.toString()
      ) {
        throw new AppError(
          `Roll Number ${participant.rollNumber} already registered.`,
          HTTP_STATUS.CONFLICT,
        );
      }
    }
  }

  /**
   * Merge Payment Details
   */
  updateData.payment = {
    ...registration.payment,
    ...updateData.payment,
  };

  /**
   * Update Screenshot (if uploaded)
   */
  if (paymentScreenshot) {
    updateData.payment.screenshotUrl =
      paymentScreenshot.path;

    updateData.payment.screenshotPublicId =
      paymentScreenshot.filename;
  }

  /**
   * Increment Registration Version
   */
  updateData.registrationVersion =
    registration.registrationVersion + 1;

  /**
   * Append Activity Log
   */
  updateData.activityLog = [
    ...registration.activityLog,
    this.#buildActivity(
      "REGISTRATION_UPDATED",
      "Registration updated successfully.",
    ),
  ];

  /**
   * Update Registration
   */
  const updatedRegistration =
    await this.repository.updateRegistration(
      registration._id,
      updateData,
    );

  return updatedRegistration;
}

  /**
   * --------------------------------------------------------
   * Approve Registration
   * --------------------------------------------------------
   */
  /**
 * --------------------------------------------------------
 * Approve Registration
 * --------------------------------------------------------
 */
async approveRegistration(registrationId, adminId, remarks = "") {
  const registration =
    await this.getRegistrationByRegistrationId(registrationId);

  if (registration.status === REGISTRATION_STATUS.APPROVED) {
    throw new AppError(
      "Registration is already approved.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (registration.status === REGISTRATION_STATUS.REJECTED) {
    throw new AppError(
      "Rejected registrations cannot be approved.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const updated = await this.repository.updateRegistration(registration._id, {
    status: REGISTRATION_STATUS.APPROVED,

    approvedBy: adminId,

    "payment.verifiedAt": new Date(),

    "payment.verifiedBy": adminId,

    "payment.remarks": remarks,
  });

  await this.repository.addStatusHistory(
    registration._id,
    this.#buildStatusHistory(
      REGISTRATION_STATUS.APPROVED,
      remarks || "Registration approved.",
    ),
  );

  await this.repository.addActivity(
    registration._id,
    this.#buildActivity(
      "REGISTRATION_APPROVED",
      `Registration approved by ${adminId}.`,
    ),
  );

  return updated;
}

  /**
 * --------------------------------------------------------
 * Reject Registration
 * --------------------------------------------------------
 */
async rejectRegistration(registrationId, adminId, remarks) {
  const registration =
    await this.getRegistrationByRegistrationId(registrationId);

  if (registration.status === REGISTRATION_STATUS.REJECTED) {
    throw new AppError(
      "Registration is already rejected.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (registration.status === REGISTRATION_STATUS.APPROVED) {
    throw new AppError(
      "Approved registrations cannot be rejected.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const updated = await this.repository.updateRegistration(registration._id, {
    status: REGISTRATION_STATUS.REJECTED,

    rejectedBy: adminId,

    "payment.verifiedAt": new Date(),

    "payment.verifiedBy": adminId,

    "payment.remarks": remarks,
  });

  await this.repository.addStatusHistory(
    registration._id,
    this.#buildStatusHistory(
      REGISTRATION_STATUS.REJECTED,
      remarks || "Registration rejected.",
    ),
  );

  await this.repository.addActivity(
    registration._id,
    this.#buildActivity(
      "REGISTRATION_REJECTED",
      `Registration rejected by ${adminId}.`,
    ),
  );

  return updated;
}

 /**
 * --------------------------------------------------------
 * Unlock Registration
 * --------------------------------------------------------
 */
async unlockRegistration(registrationId, adminId) {
  const registration =
    await this.getRegistrationByRegistrationId(registrationId);

  if (registration.status === REGISTRATION_STATUS.APPROVED) {
    throw new AppError(
      "Approved registrations cannot be unlocked.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (registration.status === REGISTRATION_STATUS.REJECTED) {
    throw new AppError(
      "Rejected registrations cannot be unlocked.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (registration.isUnlocked) {
    return registration;
  }

  const updated = await this.repository.unlockRegistration(
    registration._id,
  );

  await this.repository.addActivity(
    registration._id,
    this.#buildActivity(
      "REGISTRATION_UNLOCKED",
      `Registration unlocked by ${adminId}.`,
    ),
  );

  return updated;
}
  /**
 * --------------------------------------------------------
 * Lock Registration
 * --------------------------------------------------------
 */
async lockRegistration(registrationId, adminId) {
  const registration =
    await this.getRegistrationByRegistrationId(registrationId);

  if (registration.status === REGISTRATION_STATUS.APPROVED) {
    throw new AppError(
      "Approved registrations are already finalized.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (registration.status === REGISTRATION_STATUS.REJECTED) {
    throw new AppError(
      "Rejected registrations are already finalized.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (!registration.isUnlocked) {
    return registration;
  }

  const updated = await this.repository.lockRegistration(
    registration._id,
  );

  await this.repository.addActivity(
    registration._id,
    this.#buildActivity(
      "REGISTRATION_LOCKED",
      `Registration locked by ${adminId}.`,
    ),
  );

  return updated;
}
  /**
   * --------------------------------------------------------
   * Archive Registration
   * --------------------------------------------------------
   */
  async archiveRegistration(registrationId, adminId) {
    const registration =
      await this.getRegistrationByRegistrationId(registrationId);

    if (registration.isArchived) {
      throw new AppError(
        "Registration already archived.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const archived = await this.repository.archiveRegistration(
      registration._id,
    );

    await this.repository.addActivity(
      registration._id,
      this.#buildActivity(
        "REGISTRATION_ARCHIVED",
        `Registration archived by ${adminId}.`,
      ),
    );

    return archived;
  }

  /**
   * --------------------------------------------------------
   * Get Registrations (Admin)
   * --------------------------------------------------------
   */
  async getRegistrations(filters = {}, pagination = {}) {
    const page = Number(pagination.page) || 1;

    const limit = Number(pagination.limit) || 10;

    const skip = (page - 1) * limit;

    const registrations = await this.repository.getRegistrations(filters, {
      page,
      limit,
      skip,
    });

    const total = await this.repository.countRegistrations(filters);

    return {
      registrations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
 * --------------------------------------------------------
 * Export Registrations
 * --------------------------------------------------------
 */

  async exportRegistrations(filters = {}) {
  const registrations =
    await this.repository.exportRegistrations(filters);

  const workbook =
    await RegistrationExport.generate(registrations);

  return workbook;
}

  /**
   * --------------------------------------------------------
   * Count Registrations
   * --------------------------------------------------------
   */
  async countRegistrations(filters = {}) {
    return this.repository.countRegistrations(filters);
  }

  /**
   * --------------------------------------------------------
   * Dashboard Statistics
   * --------------------------------------------------------
   */
  async getRegistrationStatistics() {
    const registrations = await this.repository.getRegistrations(
      {},
      {
        page: 1,
        limit: 100000,
        skip: 0,
      },
    );

    const statistics = {
      total: registrations.length,

      pending: 0,

      approved: 0,

      rejected: 0,

      unlocked: 0,

      archived: 0,
    };

    for (const registration of registrations) {
      switch (registration.status) {
        case REGISTRATION_STATUS.PAYMENT_PENDING:
          statistics.pending++;
          break;

        case REGISTRATION_STATUS.APPROVED:
          statistics.approved++;
          break;

        case REGISTRATION_STATUS.REJECTED:
          statistics.rejected++;
          break;
      }

      if (registration.isUnlocked) {
        statistics.unlocked++;
      }

      if (registration.isArchived) {
        statistics.archived++;
      }
    }

    return statistics;
  }

  /**
   * --------------------------------------------------------
   * Registration Exists
   * --------------------------------------------------------
   */
  async registrationExists(registrationId) {
    const registration =
      await this.repository.findByRegistrationId(registrationId);

    return !!registration;
  }

  /**
   * --------------------------------------------------------
   * Team Exists
   * --------------------------------------------------------
   */
  async teamExists(teamName) {
    const team = await this.repository.findByTeamName(teamName);

    return !!team;
  }

  /**
   * --------------------------------------------------------
   * Transaction Exists
   * --------------------------------------------------------
   */
  async transactionExists(transactionId) {
    const transaction =
      await this.repository.findByTransactionId(transactionId);

    return !!transaction;
  }

  /**
   * --------------------------------------------------------
   * Participant Exists
   * --------------------------------------------------------
   */
  async participantExists(rollNumber) {
    const participant = await this.repository.findByRollNumber(rollNumber);

    return !!participant;
  }
}




export default new RegistrationService();
