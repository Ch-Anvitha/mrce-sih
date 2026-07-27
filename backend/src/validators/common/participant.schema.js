import { z } from "zod";

import {
  email,
  phone,
  rollNumber,
  requiredString,
  section,
  year,
} from "./common.schema.js";

import { GENDER } from "../../types/index.js";

export const participantSchema = z.object({
  name: requiredString("Name"),

  rollNumber,

  email,

  phone,

  gender: z.enum(Object.values(GENDER)),

  department: requiredString("Department"),

  year,

  section,
});
