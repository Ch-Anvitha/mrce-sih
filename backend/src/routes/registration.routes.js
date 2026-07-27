// import { Router } from "express";

// import { RegistrationController } from "../controllers/index.js";

// import {validate} from "../middlewares/index.js";
// import {upload} from "../middlewares/index.js";
// import {auth} from "../middlewares/index.js";

// import {
//   createRegistrationSchema,
//   editRegistrationSchema,
//   registrationIdSchema,
// } from "../validators/index.js";

// const router = Router();

// /*
// |--------------------------------------------------------------------------
// | Public Routes
// |--------------------------------------------------------------------------
// */

// /**
//  * Create Registration
//  */
// router.post(
//   "/",
//   upload.single("paymentScreenshot"),
//   validate(createRegistrationSchema),
//   RegistrationController.createRegistration,
// );

// /**
//  * Get Registration
//  */
// router.get(
//   "/:registrationId",
//   validate(registrationIdSchema),
//   RegistrationController.getRegistration,
// );

// /**
//  * Get Registration using Edit Code
//  */
// router.get("/edit/:editCode", RegistrationController.getRegistrationByEditCode);

// /**
//  * Update Registration
//  */
// router.patch(
//   "/:registrationId",
//   upload.single("paymentScreenshot"),
//   validate(editRegistrationSchema),
//   RegistrationController.updateRegistration,
// );

// /*
// |--------------------------------------------------------------------------
// | Admin Routes
// |--------------------------------------------------------------------------
// */

// /**
//  * Get All Registrations
//  */
// router.get("/", auth, RegistrationController.getRegistrations);

// /**
//  * Registration Statistics
//  */
// router.get(
//   "/statistics",
//   auth,
//   RegistrationController.getRegistrationStatistics,
// );

// /**
//  * Registration Count
//  */
// router.get("/count", auth, RegistrationController.countRegistrations);

// /**
//  * Approve Registration
//  */
// router.patch(
//   "/:registrationId/approve",
//   auth,
//   RegistrationController.approveRegistration,
// );

// /**
//  * Reject Registration
//  */
// router.patch(
//   "/:registrationId/reject",
//   auth,
//   RegistrationController.rejectRegistration,
// );

// /**
//  * Unlock Registration
//  */
// router.patch(
//   "/:registrationId/unlock",
//   auth,
//   RegistrationController.unlockRegistration,
// );

// /**
//  * Lock Registration
//  */
// router.patch(
//   "/:registrationId/lock",
//   auth,
//   RegistrationController.lockRegistration,
// );

// /**
//  * Archive Registration
//  */
// router.delete(
//   "/:registrationId",
//   auth,
//   RegistrationController.archiveRegistration,
// );

// export default router;

import { Router } from "express";

import { RegistrationController } from "../controllers/index.js";

import {
  validate,
  upload,
  auth,
  parseMultipartJson,
} from "../middlewares/index.js";

import {
  createRegistrationSchema,
  editRegistrationSchema,
  registrationIdSchema,
} from "../validators/index.js";

const router = Router();

/**
 * --------------------------------------------------------
 * Export Registrations
 * --------------------------------------------------------
 */
router.get(
  "/export",auth,
  RegistrationController.exportRegistrations,
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/**
 * Create Registration
 * POST /api/v1/registrations
 */
router.post(
  "/",
  upload.single("paymentScreenshot"), (req, res, next) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    next();
  }, parseMultipartJson,
  validate(createRegistrationSchema),
  RegistrationController.createRegistration,
);

/**
 * Get Registration using Edit Code
 * GET /api/v1/registrations/edit/:editCode
 */
router.get(
  "/edit/:editCode",
  RegistrationController.getRegistrationByEditCode,
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

/**
 * Get All Registrations
 * GET /api/v1/registrations
 */
router.get(
  "/",
  auth,
  RegistrationController.getRegistrations,
);

/**
 * Registration Statistics
 * GET /api/v1/registrations/statistics
 */
router.get(
  "/statistics",
  auth,
  RegistrationController.getRegistrationStatistics,
);

/**
 * Registration Count
 * GET /api/v1/registrations/count
 */
router.get(
  "/count",
  auth,
  RegistrationController.countRegistrations,
);

/*
|--------------------------------------------------------------------------
| Registration-Specific Routes
|--------------------------------------------------------------------------
*/

/**
 * Approve Registration
 * PATCH /api/v1/registrations/:registrationId/approve
 */
router.patch(
  "/:registrationId/approve",
  auth,
  RegistrationController.approveRegistration,
);

/**
 * Reject Registration
 * PATCH /api/v1/registrations/:registrationId/reject
 */
router.patch(
  "/:registrationId/reject",
  auth,
  RegistrationController.rejectRegistration,
);

/**
 * Unlock Registration
 * PATCH /api/v1/registrations/:registrationId/unlock
 */
router.patch(
  "/:registrationId/unlock",
  auth,
  RegistrationController.unlockRegistration,
);

/**
 * Lock Registration
 * PATCH /api/v1/registrations/:registrationId/lock
 */
router.patch(
  "/:registrationId/lock",
  auth,
  RegistrationController.lockRegistration,
);

/**
 * Archive Registration
 * DELETE /api/v1/registrations/:registrationId
 */
router.delete(
  "/:registrationId",
  auth,
  RegistrationController.archiveRegistration,
);

/**
 * Update Registration
 * PATCH /api/v1/registrations/:registrationId
 */
router.patch(
  "/:registrationId",upload.single("paymentScreenshot"),parseMultipartJson,
  validate(editRegistrationSchema),
  RegistrationController.updateRegistration,
);

/**
 * Get Registration
 * GET /api/v1/registrations/:registrationId
 */
router.get(
  "/:registrationId",
  validate(registrationIdSchema),
  RegistrationController.getRegistration,
);

export default router;
