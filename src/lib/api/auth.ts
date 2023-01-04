export const AUTH: Readonly<RequestInit> = {
  headers: {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN as string}`
  }
};
