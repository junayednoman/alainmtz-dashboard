import { z } from "zod";

const forgetPasswordValidation = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
});

export default forgetPasswordValidation;