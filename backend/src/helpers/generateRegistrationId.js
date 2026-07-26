export const generateRegistrationId = (sequence) => {
  return `MRCE-SIH-2026-${String(sequence).padStart(4, "0")}`;
};
