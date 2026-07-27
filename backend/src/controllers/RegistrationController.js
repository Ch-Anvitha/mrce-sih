import { RegistrationService } from "../services/index.js";

import { ApiResponse } from "../utils/index.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import {asyncHandler} from "../middlewares/index.js";

class RegistrationController {
  /**
   * -------------------------------------------------------
   * Create Registration
   * POST /api/v1/registrations
   * -------------------------------------------------------
   */

  createRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationService.createRegistration(
      req.validatedData.body,
      req.file,
    );

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse({
        success: true,

        message: "Registration submitted successfully.",

        data: registration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Get Registration
   * GET /api/v1/registrations/:registrationId
   * -------------------------------------------------------
   */

  getRegistration = asyncHandler(async (req, res) => {
    const registration =
      await RegistrationService.getRegistrationByRegistrationId(
        req.params.registrationId,
      );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration fetched successfully.",

        data: registration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Get Registration By Edit Code
   * GET /api/v1/registrations/edit/:editCode
   * -------------------------------------------------------
   */

  getRegistrationByEditCode = asyncHandler(async (req, res) => {
    const registration = await RegistrationService.getRegistrationByEditCode(
      req.params.editCode,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration fetched successfully.",

        data: registration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Check Registration Exists
   * GET /api/v1/registrations/check/:registrationId
   * -------------------------------------------------------
   */

  registrationExists = asyncHandler(async (req, res) => {
    const exists = await RegistrationService.registrationExists(
      req.params.registrationId,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration status fetched successfully.",

        data: {
          exists,
        },
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Check Team Exists
   * GET /api/v1/registrations/check/team/:teamName
   * -------------------------------------------------------
   */

  teamExists = asyncHandler(async (req, res) => {
    const exists = await RegistrationService.teamExists(req.params.teamName);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Team status fetched successfully.",

        data: {
          exists,
        },
      }),
    );
  });
  /**
   * -------------------------------------------------------
   * Update Registration
   * PATCH /api/v1/registrations/:registrationId
   * -------------------------------------------------------
   */
  updateRegistration = asyncHandler(async (req, res) => {
    const updatedRegistration = await RegistrationService.updateRegistration(
      req.params.registrationId,

      req.body.editCode,

      req.validatedData.body,
      req.file
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration updated successfully.",

        data: updatedRegistration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Get All Registrations (Admin)
   * GET /api/v1/registrations
   * -------------------------------------------------------
   */
  getRegistrations = asyncHandler(async (req, res) => {
    const registrations = await RegistrationService.getRegistrations(
      req.query,

      {
        page: req.query.page,

        limit: req.query.limit,
      },
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registrations fetched successfully.",

        data: registrations,
      }),
    );
  });

  /**
 * --------------------------------------------------------
 * Export Registrations
 * --------------------------------------------------------
 */

exportRegistrations = asyncHandler(async (req, res) => {
  const workbook = await RegistrationService.exportRegistrations(req.query);

  const buffer = await workbook.xlsx.writeBuffer();

  const fileName = `MRCE-SIH-Registrations-${
    new Date().toISOString().split("T")[0]
  }.xlsx`;

  res.set({
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": `attachment; filename="${fileName}"`,
    "Content-Length": buffer.length,
  });

  return res.send(buffer);
});

  /**
   * -------------------------------------------------------
   * Approve Registration
   * PATCH /api/v1/registrations/:registrationId/approve
   * -------------------------------------------------------
   */
  approveRegistration = asyncHandler(async (req, res) => {

    const approvedRegistration = await RegistrationService.approveRegistration(
      req.params.registrationId,

      req.user.id,

      req.body.remarks,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration approved successfully.",

        data: approvedRegistration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Reject Registration
   * PATCH /api/v1/registrations/:registrationId/reject
   * -------------------------------------------------------
   */
  rejectRegistration = asyncHandler(async (req, res) => {
    const rejectedRegistration = await RegistrationService.rejectRegistration(
      req.params.registrationId,

      req.user.id,

      req.body.remarks,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration rejected successfully.",

        data: rejectedRegistration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Check Transaction Exists
   * GET /api/v1/registrations/check/transaction/:transactionId
   * -------------------------------------------------------
   */
  transactionExists = asyncHandler(async (req, res) => {
    const exists = await RegistrationService.transactionExists(
      req.params.transactionId,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Transaction status fetched successfully.",

        data: {
          exists,
        },
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Check Participant Exists
   * GET /api/v1/registrations/check/participant/:rollNumber
   * -------------------------------------------------------
   */
  participantExists = asyncHandler(async (req, res) => {
    const exists = await RegistrationService.participantExists(
      req.params.rollNumber,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Participant status fetched successfully.",

        data: {
          exists,
        },
      }),
    );
  });
  /**
   * -------------------------------------------------------
   * Unlock Registration
   * PATCH /api/v1/registrations/:registrationId/unlock
   * -------------------------------------------------------
   */
  unlockRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationService.unlockRegistration(
      req.params.registrationId,

      req.user.id,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration unlocked successfully.",

        data: registration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Lock Registration
   * PATCH /api/v1/registrations/:registrationId/lock
   * -------------------------------------------------------
   */
  lockRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationService.lockRegistration(
      req.params.registrationId,

      req.user.id,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration locked successfully.",

        data: registration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Archive Registration
   * DELETE /api/v1/registrations/:registrationId
   * -------------------------------------------------------
   */
  archiveRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationService.archiveRegistration(
      req.params.registrationId,

      req.user.id,
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration archived successfully.",

        data: registration,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Registration Statistics
   * GET /api/v1/registrations/statistics
   * -------------------------------------------------------
   */
  getRegistrationStatistics = asyncHandler(async (req, res) => {
    const statistics = await RegistrationService.getRegistrationStatistics();

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration statistics fetched successfully.",

        data: statistics,
      }),
    );
  });

  /**
   * -------------------------------------------------------
   * Count Registrations
   * GET /api/v1/registrations/count
   * -------------------------------------------------------
   */
  countRegistrations = asyncHandler(async (req, res) => {
    const total = await RegistrationService.countRegistrations(req.query);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        success: true,

        message: "Registration count fetched successfully.",

        data: {
          total,
        },
      }),
    );
  });
}

export default new RegistrationController();
