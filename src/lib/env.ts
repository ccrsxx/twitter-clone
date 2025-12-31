import { z } from 'zod';

const envSchema = z.object({
  // prettier-ignore
  NEXT_PUBLIC_URL: z.string().trim().min(1).url()
    .default(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  // prettier-ignore
  NEXT_PUBLIC_API_KEY: z.string().trim().min(1)
    .default(process.env.NEXT_PUBLIC_API_KEY as string),
  // prettier-ignore
  NEXT_PUBLIC_AUTH_DOMAIN: z.string().trim().min(1)
    .default(process.env.NEXT_PUBLIC_AUTH_DOMAIN as string),
  // prettier-ignore
  NEXT_PUBLIC_PROJECT_ID: z.string().trim().min(1)
    .default(process.env.NEXT_PUBLIC_PROJECT_ID as string),
  // prettier-ignore
  NEXT_PUBLIC_STORAGE_BUCKET: z.string().trim().min(1)
    .default(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string),
  // prettier-ignore
  NEXT_PUBLIC_MESSAGING_SENDER_ID: z.string().trim().min(1)
    .default(process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID as string),
  // prettier-ignore
  NEXT_PUBLIC_APP_ID: z.string().trim().min(1)
    .default(process.env.NEXT_PUBLIC_APP_ID as string),
  // prettier-ignore
  NEXT_PUBLIC_MEASUREMENT_ID: z.string().trim().min(1)
    .default(process.env.NEXT_PUBLIC_MEASUREMENT_ID as string),
  // prettier-ignore
  FIREBASE_PROJECT_ID: z.string().trim().min(1)
    .default(process.env.FIREBASE_PROJECT_ID as string),
  // prettier-ignore
  FIREBASE_PRIVATE_KEY: z.string().trim().min(1)
    .default(process.env.FIREBASE_PRIVATE_KEY as string),
  // prettier-ignore
  FIREBASE_CLIENT_EMAIL: z.string().trim().min(1)
    .default(process.env.FIREBASE_CLIENT_EMAIL as string),
  USE_FIREBASE_EMULATOR: z.string().optional()
});

export const env = envSchema.parse(process.env);

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isUsingEmulator = env.USE_FIREBASE_EMULATOR === 'true';

export const siteURL = env.NEXT_PUBLIC_URL;
