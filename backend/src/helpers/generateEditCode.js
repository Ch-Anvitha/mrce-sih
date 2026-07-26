import crypto from "crypto";

export const generateEditCode = () => {
  return crypto

    .randomBytes(4)

    .toString("hex")

    .toUpperCase();
};
