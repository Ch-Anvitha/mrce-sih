import { z } from "zod";

import { participantSchema } from "./common/participant.schema.js";

import { paymentSchema } from "./common/payment.schema.js";

import { requiredString } from "./common/common.schema.js";

export const createRegistrationSchema = z.object({
  body: z.object({
    teamName: requiredString("Team Name"),

    problemStatement: requiredString("Problem Statement"),

    leader: participantSchema,

    members: z

      .array(participantSchema)

      .length(
        5,

        "Exactly 5 team members are required.",
      ),

    payment: paymentSchema,
  }),
});

createRegistrationSchema.superRefine((data, ctx) => {
  const allMembers = [data.body.leader, ...data.body.members];

  const female = allMembers.some((member) => member.gender === "FEMALE");

  if (!female) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,

      message: "At least one female participant is required.",

      path: ["members"],
    });
  }

  const rolls = allMembers.map((member) => member.rollNumber);

  const unique = new Set(rolls);

  if (rolls.length !== unique.size) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,

      message: "Duplicate roll numbers found.",
    });
  }

  const emails = allMembers.map((member) => member.email);

  if (new Set(emails).size !== emails.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,

      message: "Duplicate emails found.",
    });
  }
});

export const registrationIdSchema = z.object({
  params: z.object({
    registrationId: requiredString("Registration ID"),
  }),
});


export const editRegistrationSchema = z.object({
  params: z.object({
    registrationId: requiredString("Registration ID"),
  }),

  body: z.object({
    teamName: requiredString("Team Name"),

    problemStatement: requiredString("Problem Statement"),

    leader: participantSchema,

    members: z
      .array(participantSchema)
      .length(
        5,
        "Exactly 5 team members are required.",
      ),

    payment: paymentSchema,
  }),
});