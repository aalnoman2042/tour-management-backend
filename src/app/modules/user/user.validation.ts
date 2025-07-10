import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string " })
    .min(2, { message: "name too short minimum 2 character long" })
    .max(50, { message: "name too long " }),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{8,}$/,
      {
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.",
      }
    )
    .optional(),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number (e.g. 017xxxxxxxx)",
    })
    .optional(),

  address: z.string().optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string " })
    .min(2, { message: "name too short minimum 2 character long" })
    .max(50, { message: "name too long " })
    .optional(),
 email: z.string().email(),
  password: z
    .string()
    .regex(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{8,}$/,
      {
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.",
      }
    )
    .optional(),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number (e.g. 017xxxxxxxx)",
    })
    .optional(),

  role: z.enum(Object.values(Role) as [string]).optional(),
  IsActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be a true or false" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "isVerified must be a true or false" })
    .optional(),
  address: z
    .string({ invalid_type_error: "address must be a string" })
    .max(200, { message: "address cannot exceed 200 characters" })
    .optional(),
});
