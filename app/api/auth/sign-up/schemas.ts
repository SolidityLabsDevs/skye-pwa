import { PASSWORD_ERROR_REGEX } from 'constants/regex';
import { z } from 'zod';

export type TSignUpSchema = z.infer<typeof SignUpSchema>;

export const SignUpSchema = z
  .object({
    mobile: z.literal(false).or(z.literal(true)).optional(),
    email: z.string().email(),
    firstName: z.string().min(1).max(30),
    lastName: z.string().min(1).max(30),
    confirmPassword: z.string(),
    verificationCode: z.string().min(1).max(6).optional(),
    password: z
      .string()
      .regex(PASSWORD_ERROR_REGEX[0].regex, PASSWORD_ERROR_REGEX[0].message)
      .regex(PASSWORD_ERROR_REGEX[1].regex, PASSWORD_ERROR_REGEX[1].message)
      .regex(PASSWORD_ERROR_REGEX[2].regex, PASSWORD_ERROR_REGEX[2].message),
  })
  .strict()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });
