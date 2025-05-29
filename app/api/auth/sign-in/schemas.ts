import { z } from 'zod';

export type TSignInSchema = z.infer<typeof SignInSchema>;

export const SignInSchema = z
  .object({
    mobile: z.literal(false).or(z.literal(true)).optional(),
    email: z.string().email(),
    password: z.string().min(8),
    code: z.string().min(1).max(6).optional(),
    verificationCode: z.string().min(1).max(6).optional(),
  })
  .strict();
