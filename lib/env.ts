export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const siteURL = (
  isProduction ? process.env.VERCEL_URL : process.env.NEXT_PUBLIC_DEV_URL
) as string;
