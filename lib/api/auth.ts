/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const AUTH = {
  headers: {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN!}`
  }
};
