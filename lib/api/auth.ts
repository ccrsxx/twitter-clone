export const AUTH = {
  headers: {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN as string}`
  }
};
