import { z } from 'zod';

const LoginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const RegisterSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(255),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
  }),
});

const ChangePasswordSchema = z.object({
  body: z.object({
    old_password: z.string({ required_error: 'Old password is required' }),
    new_password: z
      .string({ required_error: 'New password is required' })
      .min(6, 'New password must be at least 6 characters'),
  }),
});

const AuthValidation = { LoginSchema, RegisterSchema, ChangePasswordSchema };

export default AuthValidation;
